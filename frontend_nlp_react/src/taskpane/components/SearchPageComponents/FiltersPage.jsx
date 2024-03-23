// Filters Tab
import { Calendar } from "@fluentui/react";
import {
  Checkbox,
  Combobox,
  ToggleButton,
  makeStyles,
  tokens,
  useId,
} from "@fluentui/react-components";
import { Dismiss12Regular, Dismiss24Regular } from "@fluentui/react-icons";
import React, { useRef, useState } from "react";
import {usStates, legislativeDocumentTypes, MultiselectWithTags} from "./SearchPageConsts"

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100%",
    paddingBottom: 0,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 14,
    display: "inline-flex",
  },
  selectedFiltersRoot: {
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
  },
  selectedFiltersBody: {
    paddingLeft: 6,
    paddingRight: 4,
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 4,
    display: "inline-flex",
  }, 
  selectedFiltersChips: {
    paddingLeft: 2,
    paddingRight: 2,
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 10,
    display: "flex",
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

// Allows us to select filters for searching for different pieces of legislative documents
const FiltersPage = ({ selectedDate, setSelectedDate, selectedFileTypes, setSelectedFileTypes, selectedState, setSelectedState }) => {
  // Filter Page Styles
  const searchFilterPageStyles = useStyles();

  // Handles changing file type filter
  const handleFileTypeChange = (fileType) => {
    setSelectedFileTypes((prevFileTypes) => {
      if (prevFileTypes.includes(fileType)) {
        return prevFileTypes.filter((type) => type !== fileType);
      } else {
        return [...prevFileTypes, fileType];
      }
    });
  };

  // Handles changing state filter
  const handleStateChange = (event, option) => {
    setSelectedState(option.text);
  };

  // Handles removing Filters
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
  
  // Change Text Box to Selected
  const onCheckboxChange = (ev, isChecked) => {
    const fileType = ev.target.id;
    handleFileTypeChange(fileType);
  };

  // Change Select Box when item selected from dropdown
  const onDropdownChange = (event, option, index) => {
    handleStateChange(event, option);
  };

  // change selected Date
  const onDateSelect = (date) => {
    setSelectedDate(date);
  };
  
  // Load Chips from Selected filters
  const renderChips = () => {
    const [hoverStates, setHoverStates] = React.useState({
      hover1: false,
      hover2: false,
      hover3: false,
    });

    // Handle hover state for filters
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
    <div className={searchFilterPageStyles.root}>
      {/* Applied Filters */}
      <div className={searchFilterPageStyles.selectedFiltersRoot}>
        <div className={searchFilterPageStyles.selectedFiltersBody}>
          <div className={searchFilterPageStyles.selectedFiltersChips}>
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
