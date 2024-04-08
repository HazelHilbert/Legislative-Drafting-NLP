// Filters Tab
import { Calendar } from "@fluentui/react";
import {
  Checkbox,
  Combobox,
  ToggleButton,
  makeStyles,
  tokens,
  useId,
  Label,
  Dropdown,
  Option,
  shorthands
} from "@fluentui/react-components";
import { Dismiss12Regular, Dismiss24Regular } from "@fluentui/react-icons";
import React, { useRef, useState } from "react";
import {filterPageStyles, usStates, legislativeDocumentTypes, useStyles} from "./SearchPageConsts"

import "./FiltersPage.css"

// Allows us to select filters for searching for different pieces of legislative documents
const FiltersPage = ({ selectedDate, setSelectedDate, selectedFileTypes, setSelectedFileTypes, selectedState, setSelectedState }) => {
  // Filter Page Styles
  const searchFilterPageStyles = filterPageStyles();

  // Modified FluentUI React V9 dropdown 
  const Clearable = ({ placeholder, options, onChange }) => {
    const dropdownId = useId("");
    const styles = useStyles();
  
    const handleSelect = (event, option, index) => {
      if (onChange) {
        onChange(option); // Pass the selected option to the parent component
      }
    };
  
    return (
      <div className={styles.root}>
        <Label id={dropdownId}>{placeholder}</Label>
        <Dropdown
          clearable
          aria-labelledby={dropdownId}
          placeholder={placeholder}
          onOptionSelect={handleSelect} // Call handleSelect when an option is selected
        >
          {options.map((option) => (
            <Option key={option.key} value={option.text}>
              {option.text}
            </Option>
          ))}
        </Dropdown>
      </div>
    );
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

  // Change Text Box to Selected
  const onCheckboxChange = (ev, isChecked) => {
    const fileType = ev.target.id;
    handleFileTypeChange(fileType);
  };

  // Handles changing state filter
  const handleStateChange = (selectedOption) => {
    if (selectedOption && selectedOption.optionText) { // Check if selectedOption is not null and has the expected structure
      setSelectedState(selectedOption.optionText); // Update selectedState with the selected option text
    }
  };

  // Change Select Box when item selected from dropdown
  const onDropdownChange = (event, option, index) => {
    handleStateChange(option);
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
          key={selectedState}
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
          <div className="selected-filters">
          Selected Filters {renderChips()}{" "}
          </div>
        </h3>
      </div>

      {/* Document Type */}
      <div className="document">
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
      </div>

      {/* States */}
      <div className={searchFilterPageStyles.statesRoot}>
        <div className={searchFilterPageStyles.statesHeader}>
          <h3 className="states">State</h3>
        </div>
        <div className="states">
        {/* Tick Boxes */}
        <div className={searchFilterPageStyles.checkboxesContainer}>
        <Clearable
          placeholder="Select a state"
          options={usStates}
          onChange={handleStateChange} // Pass handleStateChange as onChange callback
        />
        </div>
        </div>
      </div>

      {/* Effective Dates */}
      <div className="document">
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
    </div>
  );
};

export default FiltersPage;
