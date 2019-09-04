/***********************************************
***  Methods for the use case "delete book"  ***
************************************************/
pl.view.deletePlayer = {
  setupUserInterface: function () {
    var deleteButton = document.forms['Player'].commit;
    var selectEl = document.forms['Player'].selectPlayer;
    var key="", keys=[], book=null, optionEl=null, i=0;
    // load all book objects
    Player.loadAll();
    keys = Object.keys( Player.instances );
    // populate the selection list with players
    for (i=0; i < keys.length; i++) {
      key = keys[i];
      player = Player.instances[key];
      optionEl = document.createElement("option");
      optionEl.text = player.color;
      optionEl.value = player.person;
      optionEl.value = player.place;
      optionEl.value = player.weapon;
      selectEl.add( optionEl, null);
    }
    deleteButton.addEventListener("click",
        pl.view.deletePlayer.handleDeleteButtonClickEvent);
    window.addEventListener("beforeunload", function () {
        Player.saveAll();
    });
  },
  // Event handler for deleting a book
  handleDeleteButtonClickEvent: function () {
    var selectEl = document.forms['Player'].selectPlayer;
    var color = selectEl.value;
    if (color) {
      Player.destroy( color );
      // remove deleted book from select options
      selectEl.remove( selectEl.selectedIndex );
    }
  }
};