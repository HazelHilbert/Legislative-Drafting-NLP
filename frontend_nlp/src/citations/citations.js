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

async function displaySelectedText() {
  return Word.run(async (context) => {
    const range = context.document.getSelection();
    range.load("text");
    await context.sync();
    // Set the selected text inside the selectedText div
    document.getElementById("selectedText").innerText = range.text;
  }).catch(function (error) {
    console.log("Error: " + JSON.stringify(error));
    if (error instanceof OfficeExtension.Error) {
      console.log("Debug info: " + JSON.stringify(error.debugInfo));
    }
  });
}

async function displayAllText() {
  return Word.run(async (context) => {
    const body = context.document.body;
    body.load("text");
    await context.sync();
    document.getElementById("selectedText").innerText = body.text;
  }).catch(function (error) {
    console.log("Error: " + JSON.stringify(error));
    if (error instanceof OfficeExtension.Error) {
      console.log("Debug info: " + JSON.stringify(error.debugInfo));
    }
  });
}