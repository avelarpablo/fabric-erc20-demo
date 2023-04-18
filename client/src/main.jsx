import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ThemeProvider } from "@mui/material";
import { globalTheme } from "./themes/globalTheme";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={globalTheme}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </ThemeProvider>
);
