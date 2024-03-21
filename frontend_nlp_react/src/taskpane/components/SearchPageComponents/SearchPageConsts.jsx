import { Input, Tab, TabList, makeStyles, tokens } from "@fluentui/react-components";

const useStyles = makeStyles({
    root: {
      alignItems: "flex-start",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      rowGap: "0px",
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

export {useStyles, tabs, instructionPages, usStates, legislativeDocumentTypes};