import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import style from "./utils/globalStyle";

const GlobalStyle = createGlobalStyle`${style}`;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider
        theme={{
          breakpoints: {
            smUp: `@media (min-width: 576px)`,
            smDown: `@media (max-width: 576px)`,
            mdUp: `@media (min-width: 768px)`,
            mdDown: `@media (max-width: 768px)`,
            lgUp: `@media (min-width: 992px)`,
            lgDown: `@media (max-width: 992px)`,
            xlUp: `@media (min-width: 1200px)`,
            xlDown: `@media (max-width: 1200px)`,
          },
        }}
      >
        <GlobalStyle />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
