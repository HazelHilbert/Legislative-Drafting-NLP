import React, { useState } from "react";
import ReactDOM from "react-dom";
import "../css/summarize.css";

const Summarize = () => {
  const [summarizedText, setSummarizedText] = useState("");

  const getText = async () => {
    try {
      await Word.run(async (context) => {
        const documentBody = context.document.body;
        context.load(documentBody);
        await context.sync();
        setSummarizedText(documentBody.text);
      });
    } catch (error) {
      console.log("Error: " + error);
    }
  };

  const handleSummarize = async () => {
    await getText();
  };

  return (
    <div className="centre-text">
      <script type="text/javascript" src="https://appsforoffice.microsoft.com/lib/1/hosted/office.js"></script>

      <div>
        <img src="../../assets/propylonFull.png" alt="Propylon Logo" />
      </div>
      <button onClick={handleSummarize} className="button">
        Summarize Text
      </button>
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
