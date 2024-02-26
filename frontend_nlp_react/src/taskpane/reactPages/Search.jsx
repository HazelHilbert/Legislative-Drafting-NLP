import * as React from "react";
import { useState } from "react";
import { makeStyles } from "@fluentui/react-components";
import { Ribbon24Regular, LockOpen24Regular, DesignIdeas24Regular } from "@fluentui/react-icons";
import { EditArrowBack24Regular, DocumentOnePageMultiple24Regular } from '@fluentui/react-icons';
import { Input } from "@fluentui/react-components";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { createRoot } from "react-dom/client";


const useStyles = makeStyles({
  root: {
    minHeight: "100vh",
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

  return (
    <div style={{width: '100%', height: '100%', background: 'white', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 28, display: 'inline-flex'}}>
      <div style={{alignSelf: 'stretch', height: 90, paddingLeft: 14, paddingRight: 14, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 14, display: 'flex'}}>
        <div style={{alignSelf: 'stretch', justifyContent: 'center', alignItems: 'flex-start', display: 'inline-flex'}}>
            <div style={{width: 64, height: 44, position: 'relative'}}>
                <div style={{width: 64, height: 44, left: 0, top: 0, position: 'absolute', background: 'white'}} />
                <div style={{width: 64, height: 2, left: 0, top: 42, position: 'absolute', background: '#0078D7'}} />
                <div style={{width: 56, left: 4, top: 24, position: 'absolute', textAlign: 'center', color: '#333333', fontSize: 12, fontFamily: 'Segoe UI', fontWeight: '700', wordWrap: 'break-word'}}>Search</div>
                <div style={{width: 16, height: 16, left: 24, top: 8, position: 'absolute'}}>
                    <div style={{width: 16, height: 16, left: 16, top: 0, position: 'absolute', transform: 'rotate(180deg)', transformOrigin: '0 0', background: '#0078D4'}}></div>
                </div>
            </div>
            <div style={{width: 64, height: 44, position: 'relative'}}>
                <div style={{width: 64, height: 44, left: 0, top: 0, position: 'absolute', background: 'white'}} />
                <div style={{width: 56, left: 4, top: 24, position: 'absolute', textAlign: 'center', color: '#333333', fontSize: 12, fontFamily: 'Segoe UI', fontWeight: '400', wordWrap: 'break-word'}}>Result</div>
                <div style={{width: 11, height: 16, left: 26, top: 8, position: 'absolute'}}>
                    <div style={{width: 11, height: 16, left: 0, top: 0, position: 'absolute', background: '#0078D4'}}></div>
                </div>
            </div>
            <div style={{width: 64, height: 44, position: 'relative'}}>
                <div style={{width: 64, height: 44, left: 0, top: 0, position: 'absolute', background: 'white'}} />
                <div style={{width: 56, left: 4, top: 24, position: 'absolute', textAlign: 'center', color: '#333333', fontSize: 12, fontFamily: 'Segoe UI', fontWeight: '400', wordWrap: 'break-word'}}>Filter</div>
                <div style={{width: 16, height: 11, left: 24, top: 11, position: 'absolute'}}>
                    <div style={{width: 16, height: 11, left: 0, top: 0, position: 'absolute', background: '#0078D4'}}></div>
                </div>
            </div>
            <div style={{width: 64, height: 44, position: 'relative'}}>
                <div style={{width: 64, height: 44, left: 0, top: 0, position: 'absolute', background: 'white'}} />
                <div style={{width: 56, left: 4, top: 24, position: 'absolute', textAlign: 'center', color: '#333333', fontSize: 12, fontFamily: 'Segoe UI', fontWeight: '400', wordWrap: 'break-word'}}>Add</div>
                <div style={{width: 16, height: 16, left: 24, top: 8, position: 'absolute'}}>
                    <div style={{width: 16, height: 16, left: 0, top: 0, position: 'absolute', background: '#0078D4'}}></div>
                </div>
            </div>
            <div style={{width: 64, height: 44, position: 'relative'}}>
                <div style={{width: 64, height: 44, left: 0, top: 0, position: 'absolute', background: 'white'}} />
                <div style={{width: 56, left: 4, top: 24, position: 'absolute', textAlign: 'center', color: '#333333', fontSize: 12, fontFamily: 'Segoe UI', fontWeight: '400', wordWrap: 'break-word'}}>Search</div>
                <div style={{left: 24, top: 8, position: 'absolute', textAlign: 'center', color: '#0078D4', fontSize: 16, fontFamily: 'Fabric External MDL2 Assets', fontWeight: '400', wordWrap: 'break-word'}}></div>
            </div>
        </div>
        <div style={{alignSelf: 'stretch', height: 32, borderRadius: 4, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
            <div style={{alignSelf: 'stretch', paddingLeft: 10, paddingRight: 10, background: 'rgba(255, 255, 255, 0)', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
                <div style={{flex: '1 1 0', height: 32, justifyContent: 'flex-start', alignItems: 'center', display: 'flex'}}>
                    <div style={{flex: '1 1 0', height: 32, paddingTop: 5, paddingBottom: 7, paddingLeft: 2, paddingRight: 2, justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
                        <div style={{color: '#707070', fontSize: 14, fontFamily: 'Segoe UI', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Search</div>
                    </div>
                </div>
            </div>
            <div style={{width: 464, height: 1, background: '#575757'}} />
        </div>
      </div>
      <div style={{alignSelf: 'stretch', height: 383, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 26, display: 'flex'}}>
        <div style={{alignSelf: 'stretch', height: 325, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 30, display: 'flex'}}>
            <div style={{alignSelf: 'stretch', height: 141, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 21, display: 'flex'}}>
                <img style={{width: 64, height: 64}} src="https://via.placeholder.com/64x64" />
                <div style={{color: '#333333', fontSize: 42, fontFamily: 'Segoe UI', fontWeight: '300', wordWrap: 'break-word'}}>Instructions</div>
            </div>
            <div style={{alignSelf: 'stretch', height: 154, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 33, display: 'flex'}}>
                <div style={{alignSelf: 'stretch', textAlign: 'center', color: '#333333', fontSize: 21, fontFamily: 'Segoe UI', fontWeight: '300', wordWrap: 'break-word'}}>Lorem ipsum dolor sit amet consectetur.</div>
                <div style={{alignSelf: 'stretch', height: 93, paddingLeft: 48, paddingRight: 48, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 18, display: 'flex'}}>
                    <div style={{justifyContent: 'flex-start', alignItems: 'flex-start', gap: 9, display: 'inline-flex'}}>
                        <div style={{textAlign: 'center', color: 'black', fontSize: 18, fontFamily: 'Fabric External MDL2 Assets', fontWeight: '400', wordWrap: 'break-word'}}></div>
                        <div style={{color: '#231F20', fontSize: 14, fontFamily: 'Segoe UI', fontWeight: '300', wordWrap: 'break-word'}}>Lorem ipsum dolor sit amet</div>
                    </div>
                    <div style={{justifyContent: 'flex-start', alignItems: 'flex-start', gap: 9, display: 'inline-flex'}}>
                        <div style={{textAlign: 'center', color: 'black', fontSize: 18, fontFamily: 'Fabric External MDL2 Assets', fontWeight: '400', wordWrap: 'break-word'}}></div>
                        <div style={{color: '#231F20', fontSize: 14, fontFamily: 'Segoe UI', fontWeight: '300', wordWrap: 'break-word'}}>Lorem ipsum dolor sit amet</div>
                    </div>
                    <div style={{justifyContent: 'flex-start', alignItems: 'flex-start', gap: 9, display: 'inline-flex'}}>
                        <div style={{textAlign: 'center', color: 'black', fontSize: 18, fontFamily: 'Fabric External MDL2 Assets', fontWeight: '400', wordWrap: 'break-word'}}></div>
                        <div style={{color: '#231F20', fontSize: 14, fontFamily: 'Segoe UI', fontWeight: '300', wordWrap: 'break-word'}}>Lorem ipsum dolor sit amet</div>
                    </div>
                </div>
            </div>
        </div>
        <div style={{width: 120, height: 32, position: 'relative'}}>
            <div style={{width: 120, height: 32, left: 0, top: 0, position: 'absolute', background: '#0078D4', boxShadow: '0px 2px 4px -0.75px rgba(0, 0, 0, 0.10)'}} />
            <div style={{left: 11, top: 5, position: 'absolute', textAlign: 'center', color: 'white', fontSize: 14, fontFamily: 'Segoe UI', fontWeight: '600', wordWrap: 'break-word'}}>Documentation</div>
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