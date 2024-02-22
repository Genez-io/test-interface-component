import React from "react";

import { Col, Card, Row } from "react-bootstrap";
import GenezioSpinner from "../../components/Utilities/Spinner/GenezioSpinner";
import ClassesSidebar from "./ClassesSidebar";
import Select from "react-select";
import { colourStyles } from "./Utils";

interface LeftCardProps {
  environmentOptions: any;
  environment: any;
  projectId: any;
  classes: any;
  updateMethod: any;
  activeTab: any;
  tabs: any;
  loadingRefresh: any;
  setRefresh: any;
  setEnvironment: any;
}

const LeftCard: React.FC<LeftCardProps> = ({
  environmentOptions,
  environment,
  projectId,
  classes,
  updateMethod,
  activeTab,
  tabs,
  loadingRefresh,
  setRefresh,
  setEnvironment,
}) => {
  return (
    <Col md={12} xl={3} lg={12}>
      <Card style={{ height: "85vh" }}>
        <div className="mx-4 mt-4 mb-4 h-100">
          <Row>
            <Col lg={10}>
              <h5 className="d-inline">My Workspace</h5>
            </Col>
            <Col>
              <div className="text-center i-hover" onClick={setRefresh}>
                <i className="fa fa-undo d-inline"></i>
              </div>
            </Col>
          </Row>
          <hr style={{ borderColor: "black" }}></hr>
          <Row>
            <Col lg={5} className="d-flex align-items-center">
              <h5 className="d-inline pt-2">Environment</h5>
            </Col>
            <Col lg={7}>
              <div className="SelectBox w-100">
                <Select
                  isMulti={false}
                  defaultValue={environmentOptions[0]}
                  onChange={(e) => setEnvironment(e)}
                  options={environmentOptions}
                  placeholder="Type"
                  classNamePrefix="selectform"
                  value={environment}
                  isDisabled={projectId === "local"}
                  styles={colourStyles}
                />
              </div>
            </Col>
          </Row>
          <hr style={{ borderColor: "black" }}></hr>
          <div style={{ height: "68vh", overflow: "auto", bottom: 0, top: 0 }}>
            {loadingRefresh ? (
              <GenezioSpinner />
            ) : (
              <ClassesSidebar
                classes={classes}
                updateMethod={updateMethod}
                className={activeTab !== -1 ? tabs[activeTab].className : ""}
                functionName={activeTab !== -1 ? tabs[activeTab].method.name : ""}
              />
            )}
          </div>
        </div>
      </Card>
    </Col>
  );
};

export default LeftCard;
