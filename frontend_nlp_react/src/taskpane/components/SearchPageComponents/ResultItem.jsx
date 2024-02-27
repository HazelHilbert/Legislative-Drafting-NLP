import { BookQuestionMark24Regular, ChevronRight24Filled, DocumentDismiss24Regular } from "@fluentui/react-icons";
import React, { useState } from "react";

// Results Tab
//      Results page showing the results from search. The results page include an insert button allowing to insert a search result
//      into the word document. (Still needs to be integrated with backend).
const ResultItem = ({ title, state, date }) => {
  const [showSummary, setShowSummary] = useState(false);

  const handleChevronClick = () => {
    setShowSummary(!showSummary);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "white",
        borderRadius: 4,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        gap: 7,
        display: "inline-flex",
      }}
    >
      <div
        style={{
          alignSelf: "stretch",
          background: "white",
          borderRadius: 4,
          justifyContent: "space-between",
          alignItems: "center",
          display: "inline-flex",
        }}
      >
        <div
          style={{
            paddingLeft: 6,
            paddingRight: 4,
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 4,
            display: "flex",
          }}
        >
          <div
            style={{
              paddingLeft: 2,
              paddingRight: 2,
              justifyContent: "flex-start",
              alignItems: "center",
              gap: 10,
              display: "flex",
            }}
          >
            <div
              style={{
                color: "#424242",
                fontSize: 14,
                fontFamily: "Segoe UI",
                fontWeight: "700",
                textDecoration: "underline",
                wordWrap: "break-word",
              }}
            >
              {title}
            </div>
          </div>
        </div>
        <div style={{ paddingLeft: 4, justifyContent: "flex-end", alignItems: "center", gap: 4, display: "flex" }}>
          <div
            style={{
              width: 119,
              paddingLeft: 2,
              paddingRight: 4,
              justifyContent: "flex-start",
              alignItems: "center",
              gap: 10,
              display: "flex",
            }}
          >
            <div
              style={{
                textAlign: "right",
                color: "#616161",
                fontSize: 14,
                fontFamily: "Segoe UI",
                fontWeight: "400",
                wordWrap: "break-word",
              }}
            >
              {state} • {date}
            </div>
          </div>
          <div style={{ justifyContent: "flex-end", alignItems: "center", display: "flex" }}>
            <button style={{ border: "none", background: "none", cursor: "pointer" }}>
              <DocumentDismiss24Regular style={{ width: 16, height: 16, position: "relative" }}>
                {" "}
              </DocumentDismiss24Regular>
            </button>
            <button onClick={handleChevronClick} style={{ border: "none", background: "none", cursor: "pointer" }}>
              <BookQuestionMark24Regular style={{ width: 16, height: 16, position: "relative" }}>
                {" "}
              </BookQuestionMark24Regular>
            </button>
            <button style={{ border: "none", background: "none", cursor: "pointer" }}>
              <ChevronRight24Filled style={{ width: 16, height: 16, position: "relative" }}> </ChevronRight24Filled>
            </button>
          </div>
        </div>
      </div>
      {showSummary && (
        <div
          style={{
            alignSelf: "stretch",
            paddingBottom: 7,
            paddingLeft: 7,
            paddingRight: 7,
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: 10,
            display: "inline-flex",
          }}
        >
          <div
            style={{
              flex: "1 1 0",
              height: 48,
              color: "#333333",
              fontSize: 12,
              fontFamily: "Segoe UI",
              fontWeight: "400",
              wordWrap: "break-word",
            }}
          >
            Lorem ipsum dolor sit amet consectetur. Turpis eu mi quis nunc scelerisque non pulvinar sit lacus.
            Pellentesque ultrices vel fusce laoreet purus blandit.
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultItem;
