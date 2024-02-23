import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import "./index.scss";
// import awesome font
import "font-awesome/css/font-awesome.min.css";
import TestInterface from "./TestInterface/TestInterface.tsx";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import GenezioSpinner from "./TestInterface/GenezioSpinner.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.Fragment>
    <BrowserRouter>
      <React.Suspense
        fallback={
          <div className="loader-img">
            <GenezioSpinner />
          </div>
        }
      >
        <Routes>
          <Route path={`/test-interface/:projectId`} element={<TestInterface />} />
          <Route path={`/test-interface/:projectId/:envId`} element={<TestInterface />} />
          <Route path="*" element={<Navigate to="/test-interface/local?port=8083" />} />
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  </React.Fragment>,
);
