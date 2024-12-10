import React, { useEffect, useState, useRef } from "react";
import { Row, Col, Alert, Text } from "../Components";
import { Parameter } from "./Parameter";
import { mapTypeToOptions as mapInputTypeToOptions, typeOption, colourStyles, headersValue } from "./Utils";
import { faker } from "@faker-js/faker";
import { CopyButton } from "./CopyButton";

interface ParametersProps {
  activeTab: number;
  tabs: any;
  updateParam: any;
  classes: any;
  loadingRefresh: boolean;
  url: string;
  isLocalEnviroment: boolean;
  projectName: string;
  updateRequestType: any;
}

export enum AstNodeType {
  StringLiteral = "StringLiteral",
  IntegerLiteral = "IntegerLiteral",
  BooleanLiteral = "BooleanLiteral",
  FloatLiteral = "FloatLiteral",
  NullLiteral = "NullLiteral",
  DoubleLiteral = "DoubleLiteral",
  VoidLiteral = "VoidLiteral",
  AnyLiteral = "AnyLiteral",
  ArrayType = "ArrayType",
  DateType = "DateType",
  MapType = "MapType",
  PromiseType = "PromiseType",
  ConstType = "ConstType",
  NativeType = "NativeType",
  ParamType = "ParamType",
  CustomNodeLiteral = "CustomNodeLiteral",
  Enum = "Enum",
  TypeAlias = "TypeAlias",
  TypeLiteral = "TypeLiteral",
  StructLiteral = "StructLiteral",
  UnionType = "UnionType",
  ParameterDefinition = "ParameterDefinition",
  MethodDefinition = "MethodDefinition",
  ClassDefinition = "ClassDefinition",
  PropertyDefinition = "PropertyDefinition",
}

function setElem(obj: any, path: string, value: any, methodName?: any) {
  var schema = obj; // a moving reference to internal objects within obj
  var pList = path.split(".");
  var len = pList?.length;
  for (var i = 0; i < len - 1; i++) {
    var elem = pList[i];
    if (!schema[elem]) schema[elem] = {};
    schema = schema[elem];
  }

  schema[pList[len - 1]] = value;
}

