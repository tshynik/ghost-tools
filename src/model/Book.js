/**
 * @fileOverview  The model class Book with attribute definitions and storage management methods
 * @author Gerd Wagner
 * @copyright Copyright � 2013-2014 Gerd Wagner, Chair of Internet Technology, Brandenburg University of Technology, Germany.
 * @license This code is licensed under The Code Project Open License (CPOL), implying that the code is provided "as-is",
 * can be modified to create derivative works, can be redistributed, and can be used in commercial applications.
 */
/**
 * Constructor function for the class Player
 * @constructor
 * @param {{isbn: string, title: string, year: number}} slots - Object creation slots.
 */
// Book -> Player
function Player( slots ) {
  this.color = slots.color;
  this.person = slots.person;
  this.place = slots.place;
  this.weapon = slots.weapon;
};
/***********************************************
***  Class-level ("static") properties  ********
************************************************/
Player.instances = {};  // initially an empty associative array

/*********************************************************
***  Class-level ("static") storage management methods ***
**********************************************************/
// Convert row to object
Player.convertRow2Obj = function (playerRow) {
  var player = new Player( playerRow );
  return player;
};
// Load the player table from Local Storage
Player.loadAll = function () {
  var key="", keys=[], playersString="", players={}, i=0;
  try {
    if (localStorage.getItem("players")) {
      playersString = localStorage.getItem("players");
    }
  } catch (e) {
    alert("Error when reading from Local Storage\n" + e);
  }
  if (playersString) {
    players = JSON.parse( playersString);
    keys = Object.keys( players);
    console.log( keys.length +" players loaded.");
    for (i=0; i < keys.length; i++) {
      key = keys[i];
      Player.instances[key] = Player.convertRow2Obj( players[key]);
    }
  }
};
//  Save all player objects to Local Storage
Player.saveAll = function () {
  var playersString="", error=false,
      nmrOfPlayers = Object.keys( Player.instances).length;
  try {
    playersString = JSON.stringify( Player.instances);
    localStorage.setItem("players", playersString);
  } catch (e) {
    alert("Error when writing to Local Storage\n" + e);
    error = true;
  }
  if (!error) console.log( nmrOfPlayers + " players saved.");
};
//  Create a new player row
Player.add = function (slots) {
  var player = new Player( slots );
  Player.instances[slots.color] = player;
  console.log("Player " + slots.color + " created!");
};
//  Update an existing player row
Player.update = function (slots) {
  var player = Player.instances[slots.color];
  //var year = parseInt( slots.year );
  if (player.person !== slots.person) { player.person = slots.person;}
  if (player.place !== slots.place) { player.place = slots.place;}
  if (player.weapon !== slots.weapon) { player.weapon = slots.weapon;}
  console.log("Player " + slots.color + " modified!");
};
//  Delete a player row from persistent storage
Player.destroy = function (color) {
  if (Player.instances[color]) {
    console.log("Player " + color + " deleted");
    delete Player.instances[color];
  } else {
    console.log("There is no player with color " + color + " in the database!");
  }
};
/*******************************************
*** Auxiliary methods for testing **********
********************************************/
//  Create and save test data
Player.createTestData = function () {
  Player.instances["red"] = new Player({color:"red", person:1, place:21, weapon:41 });
  Player.instances["blue"] = new Player({color:"blue", person:2, place:22, weapon:42 });
  Player.instances["black"] = Player({color:"black", person:3, place:23, weapon:43 });
  Player.saveAll();
};
//  Clear data
Player.clearData = function () {
  if (confirm("Do you really want to delete all player data?")) {
    Player.instances = {};
    localStorage.setItem("players", "{}");
  }
};
