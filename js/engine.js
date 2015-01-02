// Constructors

function Player(strategy) {
	this.strategy = strategy;
}

function Door(itemName, position) {
	this.itemName = itemName;
	this.position = position;
	this.revealed = false;
	this.currentlySelected = false;
}

function Stage(door1, door2, door3) {
	this.doors = [];
	this.doors.push(door1);
	this.doors.push(door2);
	this.doors.push(door3);
}

function Outcome() {
	this.wins = 0;
	this.losses = 0;
}

// Prototypes

Player.prototype.firstPick = function(stage) {

	var pick1Index = Math.floor(Math.random() * stage.doors.length);
	stage.pick1Index = pick1Index;
	stage.doors[pick1Index].currentlySelected = true;
}

Player.prototype.secondPick = function(stage) {
	if (this.strategy == "always-switch") {
		for (var i = 0; i < stage.doors.length; i++) {
			if ((stage.doors[i].currentlySelected !== true) && (stage.doors[i].revealed === false)) {
				var pick2Index = i;
				stage.pick2Index = pick2Index;
				stage.doors[pick2Index].currentlySelected = true;
				stage.doors[stage.pick1Index].currentlySelected = false;
				break;
			}
		}
	} else {
		stage.pick2Index = stage.pick1Index;
	}
}

Stage.prototype.revealGoat = function() {
	for (var i = 0; i < this.doors.length; i++) {
		if (((this.doors[i].itemName == "goat1") || (this.doors[i].itemName == "goat2")) 
			&& (this.doors[i].currentlySelected === false)) {
			this.doors[i].revealed = true;
			break;
		} else {
			// console.log("Not a goat!");
		}
	}
}

Stage.prototype.determineOutcome = function(outcome) {
	for (var i = 0; i < this.doors.length; i++) {
		if ((this.doors[i].itemName === "prize") && (this.doors[i].currentlySelected === true)) {
			outcome.wins++;
			break;
		} else if (i === (this.doors.length - 1)) {
			outcome.losses++;
			break;
		}
	}
}

// Functions

function shuffle(o){ //v1.0
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

// Run simulator

// function initSetup(strategy) {
// 	player = new Player(strategy);
// 	outcome = new Outcome();
// }

function runSimulator(strategy) {
	// Creating more permanent objects

	var player = new Player(strategy);
	var outcome = new Outcome();	

	var limit = 1000;
	for (var i = 0; i < limit; i++) {
				
		// Setup

		var originalItemsArray = ["prize","goat1","goat2"];
		var itemsArray = shuffle(originalItemsArray);

		var door1 = new Door(itemsArray.pop(), 1);
		var door2 = new Door(itemsArray.pop(), 2);
		var door3 = new Door(itemsArray.pop(), 3);

		var stage = new Stage(door1, door2, door3);

		// Execute

		player.firstPick(stage);

		stage.revealGoat();

		player.secondPick(stage);

		stage.determineOutcome(outcome);

	}

	// Drawing using D3

	  var selection = d3.select(".chart")
	  .selectAll("div")
	    .data([outcome.wins, outcome.losses])
	    .style("width", function(d) { return d + "px"; })
	    .text(function(d) { return d; })
	  .enter().append("div")
	    .style("width", function(d) { return d + "px"; })
	    .text(function(d) { return d; });

	console.log("There were this many wins: " + outcome.wins);
	console.log("There were this many losses: "+ outcome.losses);
}

// Listening for events on DOM

$("#always-switch").on("click", function() {
	// initSetup("always-switch");
	runSimulator("always-switch");
})

$("#never-switch").on("click", function() {
	// initSetup("never-switch");
	runSimulator("never-switch");
})