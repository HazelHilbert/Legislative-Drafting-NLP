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
  

const handleClick = async () => {
    if (!searchText) {
        setSearchOutput("No text entered");
        return;
    }
    try {
        setLoading(true);
        // Legacy Response Fetches
        // const response = await fetch("http://127.0.0.1:5000/billText/" + searchText);
        //     const response = await fetch(`http://127.0.0.1:5000/search?query=${searchText}&state=${selectedState}&doctype=${selectedFileTypes.join(', ')}&effectiveDate=${selectedDate.toDateString()}`);
        const response = await axios.get('http://127.0.0.1:5000/search', {
            params: {
                query: searchText,
                state: "TEXAS", 
                doctype: selectedFileTypes.join(', '),
                effectiveDate: selectedDate ? selectedDate.toDateString() : null
            }
        });

        if (response.status === 200) {
            setSearchOutput(response.data);
        } else {
            setSearchOutput("Invalid Bill!");
        }
    } catch (error) {
        setSearchOutput("Error fetching data from the server");
    } finally {
        setLoading(false);
    }
};


  const loadingEasterEgg = () => {
    if (Math.floor(Math.random() * 100 + 1) == 1) {
      setImageID("../../assets/loading.gif");
    } else {
      setImageID("../../assets/LoadingTwoColour.gif");
    }
  };

  // Handle search
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleClick();
    }
  };
  // Change Search Result Input
  const handleChange = (event) => {
    setSearchText(event.target.value);
  };
  
  // Debugging
  const debug = () => {
    return `Output: ${selectedFileTypes}`;
  };
  
  return (
    <div className={styles.root}>
      <img src="../../assets/propylonFull.png" width={"50%"} style={{ marginTop: "10px" }} />
      {/* Top Navigation */}
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
                  onKeyPress={handleKeyDown}
                  placeholder="Search"
                />
              </div>
            </div>
            <div style={{ width: "auto", height: 1, background: "#575757" }} />
          </div>
        </div>
      </div>

      {selectedTab === "tab1"}
      {selectedTab === "tab2" && <ResultsPage />}
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
      {selectedTab === "tab4" && <ResultsPage searchResults={}/>}
      {selectedTab === "tab5" && (
        // <AddPage/>
        <div>
          <h1 style={{ textAlign: "center" }}>Settings</h1>
          <InstructionPage title={instructionPages.tab1.title} />
        </div>
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
    </div>
  );
};



export default SearchPage;
