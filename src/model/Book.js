/**
 * @fileOverview  The model class Book with attribute definitions and storage management methods
 * @author Gerd Wagner
 * @copyright Copyright � 2013-2014 Gerd Wagner, Chair of Internet Technology, Brandenburg University of Technology, Germany.
 * @license This code is licensed under The Code Project Open License (CPOL), implying that the code is provided "as-is",
 * can be modified to create derivative works, can be redistributed, and can be used in commercial applications.
 */
/**
 * Constructor function for the class Book
 * @constructor
 * @param {{isbn: string, title: string, year: number}} slots - Object creation slots.
 */
// Book -> Player
function Player( slots ) {
  this.color = slots.color;
  this.solution = slots.solution;
};
/***********************************************
***  Class-level ("static") properties  ********
************************************************/
Book.instances = {};  // initially an empty associative array

/*********************************************************
***  Class-level ("static") storage management methods ***
**********************************************************/
// Convert row to object
Player.convertRow2Obj = function (playerRow) {
  var player = new Player( playerRow);
  return player;
};
// Load the book table from Local Storage
Player.loadAll = function () {
  var key="", keys=[], booksString="", books={}, i=0;
  try {
    if (localStorage.getItem("players")) {
      playersString = localStorage.getItem("players");
    }
  } catch (e) {
    alert("Error when reading from Local Storage\n" + e);
  }
  if (booksString) {
    players = JSON.parse( playersString);
    keys = Object.keys( players);
    console.log( keys.length +" players loaded.");
    for (i=0; i < keys.length; i++) {
      key = keys[i];
      Player.instances[key] = Player.convertRow2Obj( books[key]);
    }
  }
};
//  Save all book objects to Local Storage
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
//  Create a new book row
Player.add = function (slots) {
  var player = new Player( slots );
  Player.instances[slots.color] = player;
  console.log("Player " + slots.color + " created!");
};
//  Update an existing book row
Player.update = function (slots) {
  var player = Player.instances[slots.color];
  //var year = parseInt( slots.year );
  if (player.solution !== slots.solution) { player.solution = slots.solution;}
  //if (book.year !== slots.year) { book.year = year;}
  console.log("Player " + slots.color + " modified!");
};
//  Delete a book row from persistent storage
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
  Player.instances["red"] = new Player({color:"red", solution:{person:1, place:21, weapon:41} });
  Player.instances["blue"] = new Player({color:"blue", solution:{person:2, place:22, weapon:42} });
  Player.instances["black"] = Player({color:"black", solution:{person:3, place:23, weapon:43} });
  Player.saveAll();
};
//  Clear data
Player.clearData = function () {
  if (confirm("Do you really want to delete all player data?")) {
    Player.instances = {};
    localStorage.setItem("players", "{}");
  }
};
