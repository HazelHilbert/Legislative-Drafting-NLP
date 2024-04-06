/*global document, Office*/

let _count = 0;

Office.onReady(() => {
  document.getElementById("sideload-msg").style.display = "none";
  document.getElementById("app-body").style.display = "flex";

  updateCount(); // Update count on first open.
  Office.addin.onVisibilityModeChanged(function (args) {
    if (args.visibilityMode === "Taskpane") {
      updateCount(); // Update count on subsequent opens.
    }
  });
});

function updateCount() {
  _count++;
  document.getElementById("run").textContent = "Task pane opened " + _count + " times.";
}