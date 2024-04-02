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

  return (
    <div className="resultItem">
      {/* Check if embedded page should be shown */}
      {showEmbeddedPage ? (
        <iframe src={url} title={title} className="embeddedPage"></iframe>
      ) : (
        <div className="header">
          <div className="titleSection">
            <div className="titleInner">
              {/* Attach onClick event handler to anchor tag */}
              <a href={url} target="_blank" rel="noopener noreferrer" className="title" onClick={handleAnchorClick}>
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
      )}
    </div>
  );
};

export default ResultItem;