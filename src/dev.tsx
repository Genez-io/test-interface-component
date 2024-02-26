import React from "react";
import ReactDOM from "react-dom/client";
import App from "./main";
import { getProjectById, getLogs, getCurrentCollaboratorDetails } from "./TestInterface/ApiAxios";
import Parameters from "./TestInterface/Parameters";
import StatusBar from "./TestInterface/StatusBar";
import GenezioSpinner from "./TestInterface/GenezioSpinner";
import TestInterfaceModal from "./TestInterface/TestInterfaceModal";
import { environmentOptions, isJsonString } from "./TestInterface/Utils";
import LeftCard from "./TestInterface/LeftCard";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

const props = {
  axios: {
    getProjectById: getProjectById,
    getLogs: getLogs,
    getCurrentCollaboratorDetails: getCurrentCollaboratorDetails,
  },
  statusBar: StatusBar,
  genezioSpinner: GenezioSpinner,
  testInterfaceModal: TestInterfaceModal,
  environmentOptions: environmentOptions,
  isJsonString: isJsonString,
  leftCard: LeftCard,
  parameters: Parameters,
};

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

// console.log("before render");
root.render(
  <App
    axios={props.axios}
    statusBar={props.statusBar}
    genezioSpinner={props.genezioSpinner}
    testInterfaceModal={props.testInterfaceModal}
    environmentOptions={props.environmentOptions}
    isJsonString={props.isJsonString}
    leftCard={props.leftCard}
    parameters={props.parameters}
  />,
  //   <BrowserRouter>
  //     {/* <React.Suspense
  //       fallback={
  //         <div className="loader-img">
  //           <GenezioSpinner />
  //           <div></div>
  //         </div>
  //       }
  //     > */}
  //     <Routes>
  //       <Route
  //         path="/test-interface/"
  //         element={
  //           <App
  //             axios={props.axios}
  //             statusBar={props.statusBar}
  //             genezioSpinner={props.genezioSpinner}
  //             testInterfaceModal={props.testInterfaceModal}
  //             environmentOptions={props.environmentOptions}
  //             isJsonString={props.isJsonString}
  //             leftCard={props.leftCard}
  //             parameters={props.parameters}
  //           />
  //         }
  //       />
  //       <Route path="*" element={<Navigate to="/test-interface/" />} />
  //     </Routes>
  //   </BrowserRouter>,
);
