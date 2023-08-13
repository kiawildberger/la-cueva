/*

    locations have choice sets, made up of choices. locations can change choice sets
    choice sets obv have choices, which lead to dialogue, more choices (from choice sets) and locations

    the whole object should look like
    {
        motel_lobby: {},
        motel_stairwell: {},
        motel_hallway: {}
    }
    this is what gets passed into the constructor function

    a location might look like:
    motel_lobby: {
        name: "Motel Lobby",
        text: 'The clerk eyes you from behind his screen.',
        setidx: 0, // initially set to the default choice list, this gets changed by the engine
        choiceset: [ // a multidimensional array of choices. switch between sets depending on situation
            [
                {},
                {},
                {}
            ],
            [
                {},
                {}
            ]
        ]
    }

    maybe choice looks like:
        { // choices shouldn't (?) need to refer to other choices, so they are unnamed. in array probably and disco elysium-type number em out
            title: "Kill him", // what the player clicks on
            text: "You reach out and stab the man, repeatedly, 28 times.", // the resulting text
            location: null, // location that this choice ends on. null if doesn't move
            newsetidx: 1, // changes the set index at the current location. for conditional things probably best to do it in the cb, which is why i want 'this'
            action: () => Imogen.state.charlieDead = true // optional callback to set flags/whatever when this choice is made
            // using function() {} grants access to the Ingine object with 'this', but using an arrow function does not.
        }
*/

// this thing (name wip) is just the choice engine.
// the game is wrapped with a bunch of other stuff but this takes care of navigating the location/choices json and spitting out info
class Ingine { 
    constructor(locations_obj, starting_location, loopFn = null) {
        // this.loopFn = loopFn; // function that gets called repeatedly to manage the elements onscreen
        this.lobj = locations_obj // in the format above.
        this.current = locations_obj[starting_location]
        this.previous = {};
        this.choicelist = this.current.choiceset[this.indexOrZero(this.current.setidx)]; // this gets updated with each location, either directly or from the choice set
    }
    choose(idx) {
        // i dont need to check if there is a choiceset, because the choiceset property will always be at least 1 array deep.
        // so this.current.setidx is 0 if there's only one set
        this.current.setidx = this.indexOrZero(this.current.setidx)
        this.choicelist = this.current.choiceset[this.current.setidx];
        let choice = this.current.choiceset[this.current.setidx][idx]
        if(choice.newsetidx) this.current.setidx = choice.newsetidx;
        if(choice.location) { 
            this.previous = this.current;
            if(this.current.keepChoiceIdx == undefined || !this.current.keepChoiceIdx) this.current.setidx = 0;
            this.current = this.lobj[choice.location];
            this.current.setidx = this.indexOrZero(this.current.setidx)
            this.choicelist = this.current.choiceset[this.indexOrZero(this.current.setidx)]
        }
        if(choice.action) choice.action.call(this); // i hope 'this' is preserved in these callbacks? ill have to see when it all works
        if(choice.action) console.log('func called')
        return choice;
    }
    indexOrZero(idx) { // setidx will commonly frequently be undefined
        return (idx == undefined) ? 0 : idx;
    }
    getLocationText() {
        return this.current.text
    }
}