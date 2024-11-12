import React, { useState, useEffect } from "react";
import { Row, Col, Form } from "react-bootstrap";
import Select from "react-select";
import Editor from "@monaco-editor/react";
import { requestTypeOptions, typeOptions } from "./Utils";
import { useMonaco } from "@monaco-editor/react";

export const Parameter: React.FC<{
  name: string;
  updateFunction: (name: string, value: any, type: any, isGnzContext?: boolean) => void;
  updateRequestType: (type: any) => void;
  customStyles: any;
  valueProp: any;
  typeProp?: any;
  isFullAST: boolean;
  isPrimitive?: any;
  astData?: any;
  paramValue?: any;
  setAstData?: any;
  methodName?: any;
  tabs?: any;
  activeTab: number;
}> = ({
  name,
  updateFunction,
  updateRequestType,
  customStyles,
  valueProp,
  typeProp,
  isFullAST,
  isPrimitive,
  astData,
  paramValue,
  setAstData,
  methodName,
  tabs,
  activeTab,
}) => {
  const [type, setType] = useState<any>(typeProp);
  const [requestType, setRequestType] = useState<any>(
    requestTypeOptions.find((option) => option.value === tabs[activeTab]?.method.requestType) || requestTypeOptions[0],
  );
  const [value, setValue] = useState<any>(
    isFullAST
      ? isPrimitive === "Primitive"
        ? paramValue
        : isPrimitive === "Object"
          ? formatObject(paramValue)
          : JSON.stringify(paramValue)
      : valueProp,
  );
  const [isGnzContext] = useState<boolean>(isGnzContextObject(paramValue));

  useMonaco()?.editor.defineTheme("genezio-dark", {
    base: "vs-dark",
    inherit: true,
    rules: [],
    colors: { "editor.background": "#141332" },
  });

  useEffect(() => {
    updateFunction(name, value, type, isGnzContext);
  }, [isGnzContext, type, value]);

  const handleEditorDidMount = (editor: any, monaco: any) => {
    const container = document.getElementById(`container-${name}`);
    editor.onDidContentSizeChange(() => {
      const contentHeight = Math.min(1000, editor.getContentHeight());
      if (container) {
        container.style.height = `${contentHeight}px`;
        editor.layout();
      }
    });
  };

  function formatObject(obj: any, indent: number = 0): string {
    const indentStr = " ".repeat(indent);
    if (Array.isArray(obj)) {
      const formattedArray = obj.map((item) => formatObject(item, indent + 4)).join(",\n");
      return `[\n${formattedArray}\n${indentStr}]`;
    }
    if (typeof obj !== "object" || obj === null) {
      return JSON.stringify(obj);
    }
    let result = "{\n";
    const keys = Object.keys(obj);
    let gnzContextPresent = false;
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const value = obj[key];
      if (typeof value === "boolean" && key === "isGnzContext") {
        gnzContextPresent = true;
        break;
      }
    }
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const value = obj[key];
      if (typeof value === "boolean" && key === "isGnzContext") {
        continue;
      }
      const formattedValue = typeof value === "object" ? formatObject(value, indent + 4) : JSON.stringify(value);
      result += `${indentStr}    "${key}": ${formattedValue}`;
      if (i < (gnzContextPresent ? keys.length - 2 : keys.length - 1)) {
        result += ",";
      }
      result += "\n";
    }

    result += `${indentStr}}`;
    return result;
  }

  function isFunctionUrl() {
    if (tabs[activeTab]?.method.type === "function" && name === "url") {
      return true;
    }
    return false;
  }

  function isGnzContextObject(paramValue: any): boolean {
    if (isFullAST) {
      if (paramValue && isPrimitive === "Object") return paramValue.isGnzContext;
    } else {
      if (valueProp) return valueProp.isGnzContext;
    }
    return false;
  }

  return (
    <Row>
      <Col lg={2} className="d-flex border-bottom px-4 border-muted">
        <div className="border-start py-3 px-4">{name}</div>
      </Col>
      <Col lg={isFunctionUrl() ? 7 : isFullAST ? 10 : 7} className="pt-2 pb-2 border-bottom border-start border-muted">
        {(isFullAST && type === "Primitive") || (!isFullAST && type.value === "Primitive") ? (
          <Form.Control
            type="text"
            className="form-control"
            placeholder="Value"
            as="input"
            value={value}
            onChange={(v: any) => {
              if (isFullAST) {
                setAstData((prevAstData: any) => {
                  return {
                    ...prevAstData,
                    [methodName]: {
                      ...prevAstData[methodName],
                      [name]: {
                        ...prevAstData[methodName][name],
                        value: v.target.value,
                      },
                    },
                  };
                });
              }

              setValue(v.target.value);
              updateFunction(name, v.target.value, type);
            }}
          />
        ) : (
          <div id={`container-${name}`} style={{ height: "100%" }}>
            <Editor
              defaultLanguage="json"
              defaultValue={
                isFullAST ? (type === "Array" ? "[]" : formatObject(paramValue)) : type.value === "Array" ? "[]" : "{}"
              }
              theme={localStorage.getItem("darkMode") === "true" ? "genezio-dark" : "light"}
              width="100%"
              value={value}
              options={{
                minimap: {
                  enabled: false,
                },
                tabSize: 2,
                scrollBeyondLastLine: false,
                showFoldingControls: "always",
              }}
              onChange={(v: any) => {
                if (isFullAST) {
                  setAstData({
                    ...astData, // Spread the existing state
                    [methodName]: {
                      [name]: { label: name, value: JSON.parse(v) },
                    },
                  });
                }
                setValue(v);
                updateFunction(name, v, type);
              }}
              onMount={(editor, monaco) => handleEditorDidMount(editor, monaco)}
            />
          </div>
        )}
      </Col>

      {!isFullAST && (
        <Col lg={3} className="d-flex align-items-center border-bottom border-start border-muted">
          <div className="SelectBox w-100">
            <Select
              defaultValue={typeOptions[0]}
              onChange={(t) => {
                setType(t);
                updateFunction(name, value, t);
              }}
              options={typeOptions}
              placeholder="Type"
              classNamePrefix="selectform"
              value={type}
              styles={customStyles}
              menuPortalTarget={document.body}
            />
          </div>
        </Col>
      )}
      {isFunctionUrl() && (
        <Col lg={3} className="d-flex align-items-center border-bottom border-start border-muted">
          <div className="SelectBox w-100">
            <Select
              defaultValue={
                requestTypeOptions.find((option) => option.value === tabs[activeTab]?.method.requestType) ||
                requestTypeOptions[0]
              }
              onChange={(t) => {
                setRequestType(t);
                updateRequestType(t.value);
              }}
              options={requestTypeOptions}
              placeholder="Type"
              classNamePrefix="selectform"
              value={requestType}
              styles={customStyles}
              menuPortalTarget={document.body}
            />
          </div>
        </Col>
      )}
    </Row>
  );
};
