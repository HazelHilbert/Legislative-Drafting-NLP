import { Input, Tab, TabList, makeStyles, tokens } from "@fluentui/react-components";
import React, { useState } from "react";
import InstructionPage from "./InstructionPage";
import ResultsPage from "./ResultsPage";
import FiltersPage from "./FiltersPage";
import useStyles from "./SearchPageConsts"

const SearchPage = () => {
  // Page styling:
  const styles = useStyles();
  
  // Filter Page Filters
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedFileTypes, setSelectedFileTypes] = useState([]);
  const [selectedState, setSelectedState] = useState(null);
  const [chips, setChips] = useState([]);

  

  const [searchText, setSearchText] = useState("");
  const [searchOutput, setSearchOutput] = useState("");
  const [selectedTab, setSelectedTab] = useState("tab1"); // Add state for the selected tab
  const [loading, setLoading] = useState(false);
  const [imageID, setImageID] = useState("../../assets/LoadingTwoColour.gif");


  const getSearchResults = async (text) => {
    // Grab the information from the input box. 
    // Grab the values from the filters pills. 
    try {
      // getch("https://127.0.0.1:500/search?query=exampleQuery&....") add all the queries inside this search paramter
      const response = await fetch("http://127.0.0.1:5000/search" + "?query=${selectedDate}&state=${selectedFileTypes}&documentType=example&effectiveDate=123");
      if (!response.ok) {
        setSummarizedText("Invalid Summarize!");
      }
      const data = await response.text();
      setSummarizedText(data);
    } catch (error) {
      setSummarizedText("Invalid Summarize!");
    }
  };

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

  
















  // Filter page functions
  // US States
  const usStates = [
    { key: "alabama", text: "Alabama" },
    { key: "alaska", text: "Alaska" },
    { key: "arizona", text: "Arizona" },
    { key: "arkansas", text: "Arkansas" },
    { key: "california", text: "California" },
    { key: "colorado", text: "Colorado" },
    { key: "connecticut", text: "Connecticut" },
    { key: "delaware", text: "Delaware" },
    { key: "florida", text: "Florida" },
    { key: "georgia", text: "Georgia" },
    { key: "hawaii", text: "Hawaii" },
    { key: "idaho", text: "Idaho" },
    { key: "illinois", text: "Illinois" },
    { key: "indiana", text: "Indiana" },
    { key: "iowa", text: "Iowa" },
    { key: "kansas", text: "Kansas" },
    { key: "kentucky", text: "Kentucky" },
    { key: "louisiana", text: "Louisiana" },
    { key: "maine", text: "Maine" },
    { key: "maryland", text: "Maryland" },
    { key: "massachusetts", text: "Massachusetts" },
    { key: "michigan", text: "Michigan" },
    { key: "minnesota", text: "Minnesota" },
    { key: "mississippi", text: "Mississippi" },
    { key: "missouri", text: "Missouri" },
    { key: "montana", text: "Montana" },
    { key: "nebraska", text: "Nebraska" },
    { key: "nevada", text: "Nevada" },
    { key: "new-hampshire", text: "New Hampshire" },
    { key: "new-jersey", text: "New Jersey" },
    { key: "new-mexico", text: "New Mexico" },
    { key: "new-york", text: "New York" },
    { key: "north-carolina", text: "North Carolina" },
    { key: "north-dakota", text: "North Dakota" },
    { key: "ohio", text: "Ohio" },
    { key: "oklahoma", text: "Oklahoma" },
    { key: "oregon", text: "Oregon" },
    { key: "pennsylvania", text: "Pennsylvania" },
    { key: "rhode-island", text: "Rhode Island" },
    { key: "south-carolina", text: "South Carolina" },
    { key: "south-dakota", text: "South Dakota" },
    { key: "tennessee", text: "Tennessee" },
    { key: "texas", text: "Texas" },
    { key: "utah", text: "Utah" },
    { key: "vermont", text: "Vermont" },
    { key: "virginia", text: "Virginia" },
    { key: "washington", text: "Washington" },
    { key: "west-virginia", text: "West Virginia" },
    { key: "wisconsin", text: "Wisconsin" },
    { key: "wyoming", text: "Wyoming" },
  ];

  const debug = () => {
    return `Output: ${selectedFileTypes}`;
  };

  // Document Type | US States | Date
  const legislativeDocumentTypes = [
    { key: "bill", text: "Bill" },
    { key: "resolution", text: "Resolution" },
    { key: "law", text: "Law" },
    { key: "amendment", text: "Amendment" },
    { key: "report", text: "Report" },
    { key: "minutes", text: "Minutes" },
    { key: "regulation", text: "Regulation" },
  ];


  const MultiselectWithTags = (props) => {
    // generate ids for handling labelling
    const comboId = useId("combo-multi");
    const selectedListId = `${comboId}-selection`;

    // refs for managing focus when removing tags
    const selectedListRef = useRef(null);
    const comboboxInputRef = useRef(null);

    const options = usStates.map((state) => state.text);
    const styles = useStyles();

    // Handle selectedOptions both when an option is selected or deselected in the Combobox,
    // and when an option is removed by clicking on a tag
    const [selectedOptions, setSelectedOptions] = useState([]);

    const onSelect = (event, data) => {
      setSelectedOptions(data.selectedOptions);
    };

    const onTagClick = (option, index) => {
      // remove selected option
      setSelectedOptions(selectedOptions.filter((o) => o !== option));

      // focus previous or next option, defaulting to focusing back to the combo input
      const indexToFocus = index === 0 ? 1 : index - 1;
      const optionToFocus = selectedListRef.current?.querySelector(`#${comboId}-remove-${indexToFocus}`);
      if (optionToFocus) {
        optionToFocus.focus();
      } else {
        comboboxInputRef.current?.focus();
      }
    };

    const labelledBy = selectedOptions.length > 0 ? `${comboId} ${selectedListId}` : comboId;

    return (
      <div className={styles.root}>
        {selectedOptions.length ? (
          <ul id={selectedListId} className={styles.tagsList} ref={selectedListRef}>
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
          placeholder="Select States"
          selectedOptions={selectedOptions}
          onOptionSelect={onSelect}
          ref={comboboxInputRef}
          {...props}
        >
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </Combobox>
      </div>
    );
  };

  // Filter Tab Functions to handle interaction with filters.
  // Handles applying file type
  const handleFileTypeChange = (fileType) => {
    setSelectedFileTypes((prevFileTypes) => {
      if (prevFileTypes.includes(fileType)) {
        return prevFileTypes.filter((type) => type !== fileType);
      } else {
        return [...prevFileTypes, fileType];
      }
    });
  };

  // Handles apply state
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
      case "date":
        setSelectedDate(null);
        break;
      case "fileType":
        // setSelectedFileTypes([]);
        break;
      case "state":
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
      width: "auto",
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
          onClick={() => handleRemoveFilter("date")}
        >
          {selectedDate.toDateString()}
        </ToggleButton>
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
            onClick={() => handleRemoveFilter("fileType")}
          >
            {fileType}
          </ToggleButton>
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
          onClick={() => handleRemoveFilter("state")}
        >
          {selectedState}
        </ToggleButton>
      );
    }

    return chips;
  };

  // Function to update chips
  const updateChips = (newChips) => {
    setChips(newChips);
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
