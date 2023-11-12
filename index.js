const id = e => {return document.getElementById(e)}
let textElement = id('textarea'), choicesElement = id('choices'), 
    scrollAnchor = id('scrollAnchor'), ntMarker = id("newtextmarker")
let interval;

let choicedelay = 400, textdelay = 900;

let ingine = new Ingine(game, "start");

function scrollToBottom() {
    textElement.scrollTop = textElement.scrollHeight;
    let i = 0;
    interval = setInterval(() => {
        if(i === 1000) {
            clearInterval(interval)
        } else {
            textElement.scrollTop += i
        }
        i++
    }, 1000/(textElement.scrollHeight-textElement.scrollTop))
}

function createTextElement(text) {
    let animtime = 500
    let p = document.createElement('p')
    text = text.replace(/--/g, '—')
    p.style.opacity = 0;
    p.style.transition = "opacity "+(animtime*1.5/1000)+"s ease";
    p.innerHTML = text;
    return p
}

function showText(text) {
    let p = createTextElement(text)
    let slideheight, animtime = 500;
    if(textElement.children.length >= 1) {
        slidecalc = (text.length/76) * (18*1.6) // approx. 76 char per line, font size 18 and line spacing 1.6
        // slideheight = -100+(text.length/1.3) // did the fucken math. on Desmos. eat shit. edit: fuck
        // slideheight = text.length*4/6
        p.style.opacity = 0;
        // textElement.appendChild(p)
        textElement.insertBefore(p, scrollAnchor)
        textElement.insertBefore(ntMarker, p)
        slideheight = p.offsetHeight // genius. never would have thought of this
        // slideheight += (text.includes("<br>")) ? (text.match(/\<br\>/g).length-1) * 28.8 : slideheight; // 28.8 is fontsize times lineheight
        document.body.style.setProperty('--slide-height', slideheight+"px")

        p.style.transition = "opacity "+(animtime*1.5)/1000+"s ease";
        p.style.opacity = 1;

        // now its children length -2 because of the scroll anchor
        textElement.children[textElement.children.length-2].style.animation = "slideup "+animtime/1000+"s ease";
        // scrollAnchor.scrollIntoView({behavior: "smooth", block:"end", alignToTop:false})
    }
    setTimeout(() => {
        // console.log(`calculated: ${slideheight}\nheight: ${p.offsetHeight}\nlength: ${text.length}`);
        // scrollToBottom();
        textElement.scroll({top:textElement.scrollHeight, behavior:"smooth"})
    }, animtime/2)
}

function writeText(text, cb=null) { // this is the one i wrote. would like it to pause on commas/periods
    let p = document.createElement('p')
    textElement.appendChild(p)
    text = text.replace(/--/g, '—') // em dash
    // text = text.split(' ')
    let idx = 0;
    let int = setInterval(() => {
        if(idx != text.length) {
            p.innerHTML += text[idx]
            idx++
        } else {
            clearInterval(int)
        }
    }, 5);
    if(cb) setTimeout(cb, (30*text.length)+200)
}

// okay so this works when i look at it in the console but not when its actually running.
const dynamicTemplate = template => {
    // console.log(template)
    return eval("`"+template+"`")
    // const handler = new Function('t', 'const tagged = (t) => `' + template + '`; return tagged(t)')
    // return handler(o)
}
// const template1 = 'Hello ${o.name}!'
// let o = {name: 'world'}
// console.log(dynamicTemplate(template1, o ))
// all from https://gist.github.com/tmarshall/31e640e1fa80c597cc5bf78566b1274c

// oldsetidx is -1 if there's no alternate choicesets, otherwise its choicesetidx
let gamescene = {name:0, chosen:[], oldsetidx:-1}, current;
// setInterval(() => {
//     id("debug").innerText = "["+gamescene.chosen.toString()+"]"
// }, 500)

function run(oldchoice = null) {
    // oldchoice is the First Part of the text that gets displayed. parsedtext is the new stuff
    choicesElement.innerHTML = ''
    current = ingine.current;
    let parsedtext = ingine.current.text.replace(/\t|\n/g, '')

    // the chosen indicators don't work if i kick back to choiceset 0. it only works Down (from choiceset 0) and across scenes
    gamescene.chosen = (current.name != gamescene.name || gamescene.oldsetidx > -1) ? [] : gamescene.chosen; // keep or reset chosen for the indicators

    if(current.name != gamescene.name) { // if the scene changed (so, most of the time)
        gamescene.chosen = []
        if(oldchoice) {
            showText(dynamicTemplate(oldchoice + `<div class="spacer">\n</div>` + parsedtext))
        } else {
            showText(dynamicTemplate(parsedtext)) // this is scene text
        }
        // showText(dynamicTemplate(parsedtext))
    } else {
        if(oldchoice) showText(dynamicTemplate(oldchoice)) // 
    }
    choicesElement.style.opacity = 1
    choicesElement.style.pointerEvents = 'auto'
    ingine.choicelist.forEach(e => {
        let li = (ingine.choicelist.length === 1) ? document.createElement("p") : document.createElement('li');
        li.classList.add('choice')
        li.innerHTML = e.title // or innerText but i wanted to have some italics
        // if(gamescene.chosen.includes(ingine.choicelist.indexOf(e))) { li.style.color = "var(--choice-chosen)" }
        if(e.newsetidx > -1) gamescene.chosen = []
        li.addEventListener("click", () => {
            // what needs to happen document-side when a choice is made?

            if(!gamescene.chosen.includes(ingine.choicelist.indexOf(e))) { gamescene.chosen.push(ingine.choicelist.indexOf(e)) }
            if(e.newsetidx > -1) { gamescene.oldsetidx = e.newsetidx } else { gamescene.oldsetidx = -1 }

            ingine.choose(ingine.choicelist.indexOf(e))
            choicesElement.style.opacity = 0
            choicesElement.style.pointerEvents = 'none'
            // choicesElement.innerHTML = '<p>&nbsp;</p>'*choicesElement.children.length // insane

            // setTimeout(showText(e.text), 400)
            // setTimeout(showText(dynamicTemplate(e.text)), choicedelay) // this is choice text
            // setTimeout(run, choicedelay+textdelay)
            setTimeout(() => {
                // choice text is sent back to the function to be displayed along with the next scene text
                run(e.text)
            }, choicedelay)
            gamescene.name = current.name
        })
        if(current.name === "cave 3") {
            li.style.opacity = 0
            li.style.transition = "opacity 0.3s ease"
            li.style.pointerEvents = 'none'
            setTimeout(() => {
                li.style.opacity = 1
                li.style.pointerEvents = 'auto'
            }, 8000)
        }
        choicesElement.appendChild(li)
    })
}

id('begin').addEventListener("click", () => {
    // textElement.innerHTML = ''
    choicesElement.style.opacity = 0;
    choicesElement.style.pointerEvents = 'none'
    setTimeout(run, 1500);
});