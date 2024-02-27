import * as React from "react";
import { useState } from "react";
import { makeStyles } from "@fluentui/react-components";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { createRoot } from "react-dom/client";
import { Tab, TabList, Input } from "@fluentui/react-components";
import { Button } from "@fluentui/react-components";
import { ChevronRight24Filled, DocumentDismiss24Regular, BookQuestionMark24Regular, Question24Regular, Dismiss24Regular, Delete24Regular} from '@fluentui/react-icons';
import { Checkbox, Dropdown, Calendar, Text } from '@fluentui/react';
import { ToggleButton } from "@fluentui/react-components";
import { Combobox, Option, shorthands, useId} from "@fluentui/react-components";
import {tokens} from "@fluentui/react-components";
import { Dismiss12Regular } from "@fluentui/react-icons";

// Styles
const globalStyles = {
  color: '#707070',
  fontSize: 14,
  fontFamily: 'Segoe UI, sans-serif',
  fontWeight: 400,
  wordWrap: 'break-word',
};
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
  tagsList: {
    listStyleType: "none",
    marginBottom: tokens.spacingVerticalXXS,
    marginTop: 0,
    paddingLeft: 0,
    display: "flex",
    gridGap: tokens.spacingHorizontalXXS,
  },
});

// Data
const usStates = [
  { key: 'alabama', text: 'Alabama' },
  { key: 'alaska', text: 'Alaska' },
  { key: 'arizona', text: 'Arizona' },
  { key: 'arkansas', text: 'Arkansas' },
  { key: 'california', text: 'California' },
  { key: 'colorado', text: 'Colorado' },
  { key: 'connecticut', text: 'Connecticut' },
  { key: 'delaware', text: 'Delaware' },
  { key: 'florida', text: 'Florida' },
  { key: 'georgia', text: 'Georgia' },
  { key: 'hawaii', text: 'Hawaii' },
  { key: 'idaho', text: 'Idaho' },
  { key: 'illinois', text: 'Illinois' },
  { key: 'indiana', text: 'Indiana' },
  { key: 'iowa', text: 'Iowa' },
  { key: 'kansas', text: 'Kansas' },
  { key: 'kentucky', text: 'Kentucky' },
  { key: 'louisiana', text: 'Louisiana' },
  { key: 'maine', text: 'Maine' },
  { key: 'maryland', text: 'Maryland' },
  { key: 'massachusetts', text: 'Massachusetts' },
  { key: 'michigan', text: 'Michigan' },
  { key: 'minnesota', text: 'Minnesota' },
  { key: 'mississippi', text: 'Mississippi' },
  { key: 'missouri', text: 'Missouri' },
  { key: 'montana', text: 'Montana' },
  { key: 'nebraska', text: 'Nebraska' },
  { key: 'nevada', text: 'Nevada' },
  { key: 'new-hampshire', text: 'New Hampshire' },
  { key: 'new-jersey', text: 'New Jersey' },
  { key: 'new-mexico', text: 'New Mexico' },
  { key: 'new-york', text: 'New York' },
  { key: 'north-carolina', text: 'North Carolina' },
  { key: 'north-dakota', text: 'North Dakota' },
  { key: 'ohio', text: 'Ohio' },
  { key: 'oklahoma', text: 'Oklahoma' },
  { key: 'oregon', text: 'Oregon' },
  { key: 'pennsylvania', text: 'Pennsylvania' },
  { key: 'rhode-island', text: 'Rhode Island' },
  { key: 'south-carolina', text: 'South Carolina' },
  { key: 'south-dakota', text: 'South Dakota' },
  { key: 'tennessee', text: 'Tennessee' },
  { key: 'texas', text: 'Texas' },
  { key: 'utah', text: 'Utah' },
  { key: 'vermont', text: 'Vermont' },
  { key: 'virginia', text: 'Virginia' },
  { key: 'washington', text: 'Washington' },
  { key: 'west-virginia', text: 'West Virginia' },
  { key: 'wisconsin', text: 'Wisconsin' },
  { key: 'wyoming', text: 'Wyoming' },
]; 

// Instruction Tab
//      Onboarding page describing how to use the search page. 
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

