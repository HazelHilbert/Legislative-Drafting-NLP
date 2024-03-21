import React, { useRef, useState } from "react";

// Fluent UI Components
import { Calendar } from "@fluentui/react";
import { Checkbox, Combobox, ToggleButton, makeStyles, tokens, useId} from "@fluentui/react-components";
import { Dismiss12Regular, Dismiss24Regular } from "@fluentui/react-icons";


const useStyles = makeStyles({
  root: {
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    rowGap: "20px",
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
    gridGap: tokens.spacingHorizontalXXS,
  },
});

//      Allows the selection of filters to be used in search
const FiltersPage = ({
  selectedDate,
  setSelectedDate,
  selectedFileTypes,
  setSelectedFileTypes,
  selectedState,
  setSelectedState
}) => {
  // Filters:
  // const [selectedDate, setSelectedDate] = useState(null);
  // const [selectedFileTypes, setSelectedFileTypes] = useState([]);
  // const [selectedState, setSelectedState] = useState(null);
  

  // Data
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

  

  //    Document Type | US States | Date
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
      case "date":
        setSelectedDate(null);
        break;
      case "fileType":
        setSelectedFileTypes([]);
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

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        paddingBottom: 0,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 14,
        display: "inline-flex",
      }}
    >
      <div
        style={{
          alignSelf: "stretch",
          height: "auto",
          padding: 7,
          background: "#F6F6F6",
          borderRadius: 7,
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          gap: 7,
          display: "flex",
        }}
      >
        <div
          style={{
            paddingLeft: 6,
            paddingRight: 4,
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 4,
            display: "inline-flex",
          }}
        >
          <div
            style={{
              paddingLeft: 2,
              paddingRight: 2,
              justifyContent: "flex-start",
              alignItems: "center",
              gap: 10,
              display: "flex",
            }}
          >
            <h3 style={{ color: "#424242", fontFamily: "Segoe UI", fontWeight: "400", wordWrap: "break-word" }}>
              Selected Filters {renderChips()}{" "}
            </h3>
          </div>
        </div>
      </div>

      {/* Document Type */}
      <div
        style={{
          alignSelf: "stretch",
          height: "auto",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          gap: 14,
          display: "flex",
        }}
      >
        <div
          style={{
            paddingLeft: 7,
            paddingRight: 4,
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 4,
            display: "inline-flex",
          }}
        >
          <div
            style={{
              paddingLeft: 2,
              paddingRight: 2,
              justifyContent: "flex-start",
              alignItems: "center",
              gap: 10,
              display: "flex",
            }}
          >
            <div
              style={{
                color: "#424242",
                fontSize: 14,
                fontFamily: "Segoe UI",
                fontWeight: "700",
                wordWrap: "break-word",
              }}
            >
              Document Type
            </div>
          </div>
        </div>
        <div
          style={{
            paddingLeft: 28,
            paddingRight: 4,
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 20,
            display: "inline-flex",
            flexWrap: "wrap",
          }}
        >
          {legislativeDocumentTypes.map((type) => (
            <Checkbox key={type.key} label={type.text} id={type.key} onChange={onCheckboxChange} />
          ))}
        </div>
      </div>

      {/* States */}
      <div
        style={{
          alignSelf: "stretch",
          height: "auto",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          gap: 0,
          display: "flex",
        }}
      >
        <div
          style={{
            paddingLeft: 7,
            paddingRight: 4,
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 0,
            display: "inline-flex",
          }}
        >
          <div
            style={{
              paddingLeft: 2,
              paddingRight: 2,
              justifyContent: "flex-start",
              alignItems: "center",
              gap: 0,
              display: "flex",
            }}
          >
            <h3
              style={{
                color: "#424242",
                fontSize: 14,
                fontFamily: "Segoe UI",
                fontWeight: "700",
                wordWrap: "break-word",
              }}
            >
              State
            </h3>
          </div>
        </div>
        {/* Tick Boxes */}
        <div
          style={{
            paddingLeft: 28,
            height: "auto",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            display: "flex",
          }}
        >
          <MultiselectWithTags
            placeholder="Select a state"
            options={usStates}
            onChange={onDropdownChange}
          ></MultiselectWithTags>
        </div>
      </div>
      {/* Effective Dates */}
      <div
        style={{
          alignSelf: "stretch",
          height: "auto",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          gap: 0,
          display: "flex",
        }}
      >
        <div
          style={{
            paddingLeft: 7,
            paddingRight: 4,
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 0,
            display: "inline-flex",
          }}
        >
          <div
            style={{
              paddingLeft: 2,
              paddingRight: 2,
              justifyContent: "flex-start",
              alignItems: "center",
              gap: 0,
              display: "flex",
            }}
          >
            <h3
              style={{
                color: "#424242",
                fontSize: 14,
                fontFamily: "Segoe UI",
                fontWeight: "700",
                wordWrap: "break-word",
              }}
            >
              Effective Date
            </h3>
          </div>
        </div>
        {/* Calendar */}
        <div
          style={{
            paddingLeft: 28,
            alignSelf: "stretch",
            justifyContent: "center",
            alignItems: "center",
            gap: 0,
            display: "inline-flex",
          }}
        >
          <div style={{ justifyContent: "flex-start", alignItems: "flex-start", gap: 10, display: "flex" }}>
            <Calendar
              onSelectDate={onDateSelect}
              style={{
                width: "auto",
                boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.12)",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                gap: 12,
                display: "flex",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiltersPage;
