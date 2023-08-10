const id = e => {return document.getElementById(e)}
let textElement = id('textarea')
let choicesElement = id('choices')

let ingine = new Ingine(game, "start");

function showText(text) {
    let p = document.createElement('p')
    text = text.replace(/--/g, '—') // em dash
    p.innerHTML = text // innerHTML for italics etc
    let slideheight;
    if(textElement.children.length >= 1) {
        slideheight = (text.length/76) * (18*1.6) // approx. 76 char per line, font size 18 and line spacing 1.6
        document.body.style.setProperty('--slide-height', Math.round(slideheight)+"px")
        textElement.children[textElement.children.length-1].style.animation = "slideup .2s ease";
    }
    setTimeout(() => {
        textElement.appendChild(p)
        console.log(p.offsetHeight, slideheight);
    }, 205)
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


let gamelocation = {name:undefined}
function run() {
    choicesElement.innerHTML = ''
    let { current } = ingine;
    // only the choices update if the location doesn't change
    if(current.name != gamelocation.name) showText(current.text.replace(/\t|\n/g, ''))
    ingine.choicelist.forEach(e => {
        let li = document.createElement('li')
        li.innerText = e.title
        li.addEventListener("click", () => {
            // what needs to happen document-side when a choice is made?
            ingine.choose(ingine.choicelist.indexOf(e))
            choicesElement.style.opacity = 0
            // choicesElement.innerHTML = '<p>&nbsp;</p>'*choicesElement.children.length // insane
            choicesElement.style.pointerEvents = 'none'
            setTimeout(showText(e.text), 400)
            setTimeout(run, 800)
            // writeText(e.text, run)
        })
        choicesElement.appendChild(li)
    })
    choicesElement.style.opacity = 1
    choicesElement.style.pointerEvents = 'auto'
}

id('begin').addEventListener("click", () => {
    // textElement.innerHTML = ''
    choicesElement.style.opacity = 0;
    choicesElement.style.pointerEvents = 'none'
    setTimeout(run, 1500);
})