// Results Tab
//      Results page showing the results from search. The results page include an insert button allowing to insert a search result
//      into the word document. (Still needs to be integrated with backend).
const ResultItem = ({ title, state, date }) => {
  const [showSummary, setShowSummary] = React.useState(false);

  const handleChevronClick = () => {
    setShowSummary(!showSummary);
  };

  return (
  <div style={{width: '100%', height: '100%', background: 'white', borderRadius: 4, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 7, display: 'inline-flex'}}>
    <div style={{alignSelf: 'stretch', background: 'white', borderRadius: 4, justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex'}}>
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
          <button  style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
            <DocumentDismiss24Regular style={{width: 16, height: 16, position: 'relative'}}> </DocumentDismiss24Regular>
          </button>
          <button  onClick={handleChevronClick} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
            <BookQuestionMark24Regular style={{width: 16, height: 16, position: 'relative'}}> </BookQuestionMark24Regular>
          </button>
          <button style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
            <ChevronRight24Filled style={{width: 16, height: 16, position: 'relative'}}> </ChevronRight24Filled>
          </button>
        </div>
      </div>
    </div>
    {showSummary && (
      <div style={{ alignSelf: 'stretch', paddingBottom: 7, paddingLeft: 7, paddingRight: 7, justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'inline-flex' }}>
        <div style={{ flex: '1 1 0', height: 48, color: '#333333', fontSize: 12, fontFamily: 'Segoe UI', fontWeight: '400', wordWrap: 'break-word' }}>
          Lorem ipsum dolor sit amet consectetur. Turpis eu mi quis nunc scelerisque non pulvinar sit lacus. Pellentesque ultrices vel fusce laoreet purus blandit.
        </div>
      </div>
    )}
  </div>
  );
};
const InsertButton = ({ count }) => (
  <Button appearance="primary" style={{marginLeft: 12, marginRight: 12, marginTop: 14, marginBottom: 5, overflow: 'hidden'}}>Insert ({count})</Button>
);
const ResultsPage = () => (
  <div style={{width: '100%', height: '100%', background: 'white', borderRadius: 4, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 7, display: 'inline-flex'}}> 
    <ResultItem title = "Lorem Ipsum" state = "TX" date="Jan 12, 2024"/>
    <ResultItem title = "Second Result" state = "TX" date="Jan 12, 2024"/>
    {/* Add more ResultItem components as needed. Maybe we can add some sort of mapping to show each result. */}
    <InsertButton count={2} /> {/* Update the count based on the number of results */}
  </div>
);

// Filters Tab
//      Allows the selection of filters to be used in search
const FiltersPage = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedFileTypes, setSelectedFileTypes] = useState([]);
  const [selectedState, setSelectedState] = useState(null);

  // Filters:
  //    Document Type | US States | Date
  const legislativeDocumentTypes = [
    { key: 'bill', text: 'Bill' },
    { key: 'resolution', text: 'Resolution' },
    { key: 'law', text: 'Law' },
    { key: 'amendment', text: 'Amendment' },
    { key: 'report', text: 'Report' },
    { key: 'minutes', text: 'Minutes' },
    { key: 'regulation', text: 'Regulation' },
  ];

  // Filter Tab Functions to handle interaction with filters. 
  const handleFileTypeChange = (fileType) => {
    setSelectedFileTypes((prevFileTypes) => {
      if (prevFileTypes.includes(fileType)) {
        return prevFileTypes.filter((type) => type !== fileType);
      } else {
        return [...prevFileTypes, fileType];
      }
    });
  };
  const handleStateChange = (event, option) => {
    setSelectedState(option.text);
  };
  const onCheckboxChange = (ev, isChecked) => {
    const fileType = ev.target.id;
    handleFileTypeChange(fileType);
  };
  const onDropdownChange = (event, option, index) => {
    handleStateChange(event, option);
  };
  const onDateSelect = (date) => {
    setSelectedDate(date);
  };
  const handleRemoveFilter = (filterType) => {
    switch (filterType) {
      case 'date':
        setSelectedDate(null);
        break;
      case 'fileType':
        setSelectedFileTypes([]);
        break;
      case 'state':
        setSelectedState(null);
        break;
      default:
        break;
    }
  };
  const renderChips = () => {
    const [hoverStates, setHoverStates] = React.useState({
      hover1: false,
      hover2: false,
      hover3: false,
    });
    
    const handleHover = (buttonIndex, isHovering) => {
      setHoverStates((prevStates) => ({
        ...prevStates,
        [`hover${buttonIndex}`]: isHovering,
      }));
    };

    
    const chipStyle = {
      width: 'auto'
    };

    const chips = [];
    
    if (selectedDate) {
      chips.push(
        <ToggleButton 
          key="date"
          size="small"
          style={chipStyle}
          onMouseOver={() => handleHover(1, true)}
          onMouseOut={() => handleHover(1, false)}
          {...(hoverStates.hover1 && { icon: <Dismiss24Regular /> })}
          iconPosition="after"
          shape="circular"
          onClick={() => handleRemoveFilter('date')}
        >{selectedDate.toDateString()}</ToggleButton>
      );
    }

    if (selectedFileTypes.length > 0) {
      selectedFileTypes.forEach((fileType, index) => {
        chips.push(
          <ToggleButton
            key="date"
            size="small"
            style={chipStyle}
            onMouseOver={() => handleHover(1, true)}
            onMouseOut={() => handleHover(1, false)}
            {...(hoverStates.hover1 && { icon: <Dismiss24Regular /> })}
            iconPosition="after"
            shape="circular"
            onClick={() => handleRemoveFilter('fileType')}
          >{fileType}</ToggleButton>
        );
      });
    }

    if (selectedState) {
      chips.push(
          <ToggleButton
            key="date"
            size="small"
            style={chipStyle}
            onMouseOver={() => handleHover(1, true)}
            onMouseOut={() => handleHover(1, false)}
            {...(hoverStates.hover1 && { icon: <Dismiss24Regular /> })}
            iconPosition="after"
            shape="circular"
            onClick={() => handleRemoveFilter('state')}
          >{selectedState}</ToggleButton>
      );
    }

    return chips;
  };

  // Removed
  const Mixed = () => {
    const [option1, setOption1] = React.useState(false);
    const [option2, setOption2] = React.useState(true);
    const [option3, setOption3] = React.useState(false);
  
    return (
      <>
        <Checkbox
          checked={
            option1 && option2 && option3
              ? true
              : !(option1 || option2 || option3)
              ? false
              : "mixed"
          }
          onChange={(_ev, data) => {
            setOption1(!!data.checked);
            setOption2(!!data.checked);
            setOption3(!!data.checked);
          }}
          label="All options"
        />
  
        <Checkbox
          checked={option1}
          onChange={() => setOption1((checked) => !checked)}
          label="Option 1"
        />
        <Checkbox
          checked={option2}
          onChange={() => setOption2((checked) => !checked)}
          label="Option 2"
        />
        <Checkbox
          checked={option3}
          onChange={() => setOption3((checked) => !checked)}
          label="Option 3"
        />
      </>
    );
  };

  return (
    <div style={{width: '100%', height: '100%', paddingBottom: 0, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 14, display: 'inline-flex'}}>
      <div style={{alignSelf: 'stretch', height: 'auto', padding: 7, background: '#F6F6F6', borderRadius: 7, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 7, display: 'flex'}}>
          <div style={{paddingLeft: 6, paddingRight: 4, justifyContent: 'flex-start', alignItems: 'center', gap: 4, display: 'inline-flex'}}>
              <div style={{paddingLeft: 2, paddingRight: 2, justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
                  <h3 style={{color: '#424242', fontFamily: 'Segoe UI', fontWeight: '400', wordWrap: 'break-word'}}>Selected Filters {renderChips()} </h3>
              </div>
          </div>
      </div>

      {/* Document Type */}
      <div style={{alignSelf: 'stretch', height: 'auto', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 14, display: 'flex'}}>
          <div style={{paddingLeft: 7, paddingRight: 4, justifyContent: 'flex-start', alignItems: 'center', gap: 4, display: 'inline-flex'}}>
              <div style={{paddingLeft: 2, paddingRight: 2, justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
                  <div style={{color: '#424242', fontSize: 14, fontFamily: 'Segoe UI', fontWeight: '700', wordWrap: 'break-word'}}>Document Type</div>
              </div>
          </div>
          <div style={{paddingLeft: 28, paddingRight: 4, justifyContent: 'flex-start', alignItems: 'center', gap: 20, display: 'inline-flex', flexWrap: 'wrap'}}>
            {legislativeDocumentTypes.map((type) => (
              <Checkbox key={type.key} label={type.text} id={type.key} onChange={onCheckboxChange} />
            ))}
          </div>
      </div>

      {/* States */}
      <div style={{alignSelf: 'stretch', height: 'auto', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 0, display: 'flex'}}>
          <div style={{paddingLeft: 7, paddingRight: 4, justifyContent: 'flex-start', alignItems: 'center', gap: 0, display: 'inline-flex'}}>
              <div style={{paddingLeft: 2, paddingRight: 2, justifyContent: 'flex-start', alignItems: 'center', gap: 0, display: 'flex'}}>
                  <h3 style={{color: '#424242', fontSize: 14, fontFamily: 'Segoe UI', fontWeight: '700', wordWrap: 'break-word'}}>State</h3>
              </div>
          </div>
          {/* Tick Boxes */}
          <div style={{paddingLeft: 28, height: 'auto', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
              <MultiselectWithTags placeholder="Select a state" options={usStates} onChange={onDropdownChange}></MultiselectWithTags>
          </div>
      </div>
      {/* Effective Dates */}
      <div style={{alignSelf: 'stretch', height: 'auto', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 0, display: 'flex'}}> 
          <div style={{paddingLeft: 7, paddingRight: 4, justifyContent: 'flex-start', alignItems: 'center', gap: 0, display: 'inline-flex'}}>
              <div style={{paddingLeft: 2, paddingRight: 2, justifyContent: 'flex-start', alignItems: 'center', gap: 0, display: 'flex'}}>
                  <h3 style={{color: '#424242', fontSize: 14, fontFamily: 'Segoe UI', fontWeight: '700', wordWrap: 'break-word'}}>Effective Date</h3>
              </div>
          </div>
          {/* Calendar */}
          <div style={{paddingLeft: 28, alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center', gap: 0, display: 'inline-flex'}}>
              <div style={{justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'flex'}}>
                  <Calendar onSelectDate={onDateSelect} style={{width: 'auto', boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.12)', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 12, display: 'flex'}} />
              </div>
          </div>
      </div>
  </div>
  );
};
const MultiselectWithTags = (props) => {
  // generate ids for handling labelling
  const comboId = useId("combo-multi");
  const selectedListId = `${comboId}-selection`;

  // refs for managing focus when removing tags
  const selectedListRef = React.useRef(null);
  const comboboxInputRef = React.useRef(null);

  const options = usStates.map(state => state.text);
  const styles = useStyles();

  // Handle selectedOptions both when an option is selected or deselected in the Combobox,
  // and when an option is removed by clicking on a tag
  const [selectedOptions, setSelectedOptions] = React.useState([]);

  const onSelect = (event, data) => {
    setSelectedOptions(data.selectedOptions);
  };

  const onTagClick = (option, index) => {
    // remove selected option
    setSelectedOptions(selectedOptions.filter((o) => o !== option));

    // focus previous or next option, defaulting to focusing back to the combo input
    const indexToFocus = index === 0 ? 1 : index - 1;
    const optionToFocus = selectedListRef.current?.querySelector(
      `#${comboId}-remove-${indexToFocus}`
    );
    if (optionToFocus) {
      optionToFocus.focus();
    } else {
      comboboxInputRef.current?.focus();
    }
  };

  const labelledBy =
    selectedOptions.length > 0 ? `${comboId} ${selectedListId}` : comboId;

  return (
    <div className={styles.root}>
      {selectedOptions.length ? (
        <ul
          id={selectedListId}
          className={styles.tagsList}
          ref={selectedListRef}
        >
          {/* The "Remove" span is used for naming the buttons without affecting the Combobox name */}
          <span id={`${comboId}-remove`} hidden>
            Remove
          </span>
          {selectedOptions.map((option, i) => (
            <li key={option}>
              <Button
                size="small"
                shape="circular"
                appearance="primary"
                icon={<Dismiss12Regular />}
                iconPosition="after"
                onClick={() => onTagClick(option, i)}
                id={`${comboId}-remove-${i}`}
                aria-labelledby={`${comboId}-remove ${comboId}-remove-${i}`}
              >
                {option}
              </Button>
            </li>
          ))}
        </ul>
      ) : null}
      <Combobox
        aria-labelledby={labelledBy}
        multiselect={true}
        placeholder="Select one or more animals"
        selectedOptions={selectedOptions}
        onOptionSelect={onSelect}
        ref={comboboxInputRef}
        {...props}
      >
        {options.map((option) => (
          <Option key={option}>{option}</Option>
        ))}
      </Combobox>
    </div>
  );
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

  const instructionPages = {
    tab1: {title: 'Instructions'},
  };

  return (  
    <div className={styles.root} style={{alignSelf: 'stretch', width: '100%', height: '100%', background: 'white', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 28, display: 'inline-flex'}}>
      {/* Top Navigation */}
      <div style={{alignSelf: 'stretch', height: 90, paddingLeft: 14, paddingRight: 14, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 0, display: 'flex'}}>
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
            <div style={{ width: 'auto', height: 1, background: '#575757' }} />
          </div>
        </div>
      </div>
      
      {selectedTab === "tab1" && (
        <InstructionPage title={instructionPages.tab1.title}/>
      )}
      {selectedTab === "tab2" && (
        <ResultsPage/>
      )}
      {selectedTab === "tab3" && (
        <FiltersPage/>
      )}
      {selectedTab === "tab4" && (
        // <AddPage/>
        <h1>Add</h1>
      )}
      {selectedTab === "tab5" && (
        // <AddPage/>
        <h1>Settings</h1>
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
