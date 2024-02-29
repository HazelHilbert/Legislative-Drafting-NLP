import React from "react";
import ReactDOM from "react-dom";
import { useState } from "react";
import { Input } from "@fluentui/react-components";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { EditArrowBack24Regular, DocumentOnePageMultiple24Regular } from "@fluentui/react-icons";
import "../css/Summarize.css";

const Summarize = () => {
  const [summarizedText, setSummarizedText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const getText = async () => {
    try {
      await Word.run(async (context) => {
        const documentBody = context.document.body;
        context.load(documentBody);
        await context.sync();
        getSummarizeText(documentBody.text);
      });
    } catch (error) {
      console.log("Error: " + error);
    }
  };

  const getSummarizeText = async (text) => {
    fetch("http://127.0.0.1:5000/summariseText/" + text)
      .then(async (response) => await response.text())
      .then((data) => setSummarizedText(data))
      .catch((error) => console.error("Error:", error));
  };

  const handleSummarize = async () => {
    await getText();
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      getBillText();
    }
  };

  const getBillText = async () => {
    fetch("http://127.0.0.1:5000/billText/" + searchQuery)
      .then(async (response) => await response.text())
      .then((data) => getSummarizeText(data))
      .catch((error) => console.error("Error:", error));
  };

  return (
    <FluentProvider theme={webLightTheme}>
      <div className="mainContainer globalStyles">
        {/* Propylon Logo */}
        <div className="image">
          <img src="../../assets/propylonFull.png" alt="Propylon Logo" />
        </div>
        {/* Search Bar */}
        <div className="searchBarContainer">
          <div className="searchInputContainer">
            <div className="searchInputWrapper">
              <Input
                appearance="underline"
                className="searchInput globalStyles"
                placeholder="Enter Bill ID"
                value={searchQuery}
                onChange={handleSearchInputChange}
                onKeyPress={handleKeyPress}
              />
            </div>
            <div className="underline"></div>
          </div>
        </div>
        {/* Summary */}
        <div className="summaryContainer">
          <div>
            <button onClick={handleSummarize} className="summaryButton">
              Summarize Text
            </button>
          </div>
          <div>
            <button className="iconButton">
              <EditArrowBack24Regular className="icon"></EditArrowBack24Regular>
            </button>
            <button className="iconButton">
              <DocumentOnePageMultiple24Regular className="icon"></DocumentOnePageMultiple24Regular>
            </button>
          </div>
        </div>
        <div className="line">
          <p>{summarizedText}</p>
        </div>
      </div>
    </FluentProvider>
  );
};

Office.onReady((info) => {
  if (info.host === Office.HostType.Word) {
    window.Word = Word;
    ReactDOM.render(<Summarize title="Propylon Legislation Summarize" />, document.getElementById("summarize-root"));
  }
});
