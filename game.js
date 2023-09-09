let traits = {
    claustrophobia: false,
    road: false,
    treetop: false,
    art: false,
    hopefulCount: 0, // increment if player thoroughly investigates every possibility
}
// at the end maybe i can make some big spectacle of all the significant choices the player made
let temp = "";

let game = {
    start: {
        name: "start",
        text: `The end of summer closes in on you, and you're feeling like you're missing something--it's been like this for weeks. You're not unhappy, but 
        there's something that's been bugging you since May. Last week, you decided to relive some old memories and you've finally got the time.<br><br>You 
        close your car door and the sound reverberates through the forest. You're on the side of a road, on a small bridge crossing a creek.
        The road curves off into the distance, but you're here for the remains of a trail that you see leading towards the creek. It's approaching dusk.`,
        choiceset: [[
                {
                    title: "Follow the road",
                    text: `Although there is meager space, the road seems quiet and relatively safe. Staying as close to the edge as possible, you set 
                    off--hoping the road takes you to your quarry faster than the trail.`,
                    scene: "road 1",
                    action: () => traits.road = true
                },
                {
                    title: "Take the trail",
                    text: "The heavily faded trail leads you through the dark forest floor, weaving between trees and depositing you at a long-dried creekbed.",
                    scene: "creek 1",
                },
            ]]
    },
    "road 1": {
        name: "road 1",
        text: `Dusk approaches, and the road stays silent. Leaves scatter and branches rustle in the wind, but the surrounding forest is as still--if not 
        more so--than the road. You're on the hunt for a neglected artifact of your adolescence: a cave where you and your friends spent many summers.
        You remember it so clearly you can almost see it, but you've since forgotten the exact location. It might take a few hours to find it, so you're thankful for the memories' clarity. 
        You should've remembered your flashlight.`,
        choiceset: [[
                {
                    title: "Keep walking",
                    scene: 'road 2',
                    text: `Enjoying the evening, your feet fall on the asphalt with pleasant taps. Though you usually walked 
                    the creek with your friends, the road brings you back memories too. You used to know every corner, every turnout, and could see the whole thing 
                    in your mind's eye, tip to tip.`
                },
                {
                    title: 'Start running',
                    scene: 'road 3',
                    text: `You start feeling the pressure of the incoming darkness, so you're anxious to <i>get</i> somewhere. The forest makes you feel small, especially 
                    in the dimming light, and you'd like to be back into open air before too long. You'd rather not have to worry about finding your way back
                    in the complete darkness. You break into a gentle run.`,
                    action: function() { traits.claustrophobia = true }
                }
            ]]
    },
    "road 2": {
        name: "road 2",
        text: `It's almost like a scene from a dream. You veer into the center of the road to hug the double yellow with your feet, you spread your arms out and
        look at the tree canopies above you. The riparian forest does well intertwined with the redwoods, and the strong scent of bay tickles your nose.`,
        choiceset: [[{
            title: "Continue",
            scene: "road 3",
            text: "You could walk this road forever."
        }]]
    },
    "road 3": {
        name: "road 3",
        text: "${(traits.claustrophobia) ? 'To your relief, the':'After a few minutes, the'} whole view opens up--what was once a steep slope rises to meet the road grade as a meadow with a stunning oak "+
        `tree. Circling a stand of redwoods, the meadow dips into the forest--down towards the creek you parked above--and the border between them is marked by an old barbed wire fence. The receding 
        sunlight makes the grasses' long shadows sway across the road, almost intoxicatingly. The dull light from the bay catches your eye; it always seems a much 
        paler blue this time of evening. The scene sparked your memory, and now you recognize some of the landmarks you once knew so well. <i>This must be it,</i> you think.`,
        choiceset: [[
            {
                title: "Head into the creek",
                text: `With renewed excitement you make haste through the field of blue wild rye and the occasional shrub, landing in front of the fence that divides the sun-golden meadow from 
                the dark forest.`,
                scene: "downriver 2"
            },
            {
                title: "Approach the oak",
                text: `The familiarity of the place takes over and you let yourself be guided through the stalks of blue wild rye and rattlesnake grass. The cattle that graze the field would be  
                far down the hill with the sun this low, so you follow the conspicuous path up the rise towards the base of the tree.`,
                scene: "oak"
            }
        ]]
    },
    "oak": {
        name: "oak 1",
        textfn: () => {
            let endstr = `hasn't changed significantly after all this time--a monument to the stillness of the place. The branches are all still there, and, upon further inspection, 
            a family of flycatchers has made its nest on an upper limb. You stand in awe for a moment.`
            if(traits.claustrophobia) {
                return `You never spent as much time in that cave as you did in this tree--it was less confining, less suffocating. You felt you could breathe, so now you're glad to be out 
                from under the unfriendly trees and into more familiar branches. You're glad to see it `+endstr
            } else {
                return `Some of your friends spent more time in the tree than you did, but it still felt like another home to you. Sometimes the group would split and you'd be in the cave  
                while some of the others watched the sun set. You can picture exactly how they'd all sit in the tree. Surprisingly, considering how long it's been, it `+endstr
            }
        },
        choiceset: [
            [
                {
                    title: "Climb into the tree",
                    newsetidx: 1,
                    text: "With an effort indicative of your age, you pull yourself into the crotch between the first branch and the trunk. It's smaller than you remember."
                },
                {
                    title: "Touch the trunk",
                    text: `The trunk is thick, with beautifully aged bark. Your hand comes to rest where a branch once was--now, there is but a small hole. You run your hand around the edge 
                    of it and down the tree as far as you can. Your fingers meet the dry ground and you're shocked the tree is as old as it is.`
                },
                {
                    title: "Leave the tree and head into the creek",
                    text: "you go into the creek",
                    scene: "downriver 2"
                }
            ],
            [
                {
                    title: "Climb higher",
                    text: `Gathering yourself, you grab on to the next branch and bring yourself up, towards the flycatcher nest. You could do it with such ease all those years ago, but your time for climbing trees has
                    come and gone.`,
                    scene: "treetop"
                },
                {
                    title: "Go down",
                    text: "Though this tree is full of memories, it's not what you're looking for. You return to the ground.",
                    newsetidx: 0
                }
            ]
        ]
    },
    "oak 2": {
        name: "oak 2", // second oak scene for when you come down from the top.
        text: "The old tree reaches into the dusk with a confidence that only comes with age.",
        choiceset: [[
            {
                title: "Touch the trunk",
                text: `The trunk is thick, with beautifully aged bark. Your hand comes to rest where a branch once was--now, there is but a small hole. You run your hand around the edge 
                of it and down the tree as far as you can. Your fingers meet the dry ground and you're shocked the tree is as old as it is.`
            },
            {
                title: "Leave the tree and head into the creek",
                text: "you go into the creek",
                scene: "downriver 2"
            }
        ]]
    },
    "treetop": {
        name: "treetop",
        text: `You had a view before, but the scene that opens itself before you as you come to rest on the highest branch is incomparable. The late summer sun has just sunk below the treeline, 
        and you can't help but feel a slight sadness at the sight. Tan oaks and bays wave their upper branches, and distant coyote bush sways stiffly back and forth at the gesture of a wind. You remember 
        how the meadow looked years ago--different, but <i>how</i> you're not quite clear. Maybe the dirt is drier, the air warmer. Maybe the iconic redwood grove lost a member or the cattle 
        beat through the grass differently this season, forming a new trail.<br><br>Maybe you're getting older. Maybe the magic and wonder of your youth has yielded to practicality and disinterest--
        why? You shiver slightly as the evening breeze picks up again. The blue wild rye rustles with it.`,
        choiceset: [[
            {
                title: "Sit",
                text: `The branch is rough against the inside of your leg, but it's comfortable. With the breeze still blowing you close your eyes and breathe deeply. You can smell the fog, slowly 
                climbing up from the coast.`
            },
            {
                title: "Return to the ground",
                text: `Eyes damp, you dislodge yourself from the branch. You place your hands and feet on the familiar bumps and knots. A gentle wind blows your hair across your forehead, into your face. 
                It's a beautiful evening to be anywhere, but especially here.`,
                scene: "oak 2",
                action: function() { traits.treetop = true }
            }
        ]]
    },
    "downriver 2": {
        name: "downriver 2",
        text: `downriver 2`,
        choiceset: [[
            {
                title: "Head into the creek",
                text: "you go into the creek",
                scene: "downriver 2"
            }
        ]]
    },
    "creek 1": {
        name: "creek 1",
        text: `The path deposits you at the bank of a dry creekbed next to a stand of redwoods. Their needles whisper to you, and you can faintly hear 
        birds settling in for the night before they begin their fall migration in search of undying sunlight. Your search, however, is instead in darkness--you're 
        trying to find a bygone adolescent hideout: a cave where you and your friends spent the better part of your pre-adult summers. You can picture it clearly, 
        albeit through the rose-colored glasses of memory, and you're confident you can find it before too long. A culvert leads off to your right, back underneath the road, 
        but you know that your cave is on the western side of the highway.`,
        choiceset: [[
            {
                title: "Enter the culvert",
                text: `You climb up the block of concrete that separates the culvert from the creek, immediately greeted by broken glass and mixed garbage. 
                It's not unpleasant, but the spectacle of it is overshadowed by the heavily spraypainted walls of the culvert.`,
                scene: "tunnel 1"
            },
            {
                title: "Follow the creek",
                text: "Moving towards the setting sun, you climb over rocks and trees fallen at improbable angles. Sword ferns and hedgenettles line the bank, reminiscent of wetter years.",
                scene: "creek 2"
            }
        ]]
    },
    "tunnel 1": {
        name: "tunnel 1",
        text: `The inside of the pipe is lined with pictures. Body parts and animals and trees line the walls, complementing the stars and eulogies that follow them. 
        Some of them have been painted over, but mostly the spraypaint triumphs--it's almost an ecosystem of its own.`,
        choiceset: [[
            {
                title: "Inspect the graffiti",
                text: `It's almost unfortunate that the errant herd of deer would have to see themselves depicted like this, but you're not going to do anything. 
                The squirrels and moles must be happy, unrepresented and uninsulted.`,
                scene: "tunnel 2",
                action: () => {traits.art = false}
            },
            {
                title: "Admire the art",
                text: `There's someone's name written in big letters, a constellation splattered across the ceiling. How sacred it must be to imprint someone's being onto the walls of a drain pipe, 
                beneath a deeply wooded road. How profane, to be erased by maintenance crews decennially.`,
                scene: "tunnel 2",
                action: () => {traits.art = true}
            }
        ]]
    },
    "tunnel 2": {
        name: "tunnel 2",
        text: `In front of you, the fading light at the end of the tunnel gives an impermanent air to the whole scene.`, // e suggested revision for flow here
        choiceset: [[
            {
                title: "Return to the creek",
                text: "${(traits.art) ? 'The moment is over; you':'Ready to move on, you'} hop back down into the creek.",
                scene: 'creek 2'
            }
        ]]
    },
    "creek 2": {
        name: "creek 2",
        text: `Ahead, the creek bends to the right. A family of redwoods stands to the inside of the corner, tan oaks and bays nestled beside it, askew. 
        You remember this spot, even through the fading light.`,
        choiceset: [[
            {
                title: "Keep moving",
                text: `It's a beautiful evening to be deep in the woods--even in a place as familiar as this. You know this creek, 
                and you know it well. It's been years, but you can still recognize some of the rocks and fallen trees.
                `,
                scene: "creek 3"
            },
            {
                title: "Hurry",
                // not a fan of this (below)
                text: "Conscious of the time of day, you adjust your pace, taking care not to hurt yourself on the scattered rocks.",
                scene: "creek 4",
            }
        ]]
    },
    "creek 3": {
        name: "creek 3",
        text: ``,
        choiceset: [[
            {
                
            }
        ]]
    },
    "test": {
        text: "bad",
        textfn: function() {
            return 'good'
        },
        choiceset: [[
            {
                title: "Keep moving",
                text: "",
                scene: "",
                action: () => {}
            }
        ]]
    }
}