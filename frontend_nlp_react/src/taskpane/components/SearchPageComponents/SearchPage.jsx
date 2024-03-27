import { Input, Tab, TabList, makeStyles, tokens } from "@fluentui/react-components";
import React, { useState } from "react";
import InstructionPage from "./InstructionPage";
import ResultsPage from "./ResultsPage";
import FiltersPage from "./FiltersPage";
import {
  useStyles,
  tabs,
  instructionPages,
  usStates,
  legislativeDocumentTypes,
  MultiselectWithTags,
} from "./SearchPageConsts";
import axios from "axios";

import "./SearchPage.css";

const SearchPage = () => {
  const styles = useStyles();

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

  // Handle Search Query
  const handleClick = async (selectedTab) => {
    if (!searchText) {
      setSearchOutput("No text entered");
      return;
    }
    try {
      // loadingEasterEgg();
      setLoading(true);
      const response = await fetch("http://127.0.0.1:5000/billText/" + searchText);
      if (!response.ok) {
        setSearchOutput("Invalid Bill!");
        return;
      }
      const data = await response.text();
      let userIsScrolling = false;
      const allWords = data.split(" ");
      let i = 0;
      const interval = setInterval(() => {
        setSearchOutput(prevText => prevText + allWords[i] + " ");
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
      }, 10); // Interval Duration
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
      setSearchOutput("Invalid Bill!");
    } finally {
      setLoading(false);
    }
  };

  // Handle search from Key press
  const handleKeyDown = (event, selectedTab) => {
    if (event.key === "Enter") {
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

  // Debugging
  const debug = () => {
    return `Output: ${selectedFileTypes}`;
  };

  return (
    <div
      className={styles.root}
      style={{
        alignSelf: "stretch",
        width: "100%",
        height: "100%",
        background: "white",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 28,
        display: "inline-flex",
      }}
    >
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
                  className="search"
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
                  onKeyPress={handleKeyDown}
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
          {/* {!loading && !searchOutput && <InstructionPage title={instructionPages.tab1.title} />} */}
          <div>
            {loading ? (
              <div style={{ marginTop: 100 }}>
                <img src={imageID} width={"100px"} />
              </div>
            ) : (
              <p>{searchOutput}</p>
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
      {selectedTab === "tab4" && <ResultsPage searchResults={searchResults} />}

      {/* Settings Tab */}
      {selectedTab === "tab5" && (
        // <AddPage/>
        <div>
          <h1 style={{ textAlign: "center" }}>Settings</h1>
          <InstructionPage title={instructionPages.tab1.title} />
        </div>
      )}
    </div>
  );
};

export default SearchPage;
