/***********************************************
***  Methods for the use case updatePlayer  ******
************************************************/
pl.view.updatePlayer = {
  setupUserInterface: function () {
    var formEl = document.forms['Player'],
        saveButton = formEl.commit,
        selectPlayerEl = formEl.selectPlayer;
    var key="", keys=[], player=null, optionEl=null, i=0;
    // load all player objects
    Player.loadAll();
    // populate the selection list with players
    keys = Object.keys( Player.instances);
    for (i=0; i < keys.length; i++) {
      key = keys[i];
      player = Player.instances[key];
      optionEl = document.createElement("option");
      //optionEl.text = player.title;
      optionEl.value = player.color;
      selectBookEl.add( optionEl, null);
    }
    // when a player is selected, populate the form with the player data
    selectPlayerEl.addEventListener("change", function () {
        var player=null, key = selectPlayerEl.value;
        if (key) {
          player = Player.instances[key];
          formEl.color.value = player.color;
          formEl.solution.value = player.solution;
          //formEl.year.value = player.year;
        } else {
          formEl.reset();
        }
    });
    saveButton.addEventListener("click",
        pl.view.updatePlayer.handleSaveButtonClickEvent);
    window.addEventListener("beforeunload", function () {
        Player.saveAll();
    });
  },
  // save data
  handleSaveButtonClickEvent: function () {
    var formEl = document.forms['Player'];
    var slots = { color: formEl.color.value,
          solution: formEl.solution.value
          //year: formEl.year.value
        };
    Player.update( slots);
    formEl.reset();
  }
};