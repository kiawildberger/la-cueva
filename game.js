let traits = {
    claustrophobia: false
}
let temp = "";

let game = {
    start: {
        name: "start",
        text: `The end of summer closes in on you, and you're feeling like you're missing something--it's been like this for weeks. You're not unhappy, but 
        there's something that's been bugging you since May. Last week you decided to relive some old memories, and you've finally got the time.<br><br>You 
        close your car door and it reverberates through the forest. You're on the side of a road, on a small bridge crossing a creek.
        The road curves off into the distance but you're here for the remains of a trail that you see leading towards the creek. It's approaching dusk.`,
        choiceset: [[
                {
                    title: "Follow the road",
                    text: `Although there is meager space, the road seems quiet and relatively safe. Staying as close to the edge as possible, you set 
                    off--hoping the road takes you to your quarry faster than the trail.`,
                    location: "road 1",
                },
                {
                    title: "Take the trail",
                    text: "The heavily faded trail leads you through the dark forest floor, weaving between trees and depositing you at a long-dried creekbed.",
                    location: "creek 1",
                },
            ]]
    },
    "road 1": {
        name: "road 1",
        text: `Dusk approaches, and the road stays silent. Leaves scatter and branches rustle in the wind, but the surrounding forest is as still--if not 
        more so--than the road. You're on the hunt for a mostly forgotten artifact of your childhood: a treehouse that you and your friends built over a summer.
        You remember it so clearly you can almost see it, but you've since forgotten the exact location. You know you're in the area, but it might take a few hours
        to find it.`,
        choiceset: [[
                {
                    title: "Keep walking",
                    location: 'road 2',
                    text: "Enjoying the evening, your feet fall on the asphalt with pleasant taps."
                },
                {
                    title: 'Start running',
                    location: 'road 3',
                    text: `Feeling the pressure of the incoming fog and darkness, you break into a jog. The forest makes you feel small, especially 
                    in the dimming light. You're anxious to <i>get</i> somewhere.`,
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
            location: "road 3",
            text: "You could walk this road forever."
        }]]
    },
    "road 3": {
        name: "road 3",
        // (traits.claustrophobia) ? "Finally, the":"The"
        text: "${(traits.claustrophobia) ? 'Finally, the':'The'} whole view opens up--what was once a steep embankment rises to meet the road grade as a large field with a stunning oak tree. The meadow "+
        "dips into the forest, towards the creek you parked on top of. The receding "+
        "sunlight makes the grasses' long shadows sway across the road, almost intoxicatingly. The bay is mostly invisible; you can even feel a slight drizzle from "+
        "the incoming fog. The scene sparked your memory, and now you recognize some of the landmarks you once knew so well. <i>This must be it,</i> you think.",
        choiceset: [[
            {
                title: "Approach the oak",
                text: "you approach the oak",
                location: "oak"
            },
            {
                title: "Head into the creek",
                text: "you go into the creek",
                location: "downriver 2"
            }
        ]]
    },
    "oak": {
        title: "tree 1",
        text: `oak tree.`,
        choiceset: [[
            {
                title: "Head into the creek",
                text: "you go into the creek",
                location: "downriver 2"
            }
        ]]
    },
    "downriver 2": {
        title: "downriver 2",
        text: `downriver 2`,
        choiceset: [[
            {
                title: "Head into the creek",
                text: "you go into the creek",
                location: "downriver 2"
            }
        ]]
    },
    "creek 1": {
        title: "creek 1",
        text: `creek !!!`,
        choiceset: [[

        ]]
    }
}