import * as React from "react";
import ReactDOM from "react-dom";
import { useState } from "react";
import { makeStyles } from "@fluentui/react-components";
import { Ribbon24Regular, LockOpen24Regular, DesignIdeas24Regular } from "@fluentui/react-icons";
import { EditArrowBack24Regular, DocumentOnePageMultiple24Regular } from '@fluentui/react-icons';
import { Input } from "@fluentui/react-components";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { createRoot } from "react-dom/client";


const useStyles = makeStyles({
  root: {
    minHeight: "100vh",
  },
});

const globalStyles = {
  color: '#707070',
  fontSize: 14,
  fontFamily: 'Segoe UI, sans-serif',
  fontWeight: 400,
  lineHeight: 20,
  wordWrap: 'break-word',
};


const Summarize = () => {
  const styles = useStyles();

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
      <div style={{globalStyles, width: '100%', height: '100%', background: 'white', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 14, display: 'inline-flex'}}>
        {/* Propylon Logo */}
        <div className="image">
          <img src="../../assets/propylonFull.png" alt="Propylon Logo" style={{ maxWidth: '100%', width: 128, height: 'auto' }}/>
        </div>
        {/* Search Bar */}
        <div style={{ width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 14, display: 'inline-flex' }}>
          <div style={{ alignSelf: 'stretch', height: 32, borderRadius: 4, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex' }}>
            <div style={{ alignSelf: 'stretch', paddingLeft: 10, paddingRight: 10, background: 'rgba(255, 255, 255, 0)', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex' }}>
              <div style={{ flex: '1 1 0', height: 32, justifyContent: 'flex-start', alignItems: 'center', display: 'flex' }}>
                <Input appearance="underline" style={{flex: '1 1 0', height: 32, paddingTop: 5, paddingBottom: 7, paddingLeft: 2, paddingRight: 2, justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex', color: '#707070', fontSize: 14, fontFamily: 'Segoe UI', fontWeight: '400', wordWrap: 'break-word' }} placeholder="Enter Bill ID" />
              </div>
            </div>
            <div style={{ width: 321, height: 1, background: '#575757' }} />
          </div>
        </div>
        {/* Summary */}
        <div style={{alignSelf: 'stretch', justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex'}}>
            <div style={{paddingLeft: 7, paddingRight: 7, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 14, display: 'inline-flex'}}>
            <button onClick={handleSummarize} className="summarizeButton" style={{ alignSelf: 'stretch', color: '#212529', backgroundColor: '#f8f9fa', border: '1px solid #dee2e6', borderRadius: '0.2rem', fontSize: '14px', fontFamily: 'Segoe UI', fontWeight: '600', padding: '0.375rem 0.75rem', cursor: 'pointer' }}>
              Summarize Text
            </button>
            </div>
            <div style={{paddingLeft: 14, paddingRight: 14, justifyContent: 'flex-start', alignItems: 'flex-start', gap: 11, display: 'flex'}}>
                <button  style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
                  <EditArrowBack24Regular style={{width: 16, height: 16, position: 'relative'}}> </EditArrowBack24Regular>
                </button>
                <button  style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
                  <DocumentOnePageMultiple24Regular style={{width: 16, height: 16, position: 'relative'}}> </DocumentOnePageMultiple24Regular>
                </button>
            </div>
        </div>
        <div style={{height: 120, paddingLeft: 7, paddingRight: 7, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 14, display: 'flex'}}>
          <div lassName="line" style={{alignSelf: 'stretch', color: 'black', fontSize: 14, fontFamily: 'Segoe UI', fontWeight: '400', wordWrap: 'break-word'}}>
            <p>{summarizedText}</p>
          </div>
        </div>
      </div>
    </FluentProvider>
  );
};

const summarizeTitle = "Propylon Legislation summarize";
// const summarizeRootElement = document.getElementById("summarize-root");
// const summarizeRoot = createRoot(summarizeRootElement);

Office.onReady((info) => {
  if (info.host === Office.HostType.Word) {
    window.Word = Word;
    ReactDOM.render(<Summarize  title={summarizeTitle} />, document.getElementById("summarize-root"));
  }
});
