import { StrictMode } from "react";
import ReactDOM from "react-dom";
import './index.css';
import App from "./App";
//import { MobileView, BrowserView } from "react-mobile-detect"

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);
/*
<MobileView>
<App />
</MobileView>
<BrowserView>
<App />
</BrowserView>
*/