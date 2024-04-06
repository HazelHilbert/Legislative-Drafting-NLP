import * as React from "react";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { createRoot } from "react-dom/client";
import "../css/Search.css";
import SearchPage from "../components/SearchPageComponents/SearchPage";
var Search = function Search() {
  return /*#__PURE__*/React.createElement(FluentProvider, {
    theme: webLightTheme
  }, /*#__PURE__*/React.createElement("div", {
    className: "background globalStyles"
  }, /*#__PURE__*/React.createElement(SearchPage, null)));
};
var searchTitle = "Propylon Legislation Search";
var searchRootElement = document.getElementById("search-root");
var searchRoot = createRoot(searchRootElement);
Office.onReady(function () {
  searchRoot.render( /*#__PURE__*/React.createElement(FluentProvider, {
    theme: webLightTheme
  }, /*#__PURE__*/React.createElement(Search, {
    title: searchTitle
  })));
});