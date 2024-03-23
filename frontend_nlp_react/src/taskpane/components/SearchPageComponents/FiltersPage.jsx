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
import {filterPageStyles, usStates, legislativeDocumentTypes, MultiselectWithTags} from "./SearchPageConsts"

// Allows us to select filters for searching for different pieces of legislative documents
const FiltersPage = ({ selectedDate, setSelectedDate, selectedFileTypes, setSelectedFileTypes, selectedState, setSelectedState }) => {
  // Filter Page Styles
  const searchFilterPageStyles = filterPageStyles();

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
        <h3 className={searchFilterPageStyles.selectedFiltersHeader}>
          Selected Filters {renderChips()}{" "}
        </h3>
      </div>

      {/* Document Type */}
      <div className={searchFilterPageStyles.documentTypeRoot}>
        <div className={searchFilterPageStyles.documentTypeHeader}>
          Document Type
        </div>
        <div className={searchFilterPageStyles.documentTypeChips}>
          {legislativeDocumentTypes.map((type, index) => 
            (<div key={type.key} style={{ marginBottom: index % 2 === 0 ? 0 : 10 }}>
              <Checkbox label={type.text} id={type.key} onChange={onCheckboxChange} />
            </div>))
          }
        </div>
      </div>

      {/* States */}
      <div className={searchFilterPageStyles.statesRoot}>
        <div className={searchFilterPageStyles.statesHeader}>
          <h3>State</h3>
        </div>
        {/* Tick Boxes */}
        <div className={searchFilterPageStyles.checkboxesContainer}>
          <MultiselectWithTags
            placeholder="Select a state"
            options={usStates}
            onChange={onDropdownChange}
          />
        </div>
      </div>

      {/* Effective Dates */}
      <div className={searchFilterPageStyles.calendarRoot}>
        <div className={searchFilterPageStyles.calendarHeader}>
          <h3 className={searchFilterPageStyles.calendarText}>Effective Date</h3>
        </div>
        
        {/* Calendar */}
        <div className={searchFilterPageStyles.calendarContainer}>
          <div className={searchFilterPageStyles.calendar}>
            <Calendar onSelectDate={onDateSelect} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiltersPage;
