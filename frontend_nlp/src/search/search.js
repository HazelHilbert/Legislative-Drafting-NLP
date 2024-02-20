/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

/* global document, Office, Word */

Office.onReady((info) => {
    if (info.host === Office.HostType.Word) {
        document.getElementById("sideload-msg").style.display = "none";
        document.getElementById("app-body").style.display = "flex";
        document.getElementById("getDoc").onclick = getDoc; 
    }
});

document.getElementById("searchButton").addEventListener("click", performSearch);
document.getElementById("searchInput").addEventListener("keypress", function (event) {
    if (event.keyCode === 13) {
        performSearch();
    }
});

async function getDoc() {
    var searchText = document.getElementById("searchInput").value;
    fetch("http://127.0.0.1:5000/billText/" + searchText)
        .then(async response => await response.text())
        .then(data => createDoc(searchText,data))
        .catch(error => console.error('Error:', error));
}

async function createDoc(searchText,text) {
    fetch("http://127.0.0.1:5000/generate_document/"+searchText+"/" + text)
        .then(async response => await response.text())
        .then(data => displayOutput(data))
        .catch(error => console.error('Error:', error));
}

async function performSearch() {
    var searchText = document.getElementById("searchInput").value;
    fetch("http://127.0.0.1:5000/billText/" + searchText)
        .then(async response => await response.text())
        .then(data => displayOutput(data))
        .catch(error => console.error('Error:', error));
}

function displayOutput(text) {
    var outputDiv = document.getElementById('output');
    outputDiv.innerHTML = "<p>" + text + "</p>";
}