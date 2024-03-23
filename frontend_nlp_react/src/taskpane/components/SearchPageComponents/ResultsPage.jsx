import { Button } from "@fluentui/react-components";
import React from "react";
import ResultItem from "./ResultItem";
import "./ResultsPage.css"; // Import the CSS file

const ResultsPage = ({ searchResults }) => (
  <div className="resultsContainer">
    {searchResults.map((result, index) => (
      <ResultItem
        key={index}
        title={result.title}
        state={result.state}
        date={result.last_action_date}
        url={result.url}
      />
    ))}
  </div>
);

export default ResultsPage;
