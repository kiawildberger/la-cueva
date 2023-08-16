let traits = {
    claustrophobia: false,
    road: false,
}
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
        `tree. The meadow dips into the forest--down towards the creek you parked above--and the border between them is marked by an old barbed wire fence. The receding 
        sunlight makes the grasses' long shadows sway across the road, almost intoxicatingly. The dull light from the bay catches your eye; it always seems a much 
        paler blue this time of evening. The scene sparked your memory, and now you recognize some of the landmarks you once knew so well. <i>This must be it,</i> you think.`,
        choiceset: [[
            {
                title: "Approach the oak",
                text: `The familiarity of the place takes over and you let yourself be guided through the stalks of blue wild rye and rattlesnake grass. The cattle that graze the field would be  
                far down the hill with the sun this low, so you follow the conspicuous path up the rise towards the base of the tree.`,
                scene: "oak"
            },
            {
                title: "Head into the creek",
                text: "you go into the creek",
                scene: "downriver 2"
            }
        ]]
    },
    "oak": {
        title: "tree 1",
        text: "",
        textfn: () => {
            let endstr = `hasn't changed significantly after all this time; a monument to the stillness of the place. The branches are all still there, and, upon further inspection, 
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
                    scene: "oak 2",
                    text: "you climb into the tree"
                },
                {
                    title: "Touch the trunk",
                    newsetidx: 1,
                    text: "you touch the tree and feel funny."
                },
                {
                    title: "Leave the tree and head into the creek",
                    text: "you go into the creek",
                    scene: "downriver 2"
                }
            ],
            [ // reaching out & touching the trunk
                {
                    title: "idk something happens",
                    text: 'yuh'
                }
            ]
        ]
    },
    "downriver 2": {
        title: "downriver 2",
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
        title: "creek 1",
        text: `creek !!!`,
        choiceset: [[

        ]]
    },
    "test": {
        text: "bad",
        textfn: function() {
            return 'good'
        },
        choiceset: [[
            {
                title: 'do thing',
                text: 'something happened !',
                newsetidx: 0
            }
        ]]
    }
}