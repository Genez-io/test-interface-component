import React from "react";

import { ClassesSidebar } from "./ClassesSidebar";
import Select from "react-select";
import { colourStyles } from "./Utils";
import { Card, Col, Row, Text } from "../Components";
import { Icon } from "@iconify/react";
import Skeleton from "react-loading-skeleton";
import { useTheme } from "styled-components";

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

export const LeftCard: React.FC<LeftCardProps> = ({
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
  const theme = useTheme();
  return (
    <Col xl={3} md={12}>
      <Card style={{ height: "85vh", overflow: "hidden" }}>
        <div className="mx-4 mt-4 mb-4 h-100">
          <Row>
            <Col xs={10}>
              <Text as={"h5"} className="d-inline">
                My Workspace
              </Text>
            </Col>
            <Col xs={1} style={{ marginLeft: "auto" }} className="p-0">
              <div className="text-center i-hover" onClick={setRefresh}>
                <Icon icon="fa:undo" className="d-inline" style={{ color: theme.colors.white }} />
              </div>
            </Col>
          </Row>
          <hr style={{ borderColor: "black" }}></hr>
          <Row>
            <Col xs={5} className="d-flex align-items-center">
              <Text as={"h5"} className="d-inline pt-2">
                Environment
              </Text>
            </Col>
            <Col xs={7}>
              <div className="w-100" style={{ padding: "5px 8px" }}>
                <Select
                  isMulti={false}
                  defaultValue={environmentOptions[0]}
                  onChange={(e) => setEnvironment(e)}
                  options={environmentOptions}
                  placeholder="Type"
                  classNamePrefix="selectform"
                  value={environment}
                  isDisabled={projectId === "local"}
                  styles={colourStyles(theme)}
                />
              </div>
            </Col>
          </Row>
          <hr style={{ borderColor: "black" }}></hr>
          <div style={{ height: "68vh", overflow: "auto", bottom: 0, top: 0, marginLeft: "-1.5rem" }}>
            {loadingRefresh ? (
              <Col>
                <Skeleton count={6} className="w-85 mx-4 my-3" height={"30px"} />
              </Col>
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
