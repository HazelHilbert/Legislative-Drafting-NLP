import React, { useState } from "react";
import { BookQuestionMark24Regular, ChevronRight24Filled, DocumentDismiss24Regular } from "@fluentui/react-icons";
import "./ResultItem.css";

const ResultItem = ({ title, state, date, url }) => {
  const [showSummary, setShowSummary] = useState(false);

  const handleChevronClick = () => {
    setShowSummary(!showSummary);
  };

  return (
    <div className="resultItem">
      <div className="header">
        <div className="titleSection">
          <div className="titleInner">
            <a href={url} target="_blank" rel="noopener noreferrer" className="title">{title}</a>
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
      </div>
      {showSummary && (
        <div className="summary">
          <div className="summaryText">
            Lorem ipsum dolor sit amet consectetur. Turpis eu mi quis nunc scelerisque non pulvinar sit lacus.
            Pellentesque ultrices vel fusce laoreet purus blandit.
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultItem;
