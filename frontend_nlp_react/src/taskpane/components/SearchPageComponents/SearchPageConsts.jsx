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


export default useStyles;