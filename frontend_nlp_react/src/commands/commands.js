/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

/* global Office */

Office.onReady((info) => {
  if (info.host === Office.HostType.Document) {
    // Assign event handlers and initialize the add-in here
  }
});

/**
 * Shows a notification when the add-in command is executed.
 * @param event {Office.AddinCommands.Event}
 */
function action(event) {
  const message = {
    type: Office.MailboxEnums.ItemNotificationMessageType.InformationalMessage,
    message: "Performed action.",
    icon: "Icon.80x80",
    persistent: true,
  };

  // Show a notification message.
  Office.context.mailbox.item.notificationMessages.replaceAsync("action", message);

  // Be sure to indicate when the add-in command function is complete.
  event.completed();
}

/**
 * Opens the specified website in the default system browser.
 * @param event {Office.AddinCommands.Event}
 */
function openWebsite(event) {
  Office.context.ui.openBrowserWindow("https://propylon.com");
  event.completed();
}

function summarizeText(event) {
  Word.run(async (context) => {
    const range = context.document.getSelection();
    context.load(range, 'text');
    await context.sync();

    if (!range.text.trim()) {
      console.log("No text selected!"); 
      event.completed();
      return;
    }

    console.log("Selected text:", range.text);

    fetch(`http://127.0.0.1:5000/summariseText/${encodeURIComponent(range.text)}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(summarizedText => {
        console.log("Summarized text:", summarizedText); 
        ReactDOM.render(<Summarize summarizedText={summarizedText} />, document.getElementById("summarize-root"));
      })
      .catch(error => {
        console.error("Error summarizing text:", error);
      });

    event.completed();
  }).catch(error => {
    console.error("Error in Word.run:", error);
    event.completed();
  });
}


// Register the function with Office.
Office.actions.associate("action", action);
Office.actions.associate("openWebsite", openWebsite);
Office.actions.associate("summarizeText", summarizeText);
