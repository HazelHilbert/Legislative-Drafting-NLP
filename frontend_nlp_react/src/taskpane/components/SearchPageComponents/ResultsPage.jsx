import { Button } from "@fluentui/react-components";
import React from "react";
import ResultItem from "./ResultItem";
import "./ResultsPage.css"; // Import the CSS file

const ResultsPage = () => (
  <div className="resultsContainer">
    <ResultItem title="Lorem Ipsum" state="TX" date="Jan 12, 2024" />
    <ResultItem title="Second Result" state="TX" date="Jan 12, 2024" />
    <Button appearance="primary" className="button">
      Insert 2
    </Button>
  </div>
);

export default ResultsPage;
