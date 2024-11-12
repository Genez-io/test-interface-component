import { StylesConfig } from "react-select";
import axios from "axios";
import { getPresignedURLForProjectCode, getPresignedURLForProjectCodeUpload, Project } from "./ApiAxios";
import { fileTypeFromBlob, FileTypeResult } from "file-type";
import JSZip from "jszip";

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

export function getUTMSignupSource(urlParams: URLSearchParams): string {
  const utmSource = urlParams.get("utm_source");
  const utmMedium = urlParams.get("utm_medium");
  const utmCampaign = urlParams.get("utm_campaign");

  if (!utmSource && !utmMedium && !utmCampaign) {
    return "";
  }

  return [utmSource, utmMedium, utmCampaign].map((e) => (Boolean(e) ? e : "*")).join("/");
}

export function getGoogleClickId(urlParams: URLSearchParams): string {
  return urlParams.get("gclid") || "";
}

export const capitalizeFirstLetter = (word: string) => {
  return word ? word.charAt(0).toUpperCase() + word.slice(1) : "";
};

export function copyToClipboard(
  textToCopy: string,
  btn: string,
  buttonCopyState: string,
  setButtonCopyState: (value: string) => void,
) {
  if (buttonCopyState) {
    return;
  }

  setButtonCopyState(btn);
  navigator.clipboard.writeText(textToCopy);
  setTimeout(() => {
    setButtonCopyState("");
  }, 500);
}

export const defaultReservedEnvNames = ["NODE_OPTIONS"];

export const DEFAULT_STAGE_NAME = "prod";

export const nonBinaryFileExtensions = [
  "txt",
  "json",
  "yaml",
  "yml",
  "js",
  "ts",
  "jsx",
  "tsx",
  "md",
  "html",
  "css",
  "scss",
  "less",
  "graphql",
  "gql",
  "xml",
  "csv",
  "log",
  "env",
  "sh",
  "bash",
  "zsh",
  "fish",
  "ps1",
  "bat",
  "cmd",
  "py",
  "rb",
  "php",
  "java",
  "go",
  "pl",
  "perl",
  "r",
  "lua",
  "swift",
  "kt",
  "kts",
  "kotlin",
  "scala",
  "groovy",
  "rust",
  "rs",
  "cs",
  "csharp",
  "c",
  "h",
  "cpp",
  "hpp",
  "hxx",
  "h++",
  "cc",
  "cxx",
  "c++",
  "m",
  "mm",
  "makefile",
  "mk",
  "make",
  "dockerfile",
  "gradle",
  "properties",
  "ini",
  "conf",
  "toml",
  "lock",
  "gitignore",
  "npmrc",
  "yarnrc",
  "editorconfig",
  "gitattributes",
  "babelrc",
  "eslintrc",
  "prettierrc",
  "stylelintrc",
  "eslintignore",
  "prettierignore",
  "stylelintignore",
  "gitignore",
  "dockerignore",
  "npmignore",
  "yarnignore",
  "jshintrc",
  "flowconfig",
];

const fileNameToNotShowInEditor = ["package-lock.json", "yarn.lock", "pnpm-lock.yaml"];

