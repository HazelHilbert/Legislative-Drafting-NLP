import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Input } from "@fluentui/react-components";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { EditArrowBack24Regular, DocumentOnePageMultiple24Regular } from "@fluentui/react-icons";
import "../css/Citations.css";

function removeForwardSlash(string) {
  const regex = new RegExp("/".replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g");
  return string.replace(regex, "");
}

const Citations = () => {
  const [citationText, setCitationText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [imageID, setImageID] = useState("../../assets/LoadingTwoColour.gif");
  const [loading, setLoading] = useState(false);

  const loadingEasterEgg = () => {
    if (Math.floor(Math.random() * 100 + 1) == 1) {
      setImageID("../../assets/loading.gif");
    } else {
      setImageID("../../assets/LoadingTwoColour.gif");
    }
  };

  const getCitationText = async (text) => {
    try {
      // loadingEasterEgg();
      setLoading(true);

      const response = await fetch("http://127.0.0.1:5000/citationString/" + removeForwardSlash(text));
      if (!response.ok) {
        setCitationText("Invalid Bill!");
      }
      const data = await response.text();
      const allWords = data.split(" ");
      let i = 0;
      const interval = setInterval(() => {
        setCitationText(prevText => prevText + allWords[i] + " ");
        i++;
        if (i === allWords.length) {
          clearInterval(interval);
        }
      }, 100); // Interval Duration
    } catch (error) {
      setCitationText("Invalid Bill!");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setCitationText("");
      getBillText();
    }
  };

  const getBillText = async () => {
    if (!searchQuery) {
      setCitationText("No text entered");
      return;
    }
    try {
      // loadingEasterEgg();
      setLoading(true);
      const response = await fetch("http://127.0.0.1:5000/billText/" + searchQuery);
      if (!response.ok) {
        setCitationText("Invalid Bill!");
        return;
      }
      const data = await response.text();
      getCitationText(data);
    } catch (error) {
      setCitationText("Invalid Bill!");
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
        {/* Citation */}
        <div className="line">
          {loading ? (
            <div style={{ marginTop: 100 }}>
              <img src={imageID} width={"100px"} />
            </div>
          ) : (
            <p>{citationText}</p>
          )}
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
