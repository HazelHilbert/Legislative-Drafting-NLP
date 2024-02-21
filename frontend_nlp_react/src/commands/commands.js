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

// Register the function with Office.
Office.actions.associate("action", action);
Office.actions.associate("openWebsite", openWebsite);
