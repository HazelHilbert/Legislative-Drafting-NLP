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
  shorthands,
} from "@fluentui/react-components";
import { Dismiss12Regular, Dismiss24Regular } from "@fluentui/react-icons";
import React, { useRef, useState } from "react";
import { filterPageStyles, usStates, legislativeDocumentTypes, useStyles } from "./SearchPageConsts";

import "./FiltersPage.css";

// Allows us to select filters for searching for different pieces of legislative documents
const FiltersPage = ({
  selectedDate,
  setSelectedDate,
  selectedFileTypes,
  setSelectedFileTypes,
  selectedState,
  setSelectedState,
}) => {
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
    if (selectedOption && selectedOption.optionText) {
      // Check if selectedOption is not null and has the expected structure
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
      <div className="filtersTitle">
        <div className={searchFilterPageStyles.selectedFiltersRoot}>
          <h3 className={searchFilterPageStyles.selectedFiltersHeader}>Selected Filters {renderChips()} </h3>
        </div>
      </div>

      {/* Document Type */}
      <div className="document">
        <div className={searchFilterPageStyles.documentTypeRoot}>
          <div className={searchFilterPageStyles.documentTypeHeader}>Document Type</div>
          <div className={searchFilterPageStyles.documentTypeChips}>
            {legislativeDocumentTypes.map((type, index) => (
              <div key={type.key} style={{ marginBottom: index % 2 === 0 ? 0 : 10 }}>
                <Checkbox label={type.text} id={type.key} onChange={onCheckboxChange} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* States */}
      <div className={searchFilterPageStyles.statesRoot}>
        <div className={searchFilterPageStyles.statesHeader}>
          <h3 className="state">State</h3>
        </div>
        {/* Tick Boxes */}
        <div className="filters">
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
