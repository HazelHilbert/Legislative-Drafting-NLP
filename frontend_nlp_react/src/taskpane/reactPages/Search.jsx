import * as React from "react";
import { useState } from "react";
import { makeStyles } from "@fluentui/react-components";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { createRoot } from "react-dom/client";
import { Tab, TabList, Input } from "@fluentui/react-components";
import { Button } from "@fluentui/react-components";

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

const InstructionPage = ({title}) => (
  <div style={{width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 26, display: 'inline-flex'}}>
        <div style={{alignSelf: 'stretch', height: 'auto', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 28, display: 'flex'}}>
            <div style={{alignSelf: 'stretch', height: 'auto', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 21, display: 'flex'}}>
                <img style={{width: 'auto', height: 32}} src="../../assets/propylonFull.png" />
                <div style={{color: '#333333', fontSize: 42, fontFamily: 'Segoe UI', fontWeight: '300', wordWrap: 'break-word'}}>
                  {title}
                </div>
            </div>
            <div style={{alignSelf: 'stretch', height: 'auto', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 33, display: 'flex'}}>
                <div style={{alignSelf: 'stretch', textAlign: 'center', color: '#333333', fontSize: 21, fontFamily: 'Segoe UI', fontWeight: '300', wordWrap: 'break-word'}}>
                  Propylon Legislation Search Tool. 
                </div>
                <div style={{alignSelf: 'stretch', height: 93, paddingLeft: 48, paddingRight: 48, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 18, display: 'flex'}}>
                    <div style={{justifyContent: 'flex-start', alignItems: 'flex-start', gap: 9, display: 'inline-flex'}}>
                        <div style={{textAlign: 'center', color: 'black', fontSize: 18, fontFamily: 'Fabric External MDL2 Assets', fontWeight: '400', wordWrap: 'break-word'}}></div>
                        <div style={{color: '#231F20', fontSize: 14, fontFamily: 'Segoe UI', fontWeight: '300', wordWrap: 'break-word'}}>
                          Bills
                        </div>
                    </div>
                    <div style={{justifyContent: 'flex-start', alignItems: 'flex-start', gap: 9, display: 'inline-flex'}}>
                        <div style={{textAlign: 'center', color: 'black', fontSize: 18, fontFamily: 'Fabric External MDL2 Assets', fontWeight: '400', wordWrap: 'break-word'}}></div>
                        <div style={{color: '#231F20', fontSize: 14, fontFamily: 'Segoe UI', fontWeight: '300', wordWrap: 'break-word'}}>
                          Legislations
                        </div>
                    </div>
                    <div style={{justifyContent: 'flex-start', alignItems: 'flex-start', gap: 9, display: 'inline-flex'}}>
                        <div style={{textAlign: 'center', color: 'black', fontSize: 18, fontFamily: 'Fabric External MDL2 Assets', fontWeight: '400', wordWrap: 'break-word'}}></div>
                        <div style={{color: '#231F20', fontSize: 14, fontFamily: 'Segoe UI', fontWeight: '300', wordWrap: 'break-word'}}>
                          Citations
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Button appearance="primary" >Documentation</Button>
      </div>
);

const ResultItem = ({title, state, date}) => (
  <div style={{ width: '100%', height: '100%', background: 'white', borderRadius: 4, justifyContent: 'flex-start', alignItems: 'center', gap: 9, display: 'inline-flex' }}>
    <div style={{ paddingLeft: 6, paddingRight: 4, justifyContent: 'flex-start', alignItems: 'center', gap: 4, display: 'flex' }}>
      <div style={{ paddingLeft: 2, paddingRight: 2, justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex' }}>
        <div style={{ color: '#424242', fontSize: 14, fontFamily: 'Segoe UI', fontWeight: '700', textDecoration: 'underline', wordWrap: 'break-word' }}>{title}</div>
      </div>
    </div>
    <div style={{ paddingLeft: 4, justifyContent: 'flex-end', alignItems: 'center', gap: 4, display: 'flex' }}>
      <div style={{ width: 119, paddingLeft: 2, paddingRight: 4, justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex' }}>
        <div style={{ textAlign: 'right', color: '#616161', fontSize: 14, fontFamily: 'Segoe UI', fontWeight: '400', wordWrap: 'break-word' }}>{state}  •  {date}</div>
      </div>
      <div style={{ justifyContent: 'flex-end', alignItems: 'center', display: 'flex' }}>
        <div style={{ width: 16, height: 16, position: 'relative' }}>
          <div style={{ width: 6, height: 12, left: 5, top: 2, position: 'absolute', background: '#616161' }}></div>
        </div>
        <div style={{ width: 16, height: 16, position: 'relative' }}>
          <div style={{ width: 13, height: 14, left: 1, top: 1, position: 'absolute', background: '#616161' }}></div>
        </div>
        <div style={{ width: 16, height: 16, position: 'relative' }}>
          <div style={{ width: 6, height: 12, left: 5, top: 2, position: 'absolute', background: '#616161' }}></div>
        </div>
        <div style={{ width: 24, height: 0, transform: 'rotate(90deg)', transformOrigin: '0 0', border: '1px #D1D1D1 solid' }}></div>
        <div style={{ width: 24, height: 32, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', display: 'inline-flex' }}>
          <div style={{ alignSelf: 'stretch', flex: '1 1 0', paddingLeft: 4, paddingRight: 4, paddingTop: 6, paddingBottom: 6, borderRadius: 4, justifyContent: 'center', alignItems: 'center', display: 'inline-flex' }}>
            <div style={{ width: 20, height: 20, position: 'relative' }}>
              <div style={{ width: 6.50, height: 12, left: 7.50, top: 4, position: 'absolute', background: '#424242' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const InsertButton = ({ count }) => (
  <div style={{ height: 27, paddingLeft: 12, paddingRight: 12, paddingTop: 5, paddingBottom: 5, background: '#0F6CBD', borderRadius: 4, overflow: 'hidden', justifyContent: 'center', alignItems: 'center', display: 'inline-flex' }}>
    <div style={{ paddingBottom: 2, justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex' }}>
      <div style={{ color: 'white', fontSize: 14, fontFamily: 'Segoe UI', fontWeight: '600', lineHeight: 20, wordWrap: 'break-word' }}>Insert ({count})</div>
    </div>
  </div>
);

const ResultsPage = () => (
  <div>
    <ResultItem title = "Lorem Ipsum" state = "TX" date="Jan 12, 2024"/>
    <ResultItem title = "Second Result" state = "TX" date="Jan 12, 2024"/>
    {/* Add more ResultItem components as needed */}
    <InsertButton count={2} /> {/* Update the count based on the number of results */}
  </div>
);


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

  const instructionPages = {
    tab1: {title: 'Instructions'},
  };

  return (  
    <div className={styles.root} style={{alignSelf: 'stretch', width: '100%', height: '100%', background: 'white', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 28, display: 'inline-flex'}}>
      {/* Top Navigation */}
      <div style={{alignSelf: 'stretch', height: 90, paddingLeft: 14, paddingRight: 14, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 14, display: 'flex'}}>
        {/* Top Navigation */}
        <TabList style={{width: 'auto'}} className={styles.tabListContainer} selectedValue={selectedTab} onTabSelect={(event, data) => setSelectedTab(data.value)}>
          {tabs.map((tab) => (
            <Tab style={{width: 'auto', height: 44, position: 'relative'}} key={tab.value} value={tab.value}> 
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
      
      {selectedTab === "tab1" && (
        <InstructionPage title={instructionPages.tab1.title}/>
      )}
      {selectedTab === "tab2" && (
        <ResultsPage/>
      )}
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
