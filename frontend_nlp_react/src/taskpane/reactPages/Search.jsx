import React, { useState } from "react";
import ReactDOM from "react-dom";
import "../css/Search.css";

const Search = () => {
  const handleClick = () => {};

  return (
    <div>
      <div>
        <img src="../../assets/propylonFull.png" alt="Propylon Logo" />
      </div>
      <div className="search-container">
        <input type="text" placeholder="Search..." />
        <button className="search-icon-container" onClick={handleClick}>
          <img src="../../assets/searchIcon.png" alt="Search" />
        </button>
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
