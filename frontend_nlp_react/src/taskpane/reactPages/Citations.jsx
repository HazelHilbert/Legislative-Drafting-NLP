import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Input } from "@fluentui/react-components";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { EditArrowBack24Regular, DocumentOnePageMultiple24Regular } from "@fluentui/react-icons";
import "../css/Citations.css";

function removeForwardSlash(string) {
  const regex = new RegExp('/'.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
  return string.replace(regex, '');
}

const Citations = () => {
  const [citationText, setCitationText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const getCitationText = async (text) => {
    fetch("http://127.0.0.1:5000/citationString/" + removeForwardSlash(text))
      .then(async (response) => await response.text())
      .then((data) => setCitationText(data))
      .catch((error) => {
        console.error("Error:", error);
        setCitationText("Invalid Bill ID");
      });
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
      setCitationText("No text entered");
      return;
    }
    try {
      const response = await fetch("http://127.0.0.1:5000/billText/" + searchQuery);
      if (!response.ok) {
        setCitationText("Invalid Bill!");
        return; 
      }
      const data = await response.text();
      getCitationText(data);
    } catch (error) {
      setCitationText("Invalid Bill!");
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
                  onKeyPress={handleKeyPress}/>
              </div>
            <div className="underline"></div>
          </div>       
        </div>
        {/* Citation */}
        <div className="line">
          <p>{citationText}</p>
        </div>
      </div>
    </FluentProvider>
  );
};

Office.onReady((info) => {
  if (info.host === Office.HostType.Word) {
    window.Word = Word;
    ReactDOM.render(<Citations />, document.getElementById("citations-root"));
  }
});