export const Parameters: React.FC<ParametersProps> = ({
  activeTab,
  tabs,
  updateParam,
  classes,
  loadingRefresh,
  url,
  isLocalEnviroment,
  projectName,
  updateRequestType,
}) => {
  const currentClass = tabs[activeTab];
  const filteredClass = classes?.filter((c: any) => c.name === currentClass?.className)[0];
  const isFullAST = filteredClass?.ast.version === "2" ? true : false;
  const classTypes: any = React.useRef({});

  const [astData, setAstData] = useState<any>({});

  const [run, setRun] = useState(0);

  const isInitialRender = useRef(true);

  useEffect(() => {
    if (filteredClass && run < 1 && isFullAST) {
      formatAST();
    }
  }, [filteredClass]);

  // trigger formatAST logic on sidebar refresh
  useEffect(() => {
    if (isInitialRender.current !== true && loadingRefresh === false) {
      formatAST();
    } else {
      isInitialRender.current = false;
    }
  }, [loadingRefresh]);

  const formatAST = () => {
    const classTypesLocal: any = {};
    // prevent the function to be called multiple times
    setRun(run + 1);
    for (var u = 0; u < classes?.length; u++) {
      const eachClass = classes[u];

      for (var i = 0; i < eachClass.ast?.types?.length; i++) {
        const elem = eachClass.ast?.types[i];
        classTypesLocal[elem.name] = elem;
      }
    }
    classTypes.current = classTypesLocal;
    const mockData: any = {};

    for (var z = 0; z < classes?.length; z++) {
      const eachclass = classes[z];

      for (var x = 0; x < eachclass.ast.methods?.length; x++) {
        const method = eachclass.ast.methods[x];
        const methodData: { [paramName: string]: { value: any; label: string } } = {};
        for (var j = 0; j < method.params?.length; j++) {
          const param: any = method.params[j];
          if (method.type === "function") {
            if (param.name === "headers") {
              methodData["headers"] = {
                value: headersValue,
                label: "headers",
              };
              setElem(mockData, method.name, methodData);
              continue;
            } else if (param.name === "url") {
              methodData["url"] = {
                value: method.cloudUrl ?? url,
                label: "url",
              };
              setElem(mockData, method.name, methodData);
              continue;
            }
          }

          const { value, label } = mapTypeToOptions("", param.name, param.type);
          if (typeof value === "number") {
            methodData[param.name] = { value: value.toString(), label };
          } else {
            methodData[param.name] = { value, label };
          }
        }
        setElem(mockData, method.name, methodData);
      }
    }

    setAstData(mockData);
    return mockData;
  };

  function mapTypeToOptions(acc: string, paramName: string, paramType: any): { value: any; label: string } {
    if (acc !== "") {
      acc = acc + ".";
    }

    // check if param is primitive
    if (isPrimitive(paramType.type as AstNodeType)) {
      if ((paramType.type as AstNodeType) === AstNodeType.BooleanLiteral && paramName === "isGnzContext") {
        return {
          value: true,
          label: acc + paramName,
        };
      }
      return {
        value: mapPrimitiveToValue(paramType.type as AstNodeType),
        label: acc + paramName,
      };
    }

    // check if param is custom type (enum, struct, etc) defined externally
    if (paramType.type === AstNodeType.CustomNodeLiteral) {
      const customElem: any = classTypes.current[paramType.rawValue];
      switch (customElem?.type) {
        case AstNodeType.Enum:
          return {
            value: customElem.cases[0].value,
            label: acc + paramName,
          };
        case AstNodeType.StructLiteral:
          const mockDataLocal: any = {};
          for (var i = 0; i < customElem.typeLiteral.properties?.length; i++) {
            const prop: any = customElem.typeLiteral.properties[i];
            const { value, label } = mapTypeToOptions("", prop.name, prop.type);
            mockDataLocal[label] = value;
          }
          return {
            value: mockDataLocal,
            label: acc + paramName,
          };
        case AstNodeType.TypeAlias:
          return {
            value: mapTypeToOptions(acc, paramName, customElem.aliasType).value,
            label: acc + paramName,
          };
        default:
          return {
            value: "",
            label: "",
          };
      }
    } else if (paramType.type === AstNodeType.UnionType) {
      return {
        value: mapTypeToOptions(acc, paramName, paramType.params[0]).value,
        label: acc + paramName,
      };
    } else if (paramType.type === AstNodeType.TypeLiteral) {
      const mockDataLocal: any = {};
      for (var i = 0; i < paramType.properties?.length; i++) {
        const prop: any = paramType.properties[i];
        const { value, label } = mapTypeToOptions("", prop.name, prop.type);
        mockDataLocal[label] = value;
      }
      return {
        value: mockDataLocal,
        label: acc + paramName,
      };
    } else if (paramType.type === AstNodeType.ArrayType) {
      const { value } = mapTypeToOptions(acc, paramName, paramType.generic);
      return {
        value: [value],
        label: paramName,
      };
    }

    return {
      value: "",
      label: "",
    };
  }

  function isPrimitive(paramType: AstNodeType): boolean {
    const primitives = [
      AstNodeType.StringLiteral,
      AstNodeType.IntegerLiteral,
      AstNodeType.BooleanLiteral,
      AstNodeType.FloatLiteral,
      AstNodeType.NullLiteral,
      AstNodeType.DoubleLiteral,
      AstNodeType.VoidLiteral,
      AstNodeType.AnyLiteral,
      AstNodeType.DateType,
    ];
    return primitives.includes(paramType);
  }

  function mapPrimitiveToValue(paramType: AstNodeType): any {
    switch (paramType) {
      case AstNodeType.StringLiteral:
        return faker.lorem.word();
      case AstNodeType.IntegerLiteral:
        return faker.number.int({ max: 100 });
      case AstNodeType.BooleanLiteral:
        return faker.datatype.boolean();
      case AstNodeType.FloatLiteral:
        return faker.datatype.float({ max: 100 });
      case AstNodeType.NullLiteral:
        return null;
      case AstNodeType.DoubleLiteral:
        return faker.datatype.float({ max: 100 });
      case AstNodeType.VoidLiteral:
        return "void";
      case AstNodeType.DateType:
        return faker.date.anytime();
      case AstNodeType.AnyLiteral:
        return "any";
      default:
        return "";
    }
  }

  const checkParamInputType = (paramValue: any) => {
    let isPrimitive;

    const primitiveTypes = ["string", "number", "boolean"];

    if (primitiveTypes.includes(typeof paramValue) || paramValue === null || paramValue instanceof Date) {
      isPrimitive = "Primitive";
    } else if (Array.isArray(paramValue)) {
      isPrimitive = "Array";
    } else {
      isPrimitive = "Object";
    }

    return {
      value: isPrimitive,
      label: isPrimitive,
    };
  };

  return (
    <>
      <Text as={"h6"} className="mx-4" fontSize="14">
        Parameters
      </Text>
      <div className="mt-4 mb-4 overflow-auto" style={{ padding: "0 15px", height: "75%" }}>
        {tabs[activeTab]?.method?.type === "http" ? (
          <>
            <Alert className="mt-0">
              <Text as={"p"} className="text-muted m-0" fontSize="14">
                <strong>http</strong> methods are disabled on test interface. We recommend calling it from Postman.
              </Text>
            </Alert>

            <div className="d-flex align-items-center mb-2">
              <Text as={"h6"} className="m-0" fontSize="14">
                Test Url:{" "}
                <span className="text-muted">
                  {isLocalEnviroment
                    ? url + "/" + tabs[activeTab].method.name
                    : url.replace(/\/+$/, "") + "/" + tabs[activeTab]?.className + "/" + tabs[activeTab].method.name}
                </span>{" "}
              </Text>
              <CopyButton
                text={
                  isLocalEnviroment
                    ? url + "/" + tabs[activeTab].method.name
                    : url.replace(/\/+$/, "") + "/" + tabs[activeTab]?.className + "/" + tabs[activeTab].method.name
                }
              />
            </div>
          </>
        ) : tabs[activeTab]?.method?.type === "function" ? (
          <>
            <>
              <Alert className="mt-0">
                <Text as={"p"} className="text-muted m-0" fontSize="14">
                  <strong>functions</strong> are disabled on test interface. We recommend calling it from Postman.
                </Text>
              </Alert>

              <div className="d-flex align-items-center mb-2">
                <Text as={"h6"} className="m-0" fontSize="14">
                  Test Url: <span className="text-muted">{tabs[activeTab]?.method.cloudUrl}</span>{" "}
                </Text>
                <CopyButton text={tabs[activeTab]?.method.cloudUrl} />
              </div>
            </>
          </>
        ) : (
          <>
            <Row>
              <Col sm={2} className="border-bottom border-top  px-4">
                <Text as={"div"} className="border-left py-2 px-4" fontSize="14">
                  <Text as={"div"}>Name</Text>
                </Text>
              </Col>
              <Col sm={isFullAST ? 10 : 7} className="pt-2 pb-2 border-bottom border-left border-top">
                <Text as={"div"} fontSize="14">
                  Value
                </Text>
              </Col>
              {!isFullAST && (
                <Col sm={3} className="pt-2 pb-2 border-bottom border-left border-top">
                  <Text as={"div"} fontSize="14">
                    Type
                  </Text>
                </Col>
              )}
            </Row>
            {activeTab !== -1 &&
              tabs[activeTab].method.params &&
              (isFullAST ? astData[tabs[activeTab]?.method?.name] : true) && // we apply this condition only if our project is full AST
              tabs[activeTab].method.params.map((param: any, idx: number) => {
                let paramValue;
                let currentMethodData: any;
                let currentParamData: any;

                if (isFullAST && astData[tabs[activeTab]?.method?.name]) {
                  paramValue = astData[tabs[activeTab].method.name][param.name];
                  currentMethodData = astData[tabs[activeTab].method.name];
                  currentParamData = astData[tabs[activeTab].method.name][param.name];
                }

                const storedParameterValue = localStorage.getItem(projectName)
                  ? JSON.parse(localStorage.getItem(projectName)!)?.tabs[activeTab]?.method?.params[idx]?.value ?? ""
                  : "";

                return (
                  <Parameter
                    isFullAST={isFullAST}
                    setAstData={setAstData}
                    tabs={tabs}
                    activeTab={activeTab}
                    updateRequestType={updateRequestType}
                    astData={astData}
                    methodName={tabs[activeTab]?.method?.name && tabs[activeTab]?.method?.name}
                    name={param.name}
                    paramValue={storedParameterValue ? storedParameterValue : currentParamData?.value}
                    updateFunction={updateParam}
                    key={param.name + tabs[activeTab].method.name}
                    isPrimitive={isFullAST && checkParamInputType(currentParamData?.value).value}
                    valueProp={
                      param.value
                        ? param.type && param.type.value !== "Primitive"
                          ? JSON.stringify(param.value)
                          : param.value
                        : ""
                    }
                    typeProp={
                      // FULL AST
                      isFullAST
                        ? checkParamInputType(currentParamData?.value).value
                        : // OLD AST
                          param.type
                          ? typeof param.type === "string"
                            ? mapInputTypeToOptions(param.type)
                            : param.type
                          : {
                              value: typeOption.Primitive,
                              label: typeOption.Primitive,
                            }
                    }
                  />
                );
              })}
          </>
        )}
      </div>
    </>
  );
};
