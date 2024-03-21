import React from "react";
import { Button } from "@fluentui/react-components";
import "./InstructionPage.css"; // Import the CSS file here

const InstructionPage = ({ title }) => {
  return (
    <div className="instructionPageContainer">
      <div className="sectionContainer">
        <div className="sectionInnerContainer">
          <div className="titleText">{title}</div>
        </div>
        <div className="sectionContainer">
          <div className="descriptionText">Propylon Legislation Search Tool.</div>
          <div className="featureListContainer">
            <div className="featureItem">
              <div className="featureIcon"></div>
              <div className="featureText">Bills</div>
            </div>
            <div className="featureItem">
              <div className="featureIcon"></div>
              <div className="featureText">Legislations</div>
            </div>
            <div className="featureItem">
              <div className="featureIcon"></div>
              <div className="featureText">Citations</div>
            </div>
          </div>
        </div>
      </div>
      <Button appearance="primary">Documentation</Button>
    </div>
  );
};

export default InstructionPage;
