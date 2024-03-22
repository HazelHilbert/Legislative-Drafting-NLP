import { Input, Tab, TabList, makeStyles, tokens } from "@fluentui/react-components";
import {
    Checkbox,
    Combobox,
    ToggleButton,
    useId,
  } from "@fluentui/react-components";
  import React, { useRef, useState } from "react";

  const useStyles = makeStyles({
    root: {
      width: "100%",
      height: "100%",
      background: "white",
      gap: 28,
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "center",
      rowGap: "0px",
      alignSelf: "stretch",
    },
    topNavigation: {
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
    },
    tabListContainer: {
      alignSelf: "stretch",
      justifyContent: "center",
      alignItems: "flex-start",
      display: "inline-flex",
      flexWrap: "wrap", // Allow flex items to wrap to the next line
    },
    Tab: {
      width: "auto",
      height: 44,
      position: "relative",
    },
    searchBarContainer: {
      width: "100%",
      height: "100%",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "center",
      gap: 14,
      display: "inline-flex",
    },
    searchBarBox: {
      alignSelf: "stretch",
      height: 32,
      borderRadius: 4,
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      display: "flex",
    },
    searchBarBoxSecondary: {
        alignSelf: "stretch",
        paddingLeft: 10,
        paddingRight: 10,
        background: "rgba(255, 255, 255, 0)",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 10,
        display: "inline-flex",
    },
    searchBarBoxSecondary: {
        alignSelf: "stretch",
        paddingLeft: 10,
        paddingRight: 10,
        background: "rgba(255, 255, 255, 0)",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 10,
        display: "inline-flex",
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

  // FluentUI dropdown menu with tags
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

export {useStyles, tabs, instructionPages, usStates, legislativeDocumentTypes, MultiselectWithTags};