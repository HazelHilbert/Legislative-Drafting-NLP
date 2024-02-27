import { Button } from "@fluentui/react-components";
import React from "react";

const InsertButton = ({ count }) => {
  return (
    <Button
      appearance="primary"
      style={{ marginLeft: 12, marginRight: 12, marginTop: 14, marginBottom: 5, overflow: "hidden" }}
    >
      Insert ({count})
    </Button>
  );
};

export default InsertButton;
