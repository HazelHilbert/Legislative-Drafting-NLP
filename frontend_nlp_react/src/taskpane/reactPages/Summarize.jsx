import React from "react";
import ReactDOM from "react-dom";
import "../css/Summarize.css";

const Summarize = () => {
  return (
    <div className="centre-text">
      <div>
        <img src="../../assets/propylonFull.png" />
      </div>
      <button className="button">Summarize Text</button>
    </div>
  );
};

ReactDOM.render(<Summarize />, document.getElementById("summarize-root"));
