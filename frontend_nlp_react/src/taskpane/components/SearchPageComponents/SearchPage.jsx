import { Input, Tab, TabList, makeStyles, tokens } from "@fluentui/react-components";
import React, { useState } from "react";
import InstructionPage from "./InstructionPage";
import ResultsPage from "./ResultsPage";
import FiltersPage from "./FiltersPage";
import {useStyles, tabs, instructionPages, usStates, legislativeDocumentTypes, MultiselectWithTags} from "./SearchPageConsts"

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

  // Get Search Results
  const handleClick = async () => {
    if (!searchText) {
      setSearchOutput("No text entered");
      return;
    }
    try {
      // loadingEasterEgg();
      setLoading(true);
      
      const response = await fetch(`http://127.0.0.1:5000/search?query=${searchText}&state=${selectedState}&documentType=${selectedFileTypes.join(', ')}&effectiveDate=${selectedDate.toDateString()}`);

      // const response = await fetch("http://127.0.0.1:5000/billText/" + searchText);
      if (!response.ok) {
        setSearchOutput("Invalid Bill!");
        return;
      }
      const data = await response.text();
      setSearchOutput(data);
    } catch (error) {
      setSearchOutput("Invalid Bill!");
    } finally {
      setLoading(false);
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
      <img src="../../assets/propylonFull.png" width={"50%"} style={{ marginTop: "10px" }} />
      <div
        style={{
          alignSelf: "stretch",
          height: 90,
          paddingLeft: 14,
          paddingRight: 14,
          paddingTop: 14,
          marginTop: "10px",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 0,
          display: "flex",
        }}
      >
        {/* Top Navigation */}
        <TabList
          style={{ width: "auto" }}
          className={styles.tabListContainer}
          selectedValue={selectedTab}
          onTabSelect={(event, data) => setSelectedTab(data.value)}
        >
          {tabs.map((tab) => (
            <Tab style={{ width: "auto", height: 44, position: "relative" }} key={tab.value} value={tab.value}>
              {tab.label}
            </Tab>
          ))}
        </TabList>

        {/* Search Bar */}
        <div
          style={{
            width: "100%",
            height: "100%",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 14,
            display: "inline-flex",
          }}
        >
          <div
            style={{
              alignSelf: "stretch",
              height: 32,
              borderRadius: 4,
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              display: "flex",
            }}
          >
            <div
              style={{
                alignSelf: "stretch",
                paddingLeft: 10,
                paddingRight: 10,
                background: "rgba(255, 255, 255, 0)",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: 10,
                display: "inline-flex",
              }}
            >
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
          chips={chips}
          updateChips={updateChips}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          selectedFileTypes={selectedFileTypes}
          setSelectedFileTypes={setSelectedFileTypes}
          selectedState={selectedState}
          setSelectedState={setSelectedState}
          onCheckboxChange={onCheckboxChange}
          onDateSelect={onDateSelect}
        />
      }
      {selectedTab === "tab4" && <ResultsPage />}
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
