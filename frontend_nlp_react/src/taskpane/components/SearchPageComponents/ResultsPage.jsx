import React from "react";
import ResultItem from "./ResultItem";
import InsertButton from "./InsertButton";

const ResultsPage = () => (
  <div
    style={{
      width: "100%",
      height: "100%",
      background: "white",
      borderRadius: 4,
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "center",
      gap: 7,
      display: "inline-flex",
    }}
  >
    <ResultItem title="Lorem Ipsum" state="TX" date="Jan 12, 2024" />
    <ResultItem title="Second Result" state="TX" date="Jan 12, 2024" />
    {/* Add more ResultItem components as needed. Maybe we can add some sort of mapping to show each result. */}
    <InsertButton count={2} /> {/* Update the count based on the number of results */}
  </div>
);

export default ResultsPage;
