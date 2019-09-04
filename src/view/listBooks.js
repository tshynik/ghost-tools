/**
 * @fileOverview  Contains various view functions for the use case listBooks
 * @author Gerd Wagner
 */
 pl.view.listPlayers = {
  setupUserInterface: function () {
    var tableBodyEl = document.querySelector("table#players>tbody");
    var keys=[], key="", row={}, i=0;
    // load all player objects
    Player.loadAll();
    keys = Object.keys( Player.instances );
    // for each book, create a table row with a cell for each attribute
    for (i=0; i < keys.length; i++) {
      key = keys[i];
      row = tableBodyEl.insertRow();
      row.insertCell(-1).textContent = Player.instances[key].color;
      row.insertCell(-1).textContent = Player.instances[key].person;
      row.insertCell(-1).textContent = Player.instances[key].place;
      row.insertCell(-1).textContent = Player.instances[key].weapon;
    }
  }
};