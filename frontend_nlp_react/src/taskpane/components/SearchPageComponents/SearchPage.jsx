import { Input, Tab, TabList, makeStyles, tokens } from "@fluentui/react-components";
import React, { useState } from "react";
import InstructionPage from "./InstructionPage";
import ResultsPage from "./ResultsPage";
import FiltersPage from "./FiltersPage";
import {useStyles, tabs, instructionPages, usStates, legislativeDocumentTypes, MultiselectWithTags} from "./SearchPageConsts"
import axios from 'axios';



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

  const getStateAbbreviation = (stateFullName) => {
    // Define a mapping between full state names and their abbreviations
    const stateAbbreviations = {
      "Alabama": "AL",
      "Alaska": "AK",
      "Arizona": "AZ",
      // Add more states as needed
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
      setLoading(true);
      // Search Bill
      if (selectedTab === "tab1") {
        const response = await fetch("http://127.0.0.1:5000/billText/" + searchText);
        if (!response.ok) {
          setSearchOutput("Invalid Bill!");
          return;
        }
        const data = await response.text();
        setSearchOutput(data);
      }
      // Search Query
      else
      {        
        setSelectedTab("tab2");
        // Legacy Response Fetch
        //     const response = await fetch(`http://127.0.0.1:5000/search?query=${searchText}&state=${selectedState}&doctype=${selectedFileTypes.join(', ')}&effectiveDate=${selectedDate.toDateString()}`);
        const response = await axios.get('http://127.0.0.1:5000/search', {
          params: {
            query: searchText,
            state: "CA", //Other TEXAS
            doctype: selectedFileTypes.join(', '),
            effectiveDate: selectedDate ? selectedDate.toDateString() : null
          }
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
    <div className={styles.root}>
      {/* Top Navigation */}
      <img src="../../assets/propylonFull.png" width={"50%"} style={{ marginTop: "10px" }} />
      <div className={styles.topNavigation}>
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

        {/* Search Bar */}
        <div className={styles.searchBarContainer}>
          <div className={styles.searchBarBox}>
            <div className={styles.searchBarBoxSecondary}>
              <div style={{ flex: "1 1 0", height: 32, justifyContent: "flex-start", alignItems: "center", display: "flex"}}>
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
            <InstructionPage title={instructionPages.tab1.title} />
          )}
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
      {selectedTab === "tab2" && 
        <ResultsPage searchResults={searchResults} />}

      {/* Search Filters Tab */}
      {selectedTab === "tab3" && 
        <FiltersPage
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          selectedFileTypes={selectedFileTypes}
          setSelectedFileTypes={setSelectedFileTypes}
          selectedState={selectedState}
          setSelectedState={setSelectedState}
        />
      }

      {/* Add Tab */}
      {selectedTab === "tab4" && <ResultsPage searchResults={searchResults}/>}

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
