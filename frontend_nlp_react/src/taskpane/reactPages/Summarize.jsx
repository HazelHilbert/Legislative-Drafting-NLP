import React, { useState } from "react";
import ReactDOM from "react-dom";
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
    <div className="background">
      <div className="image">
        <img src="../../assets/propylonFull.png" alt="Propylon Logo" />
      </div>
      <div className="searchContainer">
        <input type="text" placeholder="Enter Bill ID" value={searchQuery} onChange={handleSearchInputChange} onKeyPress={handleKeyPress} className="searchBar"/>
        <img src="../../assets/searchIcon.png" alt="Search" className="searchButton" onClick={getBillText} tabIndex="0" />
      </div>
      <button onClick={handleSummarize} className="summarizeButton">Summarize Highlighted Text</button>
      <div className="line"></div>
      <div className="summarized-text">
        <p>{summarizedText}</p>
      </div>
    </div>
  );
};

Office.onReady((info) => {
  if (info.host === Office.HostType.Word) {
    window.Word = Word;
    ReactDOM.render(<Summarize />, document.getElementById("summarize-root"));
  }
});
