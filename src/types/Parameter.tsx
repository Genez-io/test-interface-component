import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Text, Select } from "../Components";
import Editor from "@monaco-editor/react";
import { colourStyles, requestTypeOptions, typeOptions } from "./Utils";
import { useMonaco } from "@monaco-editor/react";
import { useTheme } from "styled-components";
import { Option } from "src/Components/Select";
import { editor } from "monaco-editor";

export const Parameter: React.FC<{
  name: string;
  updateFunction: (name: string, value: any, type: any, isGnzContext?: boolean) => void;
  updateRequestType: (type: any) => void;
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
  const theme = useTheme();
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

  const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor, monaco: any) => {
    const container = document.getElementById(`container-${name}`);
    editor.onDidContentSizeChange(() => {
      const contentHeight = editor.getContentHeight();
      if (container) {
        container.style.height = `${contentHeight}px`;
        editor.layout();
      }
      const numberOfLines = contentHeight / 19;
      editor.updateOptions({
        lineNumbersMinChars: Math.max(Math.floor(Math.log10(numberOfLines)) + 2, 2),
      });
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
      <Col sm={2} className="d-flex border-bottom px-4 w-100">
        <Text as={"div"} className="border-left py-3 px-4 w-100" fontSize="14" style={{ wordWrap: "break-word" }}>
          {name}
        </Text>
      </Col>
      <Col sm={isFunctionUrl() ? 7 : isFullAST ? 10 : 7} className="pt-2 pb-2 border-bottom border-left w-100">
        {(isFullAST && type === "Primitive") || (!isFullAST && type.value === "Primitive") ? (
          <input
            type="text"
            className="form-control"
            placeholder="Value"
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
              theme={theme.name === "dark" ? "genezio-dark" : "light"}
              width="100%"
              value={value}
              options={{
                minimap: {
                  enabled: false,
                },
                tabSize: 2,
                scrollBeyondLastLine: false,
                showFoldingControls: "always",
                scrollbar: {
                  alwaysConsumeMouseWheel: false,
                },
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
        <Col lg={3} className="d-flex align-items-center border-bottom border-left">
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
              menuPortalTarget={document.body}
            />
          </div>
        </Col>
      )}
      {isFunctionUrl() && (
        <Col lg={3} className="d-flex align-items-center border-bottom border-left">
          <div className="SelectBox w-100">
            <Select
              defaultValue={
                requestTypeOptions.find((option) => option.value === tabs[activeTab]?.method.requestType) ||
                requestTypeOptions[0]
              }
              onChange={(t) => {
                setRequestType(t);
                updateRequestType((t as Option).value);
              }}
              options={requestTypeOptions}
              placeholder="Type"
              classNamePrefix="selectform"
              value={requestType}
              menuPortalTarget={document.body}
            />
          </div>
        </Col>
      )}
    </Row>
  );
};
