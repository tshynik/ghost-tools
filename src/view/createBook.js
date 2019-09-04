/***********************************************
***  Methods for the use case createBook  ******
************************************************/
pl.view.createPlayer = {
  setupUserInterface: function () {
    var saveButton = document.forms['Player'].commit;
    // load all book objects
    Player.loadAll();
    // Set an event handler for the save/submit button
    saveButton.addEventListener("click",
        pl.view.createPlayer.handleSaveButtonClickEvent);
    window.addEventListener("beforeunload", function () {
        Player.saveAll();
    });
  },
  // save user input data
  handleSaveButtonClickEvent: function () {
    var formEl = document.forms['Player'];
    var slots = { color: formEl.color.value,
        solution: formEl.solution.value
    };
    Player.add( slots );
    formEl.reset();
  }
};