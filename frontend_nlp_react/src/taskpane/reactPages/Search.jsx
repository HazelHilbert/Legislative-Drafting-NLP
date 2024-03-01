import * as React from "react";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { createRoot } from "react-dom/client";

import SearchPage from "../components/SearchPageComponents/SearchPage";

const Search = () => {
  return (
    <div>
      <SearchPage />
    </div>
  );
};

const searchTitle = "Propylon Legislation Search";
const searchRootElement = document.getElementById("search-root");
const searchRoot = createRoot(searchRootElement);

Office.onReady(() => {
  searchRoot.render(
    <FluentProvider theme={webLightTheme}>
      <Search title={searchTitle} />
    </FluentProvider>
  );
});
