import { Button } from "@fluentui/react-components";
import React from "react";
import ResultItem from "./ResultItem";
import "./ResultsPage.css"; // Import the CSS file

const ResultsPage = ({ searchResults }) => {
  
  console.log(searchResults);
  return (
  <div className="resultsContainer">
    
    {/* Check if searchResults is not null or undefined before mapping over it */}
    {searchResults && searchResults.map((result, index) => (
      <ResultItem
        key={index}
        title={result.title}
        state={result.state}
        date={result.last_action_date}
        url={result.text_url}
      />
    ))}
  </div>
  );
};

export default ResultsPage;

