import React /*, { useEffect, useRef }*/ from "react";
import { UAParser } from "ua-parser-js";
import { createRoot } from "react-dom/client";
//import { createPortal } from "react-dom";
import {
  Route,
  BrowserRouter,
  Routes,
  useLocation,
  useNavigate,
  useParams
} from "react-router-dom";
//import { CSSTransition, TransitionGroup } from "react-transition-group";
import Frame from "./Frame";
//import Filament from "./ifilament.js";
import "./styles.css";

const ClassHook = () => {
  var parser = new UAParser();
  const name = parser.getBrowser().name;
  const width = name.includes("Safari")
    ? window.screen.availWidth
    : window.innerWidth;
  const height = name.includes("Safari")
    ? window.screen.availHeight
    : window.innerHeight;
  return (
    <Frame
      paths={useParams()}
      l={useLocation()}
      n={useNavigate()}
      {...{
        height,
        lastWidth: width,
        width,
        availableHeight: name
          ? window.screen.availHeight - 20
          : window.innerHeight
      }}
    />
  );
}; // "cannot be called inside a callback" <Hook/>
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route
        //exact
        path="/*"
        //children,render
        element={<ClassHook />} //Initelement
      />
    </Routes>
  </BrowserRouter>
);
