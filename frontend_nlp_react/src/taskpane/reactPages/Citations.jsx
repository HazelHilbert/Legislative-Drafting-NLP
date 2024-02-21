import React, { useState } from "react";
import ReactDOM from "react-dom";
import "../css/Citations.css";

const Citations = () => {
  const [citationText, setCitationText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const getCitationText = async (text) => {
    fetch("http://127.0.0.1:5000/citationString/" + text)
      .then(async (response) => await response.text())
      .then((data) => setCitationText(data))
      .catch((error) => console.error("Error:", error));
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
      .then((data) => getCitationText(data))
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
      <div className="line"></div>
      <div className="citation-text">
        <p>{citationText}</p>
      </div>
    </div>
  );
};

Office.onReady((info) => {
  if (info.host === Office.HostType.Word) {
    window.Word = Word;
    ReactDOM.render(<Citations />, document.getElementById("citations-root"));
  }
});
