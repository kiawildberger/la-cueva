let game = {
    start: {
        name: "start",
        text: `You close your car door and it reverberates through the forest. You're on the side of a road, on a small bridge crossing a creek.
        The road curves off into the distance but you're here for the remains of a trail that you see leading towards the creek. It's approaching dusk.`,
        choiceset: [[
                {
                    title: "Follow the road",
                    text: "Although there is meager space, the road seems quiet and relatively safe. Staying as close to the edge as possible, you set off--hoping the road takes you to your quarry faster than the trail.",
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
                    title: "run",
                    text: "you run",
                    location: 'road 3'
                },
                {
                    title: 'keep walking',
                    text: "you continue walking",
                    location: 'road 2'
                }
            ]]
    },
    "creek 1": {
        name: "creek 1",
        text: `creek !!!`,
        choiceset: [[

        ]]
    }
}