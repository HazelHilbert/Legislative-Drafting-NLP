import React, { useState } from "react";
import ReactDOM from "react-dom";
import "../css/Search.css";

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const [searchOutput, setSearchOutput] = useState("");

  const handleClick = () => {
    fetch("http://127.0.0.1:5000/billText/" + searchText)
      .then(async (response) => await response.text())
      .then((data) => setSearchOutput(data))
      .catch((error) => console.error("Error:", error));
  };

  const handleChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleClick();
    }
  };

  return (
    <div>
      <div>
        <img src="../../assets/propylonFull.png" alt="Propylon Logo" />
      </div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <button className="search-icon-container" onClick={handleClick}>
          <img src="../../assets/searchIcon.png" alt="Search" />
        </button>
      </div>
      <div className="search-text">
        <p>{searchOutput}</p>
      </div>
    </div>
  );
};

Office.onReady((info) => {
  if (info.host === Office.HostType.Word) {
    window.Word = Word;
    ReactDOM.render(<Search />, document.getElementById("search-root"));
  }
});