export async function getEmbedProject(projectName: string, region: string, stage: string) {
  const presignedUrl = await getPresignedURLForProjectCode(projectName, region, stage);

  // download the archive from the presigned URL
  const response = await axios
    .get(presignedUrl, {
      responseType: "blob",
    })
    .catch((error) => {
      console.log(error);
      return null;
    });

  if (!response) {
    return null;
  }

  const blob = response.data;
  const zip = new JSZip();
  await zip.loadAsync(blob);
  const files = zip.files;
  const filesContent: any = {};
  const binaryFilesContent: any = {};
  const isBase64EncodedContent: any = {};

  async function readFilesContent(files: any, prefix: string) {
    if (!files) return;

    for (const file of Object.keys(files)) {
      if (
        file.includes("dist/") ||
        file.includes("build/") ||
        file.includes("node_modules/") ||
        fileNameToNotShowInEditor.includes(file)
      ) {
        continue;
      }

      if (files[file].dir) {
        await readFilesContent(files[file].files, `${prefix}${file}/`);
      } else {
        let isBinaryFile: FileTypeResult | boolean | undefined = false;
        // Check if the file extension is in the list of nonBinaryFileExtensions
        const extension = file.split(".").pop();
        if (extension && extension.length > 0 && !nonBinaryFileExtensions.includes(extension)) {
          isBinaryFile = await fileTypeFromBlob(await files[file].async("blob"));
        }
        if (!isBinaryFile) {
          filesContent[`${prefix}${file}`] = await files[file].async("string");
          isBase64EncodedContent[`${prefix}${file}`] = false;
        } else {
          filesContent[`${prefix}${file}`] = "";
          binaryFilesContent[`${prefix}${file}`] = await files[file].async("base64");
          isBase64EncodedContent[`${prefix}${file}`] = true;
        }
      }
    }
  }

  await readFilesContent(files, "");

  return { files, filesContent, binaryFilesContent, isBase64EncodedContent };
}

export async function uploadProjectFilesToS3(projectName: string, region: string, stage: string, files: any) {
  const zip = new JSZip();
  for (const file of Object.keys(files)) {
    if (files[file].dir) {
      zip.folder(file);
    } else {
      zip.file(file, files[file]);
    }
  }

  const blob = await zip.generateAsync({ type: "blob" });
  const formData = new FormData();
  formData.append("file", blob);

  const urlResponse = await getPresignedURLForProjectCodeUpload(projectName, region, stage);
  const presignedUrl = urlResponse.data.presignedURL;
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open("PUT", presignedUrl);

    xhr.setRequestHeader("Content-Type", "application/octet-stream");
    xhr.setRequestHeader("Content-Length", blob.size.toString());

    // Update progress
    xhr.upload.onprogress = () => {};

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(true);
      } else {
        reject(new Error(`Upload failed with status: ${xhr.status}`));
      }
    };

    xhr.onerror = (e) => {
      reject(e);
    };

    xhr.send(formData);
  });
}

// Helper function to convert pixels to rem
export const pxToRem = (size: string) => {
  const baseSize = 16;
  const numericSize = parseFloat(size);
  return `${numericSize / baseSize}rem`;
};

export const truncateString = (str: string) => {
  if (str.length > 25) {
    return str.substring(0, 25) + "...";
  } else {
    return str;
  }
};

export const capitalizeWord = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const validateEmail = (email: string): boolean => {
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return emailRegex.test(email);
};

export const findDuplicateCollaborators = (projectCollaborators: any, collaborators: any) => {
  const duplicates: any = [];
  collaborators.forEach((collaborator: any) => {
    const isDuplicate = projectCollaborators.some((projCollab: any) => projCollab.email === collaborator.value);
    if (isDuplicate) {
      duplicates?.push(collaborator.value);
    }
  });
  return duplicates;
};

export const createOption = (label: string) => ({
  label,
  value: label,
});

// TODO: replace any
export const formatCollaboratorsValues = (collaborators: any, role: any) => {
  const values = [];

  for (var i = 0; i < collaborators.length; i++) {
    const collaborator = collaborators[i];
    values.push({
      email: collaborator.value,
      role: role,
    });
  }

  return {
    collaborators: values,
  };
};

export function computeProjectUrl(project: Project, envId?: string): string {
  if (envId) {
    return `/project/${project.id}/${envId}/`;
  }

  const primaryEnv = project.projectEnvs.find((env) => env.name === "prod") || project.projectEnvs[0];
  return `/project/${project.id}/${primaryEnv.id}/`;
}

export function handleSearch<T>(elements: T[], searchTerm: string, key: (t: T) => string = (t) => String(t)) {
  if (!searchTerm) return elements;

  return elements.filter((element) => key(element).toLowerCase().includes(searchTerm.toLowerCase()));
}
