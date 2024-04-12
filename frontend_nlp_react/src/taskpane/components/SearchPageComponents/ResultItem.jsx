import React, { useState, useEffect } from "react";
import { BookQuestionMark24Regular, ChevronRight24Filled, DocumentDismiss24Regular } from "@fluentui/react-icons";
import "./ResultItem.css";

const ResultItem = ({ title, state, date, url }) => {
  const [showSummary, setShowSummary] = useState(false);
  const [showEmbeddedPage, setShowEmbeddedPage] = useState(false);
  const [embeddedContent, setEmbeddedContent] = useState(""); // State to hold embedded content

  useEffect(() => {
    if (showEmbeddedPage) {
      const newUrl = url.replace("https://legiscan.com", "/legiscan");
      fetch(newUrl)
        .then((response) => {
          console.log("Response Text: ", response.text());
          console.log("Response: ", response);
          if (!response.ok) {
            throw new Error("Failed to fetch content");
          }
          return response.text();
        })
        .then((html) => {
          console.log("Entered html: ", htmls);
          const parser = new DOMParser();
          console.log("Parser: ", parser);
          const doc = parser.parseFromString(html, "text/html");
          console.log("Parser: ", doc);
          const contentDiv = doc.getElementById("content-area");
          console.log("Content Div: ", contentDiv);
          if (contentDiv) {
            // Setting the innerHTML directly
            setEmbeddedContent(contentDiv.innerHTML);
          } else {
            console.error("Content area not found in the fetched HTML.");
          }
        })
        .catch((error) => {
          console.error("Error fetching embedded content:", error);
          console.log(url);
        });
    }
  }, [showEmbeddedPage, url]);

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

  return (
    <div className="resultItem">
      {showEmbeddedPage ? (
        <iframe
          id="embeddedIframe"
          title={title}
          className="embeddedPage"
          style={{ width: "100%", height: "100%", border: "none" }} // Inline styles for full width and height
          srcDoc={`<!DOCTYPE html><html><head><title>${title}</title></head><body>${embeddedContent}</body></html>`} // Setting srcDoc with the embedded content
        ></iframe>
      ) : (
        <div className="header">
          <div className="titleSection">
            <div className="titleInner">
              <a href={url} target="_blank" rel="noopener noreferrer" className="title" onClick={openTaskPaneWindow}>
                {title}
              </a>
            </div>
          </div>
          <div className="stateDate">
            <div className="stateDateText">{state}</div>
            <div className="stateDateText">•</div>
            <div className="stateDateText">{date}</div>
            {/* <div className="buttons">
              <button className="button">
                <DocumentDismiss24Regular />
              </button>
              <button onClick={handleChevronClick} className="button">
                <BookQuestionMark24Regular />
              </button>
              <button className="button">
                <ChevronRight24Filled />
              </button>
            </div> */}
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
      )}
    </div>
  );
};

export default ResultItem;
