/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

/* global document, Office, Word */

Office.onReady((info) => {
  if (info.host === Office.HostType.Word) {
    document.getElementById("sideload-msg").style.display = "none";
    document.getElementById("app-body").style.display = "flex";
    document.getElementById("displaySelectedText").onclick = displaySelectedText; 
    document.getElementById("displayAllText").onclick = displayAllText;
  }
});

document.getElementById("searchButton").addEventListener("click", performSearch);
document.getElementById("searchInput").addEventListener("keypress", function(event) {
  if (event.keyCode === 13) {
    performSearch();
  }
});

function performSearch() {
  var searchText = document.getElementById("searchInput").value;
  displayOutput(searchText);
}

function displayOutput(text) {
  var outputDiv = document.getElementById('output');
  outputDiv.innerHTML = "<p>You searched for: " + text + "</p>";
}