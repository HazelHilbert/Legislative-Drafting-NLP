import * as React from "react";
import { useState } from "react";
import { makeStyles } from "@fluentui/react-components";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { createRoot } from "react-dom/client";
import { Tab, TabList, Input } from "@fluentui/react-components";

const useStyles = makeStyles({
  root: {
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    padding: "50px 20px",  // Using direct property instead of shorthands
    rowGap: "20px",
  },
  tabListContainer: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'flex-start',
    display: 'inline-flex',
    flexWrap: 'wrap', // Allow flex items to wrap to the next line
    gap: '8px', // Adjust the gap between tabs
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

const Search = () => {
  const styles = useStyles();

  const [searchText, setSearchText] = useState("");
  const [searchOutput, setSearchOutput] = useState("");
  const [selectedTab, setSelectedTab] = useState("tab1"); // Add state for the selected tab

  const handleClick = () => {
    fetch("http://127.0.0.1:5000/billText/" + searchText)
      .then(async (response) => await response.text())
      .then((data) => setSearchOutput(data))
      .catch((error) => console.error("Error:", error));
  };

  const handleChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleClick();
    }
  };

  const tabs = [
    { label: "Search", value: "tab1" },
    { label: "Result", value: "tab2" },
    { label: "Filter", value: "tab3" },
    { label: "Add", value: "tab4" },
    { label: "Settings", value: "tab5" }
  ];

  return (  
    <div className={styles.root} style={{width: '100%', height: '100%', background: 'white', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 28, display: 'inline-flex'}}>
      {/* Top Navigation */}
      <div style={{alignSelf: 'stretch', height: 90, paddingLeft: 14, paddingRight: 14, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 14, display: 'flex'}}>
        {/* Top Navigation */}
        <TabList className={styles.tabListContainer} selectedValue={selectedTab} onTabSelect={(event, data) => setSelectedTab(data.value)}>
          {tabs.map((tab) => (
            <Tab style={{width: 64, height: 44, position: 'relative'}} key={tab.value} value={tab.value}> 
              {tab.label} 
            </Tab>
          ))}
        </TabList>
        {/* Search Bar */}
        <div style={{ width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 14, display: 'inline-flex' }}>
          <div style={{ alignSelf: 'stretch', height: 32, borderRadius: 4, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex' }}>
            <div style={{ alignSelf: 'stretch', paddingLeft: 10, paddingRight: 10, background: 'rgba(255, 255, 255, 0)', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex' }}>
              <div style={{ flex: '1 1 0', height: 32, justifyContent: 'flex-start', alignItems: 'center', display: 'flex' }}>
                <Input appearance="underline" style={{flex: '1 1 0', height: 32, paddingTop: 5, paddingBottom: 7, paddingLeft: 2, paddingRight: 2, justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex', color: '#707070', fontSize: 14, fontFamily: 'Segoe UI', fontWeight: '400', wordWrap: 'break-word' }} placeholder="Search" />
              </div>
            </div>
            <div style={{ width: 321, height: 1, background: '#575757' }} />
          </div>
        </div>
      </div>
            
      {/* Default Instruction Page */}
      <div style={{alignSelf: 'stretch', height: 383, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 26, display: 'flex'}}>
        <div style={{alignSelf: 'stretch', height: 325, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 30, display: 'flex'}}>
          <div style={{alignSelf: 'stretch', height: 141, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 21, display: 'flex'}}>
              {/* <img  src="https://via.placeholder.com/64x64" /> */}
              <img src="../../assets/propylonFull.png" alt="Propylon Logo" style={{ maxWidth: '100%', width: 64, height: 'auto' }}/>
              <div style={{color: '#333333', fontSize: 42, fontFamily: 'Segoe UI', fontWeight: '300', wordWrap: 'break-word'}}>Instructions</div>
          </div>         
          <div style={{alignSelf: 'stretch', height: 154, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 33, display: 'flex'}}>
            <div style={{alignSelf: 'stretch', textAlign: 'center', color: '#333333', fontSize: 21, fontFamily: 'Segoe UI', fontWeight: '300', wordWrap: 'break-word'}}>
              Lorem ipsum dolor sit amet consectetur.
            </div>
            <div style={{alignSelf: 'stretch', height: 93, paddingLeft: 48, paddingRight: 48, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 18, display: 'flex'}}>
              <div style={{justifyContent: 'flex-start', alignItems: 'flex-start', gap: 9, display: 'inline-flex'}}>
                <div style={{textAlign: 'center', color: 'black', fontSize: 18, fontFamily: 'Fabric External MDL2 Assets', fontWeight: '400', wordWrap: 'break-word'}}>
                  X
                </div>         
                <div style={{color: '#231F20', fontSize: 14, fontFamily: 'Segoe UI', fontWeight: '300', wordWrap: 'break-word'}}>
                  Lorem ipsum dolor sit amet
                </div>
              </div>
              <div style={{justifyContent: 'flex-start', alignItems: 'flex-start', gap: 9, display: 'inline-flex'}}>
                <div style={{textAlign: 'center', color: 'black', fontSize: 18, fontFamily: 'Fabric External MDL2 Assets', fontWeight: '400', wordWrap: 'break-word'}}>
                  X
                </div>    
                <div style={{color: '#231F20', fontSize: 14, fontFamily: 'Segoe UI', fontWeight: '300', wordWrap: 'break-word'}}>
                  Lorem ipsum dolor sit amet
                </div> 
              </div>  
              <div style={{justifyContent: 'flex-start', alignItems: 'flex-start', gap: 9, display: 'inline-flex'}}>
                <div style={{textAlign: 'center', color: 'black', fontSize: 18, fontFamily: 'Fabric External MDL2 Assets', fontWeight: '400', wordWrap: 'break-word'}}>
                  X
                </div>
                <div style={{color: '#231F20', fontSize: 14, fontFamily: 'Segoe UI', fontWeight: '300', wordWrap: 'break-word'}}>
                  Lorem ipsum dolor sit amet
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{width: 120, height: 32, position: 'relative'}}>
          <div style={{width: 120, height: 32, left: 0, top: 0, position: 'absolute', background: '#0078D4', boxShadow: '0px 2px 4px -0.75px rgba(0, 0, 0, 0.10)'}} />
          <div style={{left: 11, top: 5, position: 'absolute', textAlign: 'center', color: 'white', fontSize: 14, fontFamily: 'Segoe UI', fontWeight: '600', wordWrap: 'break-word'}}>
            Documentation
          </div>
        </div>
      </div>
    </div>
  );
};

const searchTitle = "Propylon Legislation Search";
const searchRootElement = document.getElementById("search-root");
const searchRoot = createRoot(searchRootElement);

Office.onReady(() => {
  searchRoot.render(
    <FluentProvider theme={webLightTheme}>
      <Search title={searchTitle} />
    </FluentProvider>
  );
});
