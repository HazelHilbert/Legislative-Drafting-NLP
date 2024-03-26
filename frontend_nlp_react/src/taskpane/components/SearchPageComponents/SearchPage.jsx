import { Input, Tab, TabList, makeStyles, tokens } from "@fluentui/react-components";
import React, { useState } from "react";
import InstructionPage from "./InstructionPage";
import ResultsPage from "./ResultsPage";
import FiltersPage from "./FiltersPage";

const useStyles = makeStyles({
  root: {
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    rowGap: "0px",
  },
  tabListContainer: {
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "flex-start",
    display: "inline-flex",
    flexWrap: "wrap", // Allow flex items to wrap to the next line
  },
  tagsList: {
    listStyleType: "none",
    marginBottom: tokens.spacingVerticalXXS,
    marginTop: 0,
    paddingLeft: 0,
    display: "flex",
    gridGap: 0,
  },
});

const SearchPage = () => {
  const styles = useStyles();

  const [searchText, setSearchText] = useState("");
  const [searchOutput, setSearchOutput] = useState("");
  const [selectedTab, setSelectedTab] = useState("tab1"); // Add state for the selected tab
  const [loading, setLoading] = useState(false);
  const [imageID, setImageID] = useState("../../assets/LoadingTwoColour.gif");

  const handleClick = async () => {
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
      else
      {        
        setSelectedTab("tab2");

        const stateAbbreviation = getStateAbbreviation(selectedState);

        // Legacy Response Fetch
        //     const response = await fetch(`http://127.0.0.1:5000/search?query=${searchText}&state=${selectedState}&doctype=${selectedFileTypes.join(', ')}&effectiveDate=${selectedDate.toDateString()}`);
        const response = await axios.get('http://127.0.0.1:5000/search', {
          params: {
            query: searchText,
            state: stateAbbreviation, //Other TEXAS
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
      setSearchOutput("Invalid Bill!");
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

  const handleChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setSearchOutput("");
      handleClick();
    }
  };

  const tabs = [
    { label: "Search", value: "tab1" },
    { label: "Result", value: "tab2" },
    { label: "Filter", value: "tab3" },
    { label: "Add", value: "tab4" },
    { label: "Settings", value: "tab5" },
  ];

  const instructionPages = {
    tab1: { title: "Instructions" },
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
      {selectedTab === "tab3" && <FiltersPage />}
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
