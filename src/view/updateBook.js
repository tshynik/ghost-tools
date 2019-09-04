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
      optionEl.value = player.color;
      optionEl.text = player.person;
      optionEl.text = player.place;
      optionEl.text = player.weapon;
      selectBookEl.add( optionEl, null);
    }
    // when a player is selected, populate the form with the player data
    selectPlayerEl.addEventListener("change", function () {
        var player=null, key = selectPlayerEl.value;
        if (key) {
          player = Player.instances[key];
          formEl.color.value = player.color;
          formEl.person.value = player.person;
          formEl.place.value = player.place;
          formEl.weapon.value = player.weapon;
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
          person: formEl.person.value,
          place: formEl.place.value,
          weapon: formEl.weapon.value
        };
    Player.update( slots );
    formEl.reset();
  }
};