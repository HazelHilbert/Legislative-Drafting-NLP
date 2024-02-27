import { Button } from "@fluentui/react-components";
import React from "react";
// Instruction Tab
//      Onboarding page describing how to use the search page.
const InstructionPage = ({ title }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 26,
        display: "inline-flex",
      }}
    >
      <div
        style={{
          alignSelf: "stretch",
          height: "auto",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 28,
          display: "flex",
        }}
      >
        <div
          style={{
            alignSelf: "stretch",
            height: "auto",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 21,
            display: "flex",
          }}
        >
          <img style={{ width: "auto", height: 32 }} src="../../assets/propylonFull.png" />
          <div
            style={{
              color: "#333333",
              fontSize: 42,
              fontFamily: "Segoe UI",
              fontWeight: "300",
              wordWrap: "break-word",
            }}
          >
            {title}
          </div>
        </div>
        <div
          style={{
            alignSelf: "stretch",
            height: "auto",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 33,
            display: "flex",
          }}
        >
          <div
            style={{
              alignSelf: "stretch",
              textAlign: "center",
              color: "#333333",
              fontSize: 21,
              fontFamily: "Segoe UI",
              fontWeight: "300",
              wordWrap: "break-word",
            }}
          >
            Propylon Legislation Search Tool.
          </div>
          <div
            style={{
              alignSelf: "stretch",
              height: 93,
              paddingLeft: 48,
              paddingRight: 48,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 18,
              display: "flex",
            }}
          >
            <div style={{ justifyContent: "flex-start", alignItems: "flex-start", gap: 9, display: "inline-flex" }}>
              <div
                style={{
                  textAlign: "center",
                  color: "black",
                  fontSize: 18,
                  fontFamily: "Fabric External MDL2 Assets",
                  fontWeight: "400",
                  wordWrap: "break-word",
                }}
              >
                
              </div>
              <div
                style={{
                  color: "#231F20",
                  fontSize: 14,
                  fontFamily: "Segoe UI",
                  fontWeight: "300",
                  wordWrap: "break-word",
                }}
              >
                Bills
              </div>
            </div>
            <div style={{ justifyContent: "flex-start", alignItems: "flex-start", gap: 9, display: "inline-flex" }}>
              <div
                style={{
                  textAlign: "center",
                  color: "black",
                  fontSize: 18,
                  fontFamily: "Fabric External MDL2 Assets",
                  fontWeight: "400",
                  wordWrap: "break-word",
                }}
              >
                
              </div>
              <div
                style={{
                  color: "#231F20",
                  fontSize: 14,
                  fontFamily: "Segoe UI",
                  fontWeight: "300",
                  wordWrap: "break-word",
                }}
              >
                Legislations
              </div>
            </div>
            <div style={{ justifyContent: "flex-start", alignItems: "flex-start", gap: 9, display: "inline-flex" }}>
              <div
                style={{
                  textAlign: "center",
                  color: "black",
                  fontSize: 18,
                  fontFamily: "Fabric External MDL2 Assets",
                  fontWeight: "400",
                  wordWrap: "break-word",
                }}
              >
                
              </div>
              <div
                style={{
                  color: "#231F20",
                  fontSize: 14,
                  fontFamily: "Segoe UI",
                  fontWeight: "300",
                  wordWrap: "break-word",
                }}
              >
                Citations
              </div>
            </div>
          </div>
        </div>
      </div>
      <Button appearance="primary">Documentation</Button>
    </div>
  );
};

export default InstructionPage;
