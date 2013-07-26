function Train(name, stations) {
  this.name = name;
  this.stations = stations;
}

Train.prototype.distance = function(board, exit) {
  board = this.stations.indexOf(board);
  exit = this.stations.indexOf(exit);
  return Math.abs(board - exit);
};

var lStations = [ "8th", "6th", "Union Square", "3rd", "1st" ];
var nStations = [ "Times Square", "34th", "28th-N", "23rd-N", "Union Square", "8th-N" ];
var sixStations = [ "Grand Central", "33rd", "28th", "23rd", "Union Square", "Astor Place" ];
var gStations = [ "Greenpoint", "Nassau", "Metropolitan", "Broadway" ];

var lTrain = new Train('The L Train', lStations);
var nTrain = new Train('The N Train', nStations);
var sixTrain = new Train('The Six Train', sixStations);
var gTrain = new Train('The G Train', gStations);

var trains = [lTrain, nTrain, sixTrain, gTrain];

function subwayRider() {

  var journeys = 1;
  var price = 2.50;

  return function() {
    // Get the start train from the user.
    var startTrain = prompt("What is your start train?\n" + _.map(trains, function(train) {return train.name;}).join("\n"));
    startTrain = _.reject((_.map(trains, function(train) {if (train.name == startTrain) {return train;} else {return 0;}})), function (num) {return num === 0;})[0];

    // Get the start station from the user.
    var startStation = prompt("What is your start station?\n" + startTrain.stations.join("\n"));

    // Get the stop train from the user.
    var stopTrain = prompt("What is your stop train?\n" + _.map(trains, function(train) {return train.name;}).join("\n"));
    stopTrain = _.reject((_.map(trains, function(train) {if (train.name == stopTrain) {return train;} else {return 0;}})), function (num) {return num === 0;})[0];

    // Get the stop station from the user.
    var stopStation = prompt("What is your stop station?\n" + stopTrain.stations.join("\n"));

    if (_.intersection(startTrain.stations, stopTrain.stations).length == startTrain.stations.length) {
      alert("Your trip has " + startTrain.distance(startStation, stopStation + "stops."));
    } else {
      intersection = _.intersection(startTrain.stations, stopTrain.stations)[0];
      alert("Your trip has " + (parseInt(startTrain.distance(startStation, intersection), 10) + parseInt(startTrain.distance(intersection, stopStation), 10) + " stops. That is " + journeys + " trips so far and your total cost has been $" + parseFloat(price) + "."));
    }
    journeys++;
    price += 2.50;
  };
}

window.onload = function() {
  var newTraveler = subwayRider();
  newTraveler();
  var answer = prompt("Would you like to take another trip? (yes/no)");
  while (answer == "yes") {
    newTraveler();
    answer = prompt("Would you like to take another trip? (yes/no)");
  }
};
