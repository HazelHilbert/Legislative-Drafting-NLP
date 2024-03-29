import React from "react";
import ReactDOM from "react-dom";
import { useState } from "react";
import { Input } from "@fluentui/react-components";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { EditArrowBack24Regular, DocumentOnePageMultiple24Regular } from "@fluentui/react-icons";
import "../css/Summarize.css";

function removeForwardSlash(string) {
  const regex = new RegExp('/'.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
  return string.replace(regex, '');
}

const Summarize = () => {
  const [summarizedText, setSummarizedText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const getText = async () => {
    try {
      await Word.run(async (context) => {
        const documentBody = context.document.body;
        context.load(documentBody);
        await context.sync();
        if (!documentBody.text.trim()) {
          setSummarizedText("No text highlighted!");
          return; 
        }
        getSummarizeText(documentBody.text);
      });
    } catch (error) {
      setSummarizedText("Error!");
    }
  };

  const getSummarizeText = async (text) => {
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/summariseText/" + removeForwardSlash(text));
      if (!response.ok) {
        setSummarizedText("Invalid Summarize!");
      }
      const data = await response.text();
      setSummarizedText(data);
    } catch (error) {
      setSummarizedText("Invalid Summarize!");
    } finally {
      setLoading(false);
    }
  };

  console.log(loading);

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
    if (!searchQuery) {
      setSummarizedText("No text entered");
      return;
    }
    try {
      const response = await fetch("http://127.0.0.1:5000/billText/" + searchQuery);
      if (!response.ok) {
        setSummarizedText("Invalid Bill!");
        return; 
      }
      const data = await response.text();
      getSummarizeText(data);
    } catch (error) {
      setSummarizedText("Invalid Bill!");
    }
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
          {loading ? (
            <div>
              <img src="../../assets/loading.gif" />
            </div>
          ) : (
            <p>{summarizedText}</p>
          )}
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
