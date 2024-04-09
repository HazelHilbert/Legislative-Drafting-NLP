import { Input, Tab, TabList, makeStyles, tokens } from "@fluentui/react-components";
import React, { useState, useEffect } from "react";
import InstructionPage from "./InstructionPage";
import ResultsPage from "./ResultsPage";
import FiltersPage from "./FiltersPage";
import "./SearchPage.css";
import {
  useStyles,
  tabs,
  instructionPages,
  usStates,
  legislativeDocumentTypes,
  MultiselectWithTags,
} from "./SearchPageConsts";
import axios from "axios";

function removeForwardSlash(string) {
  const regex = new RegExp("/".replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g");
  return string.replace(regex, "");
}

let userIsScrolling = false;
let scrollButton = null;
let textPastingFinished = false;
let isTabOne = true;

const SearchPage = () => {
  // Page styling:
  const styles = useStyles();

  // Search Page Menu Items
  const [searchText, setSearchText] = useState("");
  const [searchOutput, setSearchOutput] = useState("");
  const [selectedTab, setSelectedTab] = useState("tab1"); // Add state for the selected tab
  const [loading, setLoading] = useState(false);
  const [imageID, setImageID] = useState("../../assets/LoadingTwoColour.gif");

  // Filter Page Filters
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedFileTypes, setSelectedFileTypes] = useState([]);
  const [selectedState, setSelectedState] = useState(null);
  const [chips, setChips] = useState([]);

  // Search Results
  const [searchResults, setSearchResults] = useState([]);

  // Gets Abbreviations for States to For Search Query
  const getStateAbbreviation = (stateFullName) => {
    // Define a mapping between full state names and their abbreviations
    const stateAbbreviations = {
      Alabama: "AL",
      Alaska: "AK",
      Arizona: "AZ",
      Arkansas: "AR",
      California: "CA",
      Colorado: "CO",
      Connecticut: "CT",
      Delaware: "DE",
      Florida: "FL",
      Georgia: "GA",
      Hawaii: "HI",
      Idaho: "ID",
      Illinois: "IL",
      Indiana: "IN",
      Iowa: "IA",
      Kansas: "KS",
      Kentucky: "KY",
      Louisiana: "LA",
      Maine: "ME",
      Maryland: "MD",
      Massachusetts: "MA",
      Michigan: "MI",
      Minnesota: "MN",
      Mississippi: "MS",
      Missouri: "MO",
      Montana: "MT",
      Nebraska: "NE",
      Nevada: "NV",
      "New Hampshire": "NH",
      "New Jersey": "NJ",
      "New Mexico": "NM",
      "New York": "NY",
      "North Carolina": "NC",
      "North Dakota": "ND",
      Ohio: "OH",
      Oklahoma: "OK",
      Oregon: "OR",
      Pennsylvania: "PA",
      "Rhode Island": "RI",
      "South Carolina": "SC",
      "South Dakota": "SD",
      Tennessee: "TN",
      Texas: "TX",
      Utah: "UT",
      Vermont: "VT",
      Virginia: "VA",
      Washington: "WA",
      "West Virginia": "WV",
      Wisconsin: "WI",
      Wyoming: "WY",
    };

    // Return the abbreviation corresponding to the full state name
    return stateAbbreviations[stateFullName] || stateFullName; // Return full name if no abbreviation is found
  };

  const enableScrollButton = async () => {
    if (!scrollButton) {
      scrollButton = document.createElement("button");
      scrollButton.textContent = "Resume Scrolling";
      scrollButton.className = "button scroll-button";
      scrollButton.onclick = () => {
        userIsScrolling = false;
        scrollButton.style.display = "none";
        scrollButton.disabled = true;
      };
      document.body.appendChild(scrollButton);
    } else {
      scrollButton.style.display = "block";
      scrollButton.disabled = false;
    }
  };

  let interval;

  async function pasteTextGradually(text) {
    // If pasting is already in progress, stop it
    if (isPasting) {
        clearTimeout(currentTimeout);
        isPasting = false;
    }

    // Split the text into an array of words
    const words = text.split(/\s+/);

    // Initialize the index to 0
    let i = 0;

    // Define the function to paste the next word
    async function pasteNextWord() {
        // If all words have been pasted, exit
        if (i >= words.length) {
            isPasting = false;
            return;
        }

        // Add the current word to the screen
        setSearchOutput(words.slice(0, i + 1).join(' '));

        // Increment the index for the next word
        i++;

        // Call pasteNextWord recursively with a delay
        currentTimeout = setTimeout(pasteNextWord, 500); // Delay in milliseconds
    }

    // Start pasting the words
    isPasting = true;
    await pasteNextWord();
}


  // Handle Search Query
  const handleClick = async (selectedTab) => {
    if (!searchText) {
      setSearchOutput("No text entered");
      return;
    }
    try {
      setLoading(true);
      // Search Bill
      if (selectedTab === "tab1") {
        if (interval) {
          clearInterval(interval); // Clear any ongoing interval
          setSearchOutput(""); // Clear the output
        }

        const response = await fetch("http://127.0.0.1:5000/billText/" + searchText);
        if (!response.ok) {
          setSearchOutput("Invalid Bill!");
          return;
        }
        const data = await response.text();
        userIsScrolling = false;
        const allWords = data.split(" ");
        let i = 0;
        interval = setInterval(() => {
          setSearchOutput((prevText) => prevText + allWords[i] + " ");
          i++;
          if (i === allWords.length) {
            clearInterval(interval);
            textPastingFinished = true;
            const button = document.querySelector(".button");
            setTimeout(() => {
              button.style.opacity = "1";
            }, 400);
            if (scrollButton != null) {
              scrollButton.style.display = "none";
              scrollButton.disabled = true;
            }
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
          if (!userIsScrolling) window.scrollTo(0, document.body.scrollHeight);
          else if (i !== allWords.length && isTabOne == true) enableScrollButton();
        }, 1); // Interval Duration
      }
      // Search Query
      else {
        setSelectedTab("tab2");

        const stateAbbreviation = getStateAbbreviation(selectedState);

        // Legacy Response Fetch
        //     const response = await fetch(`http://127.0.0.1:5000/search?query=${searchText}&state=${selectedState}&doctype=${selectedFileTypes.join(', ')}&effectiveDate=${selectedDate.toDateString()}`);
        const response = await axios.get("http://127.0.0.1:5000/search", {
          params: {
            query: searchText,
            state: stateAbbreviation, //Other TEXAS
            doctype: selectedFileTypes.join(", "),
            effectiveDate: selectedDate ? selectedDate.toDateString() : null,
          },
        });

        if (response.status === 200) {
          // setSearchResults(response.data.searchresult); // Update state with search results#// Set the content of the pre element with JSON string
          // Convert JSON data to Array Object to Parse into search Results,
          const searchResultArray = Object.values(response.data.searchresult);
          setSearchResults(searchResultArray);
        } else {
          setSearchResults([]); // Clear search results if invalid response
        }
      }
    } catch (error) {
      setSearchResults([]); // Clear search results on error
    } finally {
      setLoading(false);
    }
  };

  // Handle search from Key press
  const handleKeyDown = (event, selectedTab) => {
    if (event.key === "Enter") {
      setSearchOutput("");
      handleClick(selectedTab);
    }
  };
  // Change Search Result Input
  const handleChange = (event) => {
    setSearchText(event.target.value);
  };

  const loadingEasterEgg = () => {
    if (Math.floor(Math.random() * 100 + 1) == 1) {
      setImageID("../../assets/loading.gif");
    } else {
      setImageID("../../assets/LoadingTwoColour.gif");
    }
  };

  const handleCreateDocument = () => {
    axios
      .get("http://127.0.0.1:5000/create_word_document/" + searchText + "/" + removeForwardSlash(searchOutput))
      .then((response) => {
        console.log("Word document created and opened");
      })
      .catch((error) => {
        console.error("Error creating or opening Word document:", error);
      });
  };

  // Debugging
  const debug = () => {
    return `Output: ${selectedFileTypes}`;
  };

  useEffect(() => {
    // Perform any side effects here, based on the selectedTab value
    // For example, fetching data when the tab changes
    console.log(selectedTab);
    if (scrollButton != null) {
      if (selectedTab !== "tab1") {
        scrollButton.style.display = "none";
        scrollButton.disabled = true;
        isTabOne = false;
      } else {
        enableScrollButton();
        isTabOne = true;
      }
    }
  }, [selectedTab]);

  return (
    <div className={styles.root}>
      {/* Top Navigation */}
      <img className="image" src="../../assets/propylonFull.png" width={"50%"} style={{ marginTop: "10px" }} />
      <div className={styles.topNavigation}>
        <div className="tablist">
          <TabList
            style={{ width: "auto" }}
            className={styles.tabListContainer}
            selectedValue={selectedTab}
            onTabSelect={(event, data) => setSelectedTab(data.value)}
          >
            {tabs.map((tab) => (
              <Tab key={tab.value} value={tab.value}>
                {tab.label}
              </Tab>
            ))}
          </TabList>
        </div>
        {/* Search Bar */}
        <div className={styles.searchBarContainer}>
          <div className={styles.searchBarBox}>
            <div className={styles.searchBarBoxSecondary}>
              <div
                className="search"
                style={{
                  flex: "1 1 0",
                  height: 32,
                  justifyContent: "flex-start",
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <Input
                  appearance="underline"
                  style={{
                    flex: "1 1 0",
                    height: 32,
                    paddingTop: 5,
                    paddingBottom: 7,
                    paddingLeft: 2,
                    paddingRight: 2,
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    display: "flex",
                    color: "#707070",
                    fontSize: 14,
                    fontFamily: "Segoe UI",
                    fontWeight: "400",
                    wordWrap: "break-word",
                  }}
                  value={searchText}
                  onChange={handleChange}
                  onKeyPress={(event) => handleKeyDown(event, selectedTab)}
                  placeholder="Search"
                />
              </div>
            </div>
            <div style={{ width: "auto", height: 1, background: "#575757" }} />
          </div>
        </div>
      </div>

      {/* Search Tab */}
      {selectedTab === "tab1" && (
        <>
          {!loading && !searchOutput && (
            // <InstructionPage title={instructionPages.tab1.title} />
            <></>
          )}
          <div>
            {loading ? (
              <div style={{ marginTop: 100 }}>
                <img src={imageID} width={"100px"} />
              </div>
            ) : (
              <>
                <p style={{ marginBottom: 5 }}>{searchOutput}</p>
                {searchOutput && (
                  <div>
                    <button
                      className="button doc-create-button"
                      onClick={handleCreateDocument}
                      disabled={!textPastingFinished}
                    >
                      Create Document
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </>
      )}

      {/* Results Tab */}
      {selectedTab === "tab2" && (
        <>
          {!loading && !searchOutput && <></>}
          <div>
            {loading ? (
              <div style={{ marginTop: 100 }}>
                <img src={imageID} width={"100px"} />
              </div>
            ) : (
              <ResultsPage searchResults={searchResults} />
            )}
          </div>
        </>
      )}

      {/* Search Filters Tab */}
      {selectedTab === "tab3" && (
        <FiltersPage
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          selectedFileTypes={selectedFileTypes}
          setSelectedFileTypes={setSelectedFileTypes}
          selectedState={selectedState}
          setSelectedState={setSelectedState}
        />
      )}

      {/* Add Tab */}
      {/* {selectedTab === "tab4" && <ResultsPage searchResults={searchResults} />} */}

      {/* Settings Tab */}
      {/* {selectedTab === "tab5" && (
        // <AddPage/>
        <div className="search">
          <h1 style={{ textAlign: "center" }}>Settings</h1>
          <InstructionPage title={instructionPages.tab1.title} />
        </div>
      )} */}
    </div>
  );
};

export default SearchPage;
