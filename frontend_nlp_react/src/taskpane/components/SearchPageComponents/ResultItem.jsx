import React, { useState } from "react";
import { BookQuestionMark24Regular, ChevronRight24Filled, DocumentDismiss24Regular } from "@fluentui/react-icons";
import "./ResultItem.css";

const ResultItem = ({ title, state, date, url }) => {
  const [showSummary, setShowSummary] = useState(false);
  const [showEmbeddedPage, setShowEmbeddedPage] = useState(false);

  const handleChevronClick = () => {
    setShowSummary(!showSummary);
  };

  const handleAnchorClick = (event) => {
    event.preventDefault(); // Prevent default behavior of anchor tag
    setShowEmbeddedPage(true); // Show embedded page
  };


  const openTaskPaneWindow = () => {
    Office.context.ui.displayDialogAsync(url, { width: 600, height: 400 }, function (result) {
      var dialog = result.value;
      dialog.addEventHandler(Office.EventType.DialogMessageReceived, function (arg) {
        console.log("Dialog message received: " + arg.message);
      });
    });
  };

  const openUrlInTaskPane = () => {
    Office.context.ui.displayDialogAsync(url, { height: 60, width: 60 }, function () {
      const dialog = asyncResult.value;
      dialog.addEventHandler(Office.EventType.DialogMessageReceived, function (args) {
        console.log("Message received from dialog:", args.message);
      });
    });
  };

  return (
    <div className="resultItem">
      <div className="header">
        <div className="titleSection">
          <div className="titleInner">
            <a href="#" onClick={openUrlInTaskPane} className="title">
              {title}
            </a>
          </div>
        </div>
        <div className="stateDate">
          <div className="stateDateText">{state}</div>
          <div className="stateDateText">•</div>
          <div className="stateDateText">{date}</div>
          <div className="buttons">
            <button className="button">
              <DocumentDismiss24Regular />
            </button>
            <button onClick={handleChevronClick} className="button">
              <BookQuestionMark24Regular />
            </button>
            <button className="button">
              <ChevronRight24Filled />
            </button>
          </div>
        </div>
        {/* Show summary if it is toggled */}
        {showSummary && (
          <div className="summary">
            <div className="summaryText">
              Lorem ipsum dolor sit amet consectetur. Turpis eu mi quis nunc scelerisque non pulvinar sit lacus.
              Pellentesque ultrices vel fusce laoreet purus blandit.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultItem;