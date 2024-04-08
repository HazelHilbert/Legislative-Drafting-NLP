import React from "react";
import ReactDOM from "react-dom";
import { useState, useEffect } from "react";
import { Input } from "@fluentui/react-components";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { EditArrowBack24Regular, DocumentOnePageMultiple24Regular } from "@fluentui/react-icons";
import "../css/Summarize.css";

function removeForwardSlash(string) {
  const regex = new RegExp("/".replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g");
  return string.replace(regex, "");
}

const Summarize = ({ summarizedText: propSummarizedText }) => {
  const [summarizedText, setSummarizedText] = useState(propSummarizedText || "");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageID, setImageID] = useState("../../assets/LoadingTwoColour.gif");

  useEffect(() => {
    checkHighlightedText(); // Check for highlighted text when component mounts
  }, []);

  const checkHighlightedText = async () => {
    try {
      await Word.run(async (context) => {
        const selectedRange = context.document.getSelection();
        context.load(selectedRange, 'text');
        await context.sync();
        if (selectedRange.text.trim()) {
          getSummarizeText(selectedRange.text);
        } else {
          setSummarizedText("");
        }
      });
    } catch (error) {
      setSummarizedText("");
    }
  };

  const getText = async () => {
    try {
      // loadingEasterEgg();
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const getSummarizeText = async (text) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/summariseText/" + removeForwardSlash(text));
      if (!response.ok) {
        setSummarizedText("Invalid Summarize!");
      }
      const data = await response.text();
      let userIsScrolling = false;
      const allWords = data.split(" ");
      let i = 0;
      const interval = setInterval(() => {
        setSummarizedText(prevText => prevText + allWords[i] + " ");
        i++;
        if (i === allWords.length) {
          clearInterval(interval);
        }
        window.addEventListener("wheel", () => {
          userIsScrolling = true;
        });   
        window.addEventListener("touchstart", () => {
          userIsScrolling = true;
        });
        const scrollBar = document.documentElement;
        scrollBar.addEventListener("mousedown", (event) => {
          if (event.target === scrollBar) {
            event.preventDefault();
            userIsScrolling = true;
          }
        });
        if(!userIsScrolling)
          window.scrollTo(0, document.body.scrollHeight);      
      }, 100); // Interval Duration    
    } catch (error) {
      setSummarizedText("Invalid Summarize!");
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
      setSummarizedText("");
      getBillText();
    }
  };

  const loadingEasterEgg = () => {
    if (Math.floor(Math.random() * 100 + 1) == 1) {
      setImageID("../../assets/loading.gif");
    } else {
      setImageID("../../assets/LoadingTwoColour.gif");
    }
  };

  const getBillText = async () => {
    if (!searchQuery) {
      setSummarizedText("No text entered");
      return;
    }
    try {
      // loadingEasterEgg();
      setLoading(true);
      const response = await fetch("http://127.0.0.1:5000/billText/" + searchQuery);
      if (!response.ok) {
        setSummarizedText("Invalid Bill!");
        return;
      }
      const data = await response.text();
      getSummarizeText(data);
    } catch (error) {
      setSummarizedText("Invalid Bill!"); 
    } finally {
      setLoading(false);
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
            <div style={{ marginTop: 100 }}>
              <img src={imageID} width={"100px"} />
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
