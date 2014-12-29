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
	this.doors = [].push(door1).push(door2).push(door3);
}

function Outcome() {
	this.wins = 0;
	this.losses = 0;
}

// Prototypes

Player.prototype.firstPick = function() {

 // TODO v

	var pick1Index = Math.shuffle(stage.doors.length).floor()
	this.pick1 = stage.doors[pick1Index];
	this.pick1.currentlySelected = true;
}

Player.prototype.secondPick = function() {
	if (this.strategy === "always-switch") {
		for (var i = 0; i < stage.doors.length; i++) {
			if ((stage.doors[i].itemName !== "prize") && (stage.doors[i].revealed === false)) {
				this.pick2 = stage.doors[i];
				this.pick2.currentlySelected = true;
				break;
			}
		}
	} else {
		this.pick2 = this.pick1;
	}
}

Stage.prototype.revealGoat = function() {
	for (var i = 0; i < this.doors.length; i++) {
		if ((this.doors[i].itemName === ("goat1" || "goat2")) 
			&& (this.doors[i].currentlySelected === false)) {
			this.doors[i].revealed = true;
		} else {
			console.log("Error! No doors with unselected goats found!")
		}
	}
}

Stage.prototype.revealGoat = function() {
	for (var i = 0; i < this.doors.length; i++) {
		if ((this.doors[i].itemName === ("goat1" || "goat2")) 
			&& (this.doors[i].currentlySelected === false)) {
			this.doors[i].revealed = true;
		} else {
			console.log("Error! No doors with unselected goats found!")
		}
	}
}

Stage.prototype.determineOutcome = function() {
	for (var i = 0; i < this.doors.length; i++) {
		if ((this.doors[i].itemName === "prize") && (this.doors[i].currentlySelected === true)) {
			outcome.wins++;
		} else {
			outcome.losses++;
		}
	}
}

// Functions

function shuffle(o){ //v1.0
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

function execute() {
	
	// Setup

	var originalItemsArray = ["prize","goat1","goat2"];
	var itemsArray = shuffle(originalItemsArray);

	var door1 = new Door(itemsArray.pop(), 1);
	var door2 = new Door(itemsArray.pop(), 2);
	var door3 = new Door(itemsArray.pop(), 3);

	var stage = new Stage(door1, door2, door3);

	var outcome = new Outcome();

	// Execute

	player.firstPick();

	stage.revealGoat();

	player.secondPick();

	stage.determineOutcome();

	console.log("There were this many wins: " + outcome.wins);
	console.log("There were this many losses: "+ outcome.losses);

	// Teardown
}



// Run simulator

function initSetup(strategy) {
	player = new Player(strategy);
	outcome = new Outcome();
}

function runSimulator(strategy) {
	var limit = 1;
	for (var i = 0; i <= limit; i++) {
		execute();
	}
}

// Listening for events on DOM

$("#always-switch").on("click", function() {
	initSetup("always-switch");
	runSimulator("always-switch");
})

$("#never-switch").on("click", function() {
	initSetup("never-switch");
	runSimulator("never-switch");
})