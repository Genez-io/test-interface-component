import { StylesConfig } from "react-select";

export enum typeOption {
  Primitive = "Primitive",
  Object = "Object",
  Array = "Array",
}

export const primitiveTypes: readonly string[] = [
  "IntegerLiteral",
  "FloatLiteral",
  "DoubleLiteral",
  "StringLiteral",
  "BooleanLiteral",
  "AnyLiteral",
];

export type dropdownOption = {
  value: string;
  label?: string;
};

export const environmentOptions: dropdownOption[] = [
  {
    value: "Production",
  },
  {
    value: "Local",
    label: "Local",
  },
];

export const typeOptions: readonly dropdownOption[] = [
  {
    value: "Primitive",
    label: "Primitive",
  },
  {
    value: "Object",
    label: "Object",
  },
  {
    value: "Array",
    label: "Array",
  },
];

export const requestTypeOptions: readonly dropdownOption[] = [
  {
    value: "GET",
    label: "GET",
  },
  {
    value: "POST",
    label: "POST",
  },
  {
    value: "PUT",
    label: "PUT",
  },
  {
    value: "DELETE",
    label: "DELETE",
  },
];

export interface Param {
  name: string;
  type: string | dropdownOption;
  value?: any;
  isGnzContext?: boolean;
}

export interface Method {
  id?: string;
  cloudUrl?: string;
  requestType?: string;
  name: string;
  type: string;
  params: Param[];
}

export interface ClassType {
  name: string;
  id: string;
  cloudUrl: string;
  ast: {
    methods: Method[];
  };
}

export interface Project {
  name: string;
  region: string;
}

export interface TabType {
  tab: string;
  className: string;
  method: Method;
  response: string;
  time: number;
  status: number;
}

export const isJsonString = (s: string) => {
  try {
    JSON.parse(s);
  } catch (e) {
    return false;
  }
  if (!(s.at(0) === "{" || s.at(0) === "[") || !(s.at(-1) === "}" || s.at(-1) === "]")) return false;
  return true;
};

export const colourStyles: StylesConfig<dropdownOption> = {
  control: (styles) => ({ ...styles, backgroundColor: "white" }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isDisabled ? undefined : isSelected ? "#8F6ECD" : isFocused ? "#E8E1F2" : undefined,
      cursor: isDisabled ? "not-allowed" : "default",

      ":active": {
        ...styles[":active"],
        backgroundColor: !isDisabled ? (isSelected ? "#8F6ECD" : "white") : undefined,
      },
    };
  },
  input: (styles) => ({ ...styles }),
  placeholder: (styles) => ({ ...styles }),
  singleValue: (styles, { data }) => ({ ...styles }),
  menuPortal: (styles) => ({ ...styles, zIndex: 9999 }),
};

export const serverlessFunctionsTypes = [
  {
    name: "Headers",
    type: "StructLiteral",
    path: ".Functions/Headers",
    typeLiteral: {
      type: "TypeLiteral",
      properties: [
        {
          name: "content-type",
          optional: false,
          type: {
            type: "StringLiteral",
          },
        },
        {
          name: "connection",
          optional: false,
          type: {
            type: "StringLiteral",
          },
        },
      ],
    },
  },
  {
    name: "Body",
    type: "StructLiteral",
    path: ".Functions/Body",
    typeLiteral: {
      type: "TypeLiteral",
      properties: [
        {
          name: "text",
          optional: false,
          type: {
            type: "StringLiteral",
          },
        },
      ],
    },
  },
];

export const headersValue = {
  "content-type": "application/json",
  connection: "keep-alive",
};

export const mapTypeToOptions = (type: string): dropdownOption => {
  if (!type) {
    return { value: typeOption.Primitive, label: typeOption.Primitive };
  }
  try {
    const jsonType = JSON.parse(type);
    if (jsonType.type) {
      if (primitiveTypes.includes(jsonType.type.trim())) {
        return { value: typeOption.Primitive, label: typeOption.Primitive };
      }
      if (jsonType.type === "ArrayType") {
        return { value: typeOption.Array, label: typeOption.Array };
      }
    }
  } catch (e) {
    return { value: typeOption.Primitive, label: typeOption.Primitive };
  }
  return { value: typeOption.Object, label: typeOption.Object };
};

export const syncTabs = (storageTabs: TabType[], classes: ClassType[], project: any, activeTab: number) => {
  storageTabs.forEach((tab: TabType) => {
    const classItem = classes.find((x: ClassType) => x.name === tab.className);
    if (classItem) {
      const method = classItem.ast.methods.find((x: Method) => x.name === tab.method.name);
      if (method) {
        // check for added params in method
        for (let param of method.params) {
          if (!tab.method.params.find((x: Param) => x.name === param.name)) {
            tab.method.params.push({
              name: param.name,
              type: param.type,
              value: "",
            });
          }
        }
        // check for removed params in method
        for (let param of tab.method.params) {
          if (!method.params.find((x: Param) => x.name === param.name)) {
            tab.method.params.splice(tab.method.params.indexOf(param), 1);
          }
        }
        // sort params to match function prototype
        tab.method.params.sort((a: Param, b: Param) => {
          return (
            method.params.findIndex((x: Param) => x.name === a.name) -
            method.params.findIndex((x: Param) => x.name === b.name)
          );
        });
      }
    }
  });
  localStorage.setItem(project.name, JSON.stringify({ activeTab, tabs: storageTabs }));
};
