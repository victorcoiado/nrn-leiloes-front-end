import React from "react";
import "./index.css";
import App from "./App";
import { ContextProvider } from "./contexts/ContextProvider";

import { createRoot } from "react-dom/client";
const root = createRoot(document.getElementById("root"));

root.render(
  <ContextProvider>
    <App />
  </ContextProvider>
);
