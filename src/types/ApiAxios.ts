/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, AxiosResponse } from "axios";

const instance = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL });

instance.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("apiToken");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  config.headers["Content-Type"] = "application/json";
  config.headers["Accept-Version"] = `genezio-webapp/${import.meta.env.VITE_APP_VERSION}`;
  return config;
});

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("apiToken");
      localStorage.removeItem("user");
      window.location.href = "/auth/login";
    }
    return error;
  },
);

export type Status<T = object> = StatusError | StatusOk<T>;

export type StatusOk<T = object> = { status: "ok" } & T;
export type StatusError = {
  status: "error";
  error: {
    code: number;
    message: string;
  };
};

export interface ProjectEnv {
  id: string;
  name: string;
}

export interface Project {
  id: string;
  name: string;
  region: string;
  createdAt: number;
  updatedAt: number;
  cloudProvider: string;
  projectEnvs: ProjectEnv[];
  role: string;
  stack: string[];
}

export const getProjectsForUser = async (index: number, limit: number): Promise<Project[]> => {
  const response: AxiosResponse<StatusOk<{ projects: Project[] }>> = await instance.get(
    `/projects?startIndex=${index}&projectsLimit=${limit}`,
  );

  return response.data.projects;
};

export const getProjectById = async (projectId: string) => await instance.get(`/projects/${projectId}`);

export const deleteProjectById = async (projectId: string) => await instance.delete(`/projects/${projectId}`);

export const deleteStage = async (projectId: string, stage: string) =>
  await instance.delete(`/projects/${projectId}/stages/${stage}`);

export const getClassById = async (classId: string) => await instance.get(`/classes/${classId}`);

export const getAllLogs = async (
  projectId: any,
  envId: any,
  startTime: any,
  endTime: any,
  searchTerm?: string,
  logLevel?: string,
  httpMethod?: string,
  httpStatus?: string,
  url?: string,
  operationId?: string,
  backendIds?: string,
  nextToken?: any,
  limit?: any,
) =>
  await instance.get(`/projects/${projectId}/logs`, {
    params: {
      envId,
      startTime,
      endTime,
      searchTerm,
      logLevel,
      httpMethod,
      httpStatus,
      url,
      operationId,
      backendIds,
      nextToken,
      limit,
    },
  });

export const getLogs = async (
  classId: string,
  startTime: any,
  endTime: any,
  searchTerm?: string,
  nextToken?: any,
  limit?: any,
) =>
  await instance.get(`/classes/${classId}/logs`, {
    params: {
      startTime,
      endTime,
      searchTerm,
      nextToken,
      limit,
    },
  });

export const getFunctionLogs = async (
  classId: string,
  startTime: any,
  endTime: any,
  searchTerm: string,
  logLevel?: string,
  httpMethod?: string,
  httpStatus?: string,
  url?: string,
  operationId?: string,
  instanceId?: string,
  backendIds?: string,
  nextToken?: any,
  limit?: any,
) =>
  await instance.get(`/functions/${classId}/logs`, {
    params: {
      startTime,
      endTime,
      searchTerm,
      logLevel,
      httpMethod,
      httpStatus,
      url,
      operationId,
      instanceId,
      backendIds,
      nextToken,
      limit,
    },
  });

export const changeClassStatus = async (classId: string, status: any, isFunction: any) =>
  await instance.post(`/${isFunction ? "functions" : "classes"}/${classId}/change-status/${status}`);

export const getAccessTokens = async () => await instance.get(`/access-tokens`);

export const deleteAccessToken = async (tokenId: string) => await instance.delete(`/access-tokens/${tokenId}`);

export const createAccessToken = async (name: string) => await instance.post(`/access-tokens`, { tokenName: name });

export const getCheckoutLink = async (subscriptionPlan: string) =>
  await instance.get(`/subscription/get-checkout/${subscriptionPlan}`);

export const getStripeCustomerPortalLink = async () => await instance.get(`/subscription/customer-portal`);

export const cancelStripeSubscription = async () => await instance.post(`/subscription/cancel-subscription`);

export const getUserInformation = async () => await instance.get(`/users/user`);

export const getSubscriptionPlans = async () => await instance.get(`/plans`);

export const getFrontendByProjectId = async (projectId: string, envId: string) =>
  await instance.get(`/frontend/${envId}`);

export const deleteFrontendByDomain = async (domain: string) => await instance.delete(`/frontend/${domain}`);

export const createUserDetails = async (data: object) => await instance.post("/users/details", data);

export const deleteFrontendByCustomDomain = async (domain: string) =>
  await instance.put(`/frontend/remove-custom-domain/${domain}`);

// put frontend/request-custom-domain/{domain} and customDomain in body
export const requestCustomDomain = async (genezioDomain: string, customDomain: string) =>
  await instance.put(`/frontend/request-custom-domain/${genezioDomain}`, {
    customDomain,
  });

export const restartFrontendDomainCron = async (domain: string) =>
  await instance.get(`/frontend/restart-cron-job/${domain}`);

export const deleteSubdomain = async (subdomain: string) => await instance.delete(`/frontend/${subdomain}`);

// Environment Variables
export interface EnvVariable {
  id: string;
  name: string;
  type: string;
  lastAcessedAt: string;
}
export interface EnvVariableGetResponse {
  status: string;
  environmentVariables: EnvVariable[];
}

export const getProjectEnv = async (projectId: string, envId: string) => {
  const envResponse: AxiosResponse<EnvVariableGetResponse> = await instance.get(
    `/projects/${projectId}/${envId}/environment-variables`,
  );
  return envResponse;
};

export const createProjectEnv = async (projectId: string, envId: string, environmentVariables: any) => {
  const envResponse: AxiosResponse<{ status: string }> = await instance.post(
    `/projects/${projectId}/${envId}/environment-variables`,
    {
      environmentVariables,
    },
  );

  return envResponse;
};

export const deleteProjectEnv = async (projectId: string, envId: string, environmentVariableId: any) => {
  return await instance.delete(`/projects/${projectId}/${envId}/environment-variables/${environmentVariableId}`);
};

// Project Integrations
export const getAllIntegrations = async () => await instance.get("/projects/integrations");

export const getProjectIntegrations = async (projectId: string, envId: string) =>
  await instance.get(`/projects/${projectId}/${envId}/integrations`);

export const deactivateIntegration = async (projectId: string, envId: string, integrationName: string) => {
  const data = { integrationName };
  await instance.delete(`/projects/${projectId}/${envId}/integrations`, {
    data,
  });
};

export const connectExternalOAuth = async (DatabaseOauthConnectionUrl: string) => {
  const strWindowFeatures = "toolbar=no, menubar=no, width=600, height=700, top=100, left=100";
  window.open(DatabaseOauthConnectionUrl, strWindowFeatures);
};

export const createUpstashDatabase = async (databaseInfo: any) =>
  await instance.post("/integrations/upstash/databases", { ...databaseInfo });

export const getUpstashDatabases = async () => await instance.get("/integrations/upstash/databases");

export const addProjectIntegration = async (projectId: string, envId: string, payload: any) =>
  await instance.post(`/projects/${projectId}/${envId}/integrations`, payload);

export const getUserRepositories = async (filter = false) =>
  await instance.get(`/github/repositories${filter === true ? "?filter=true" : ""}`);

export const deployNewProjectGithub = async (
  name: string,
  region: string,
  repositoryUrl: string,
  privateRepo: boolean,
  basePath: string,
  envs: any,
  repoName: string,
) =>
  await instance.post("/github/repository", {
    name,
    region,
    repositoryUrl,
    private: privateRepo,
    basePath,
    envs,
    repositoryName: repoName,
  });

export const getRepositoryDetails = async (repoId: number, basePath: string) =>
  await instance.get(`/github/repositories/${repoId}?basePath=${basePath}`);
export const getRepositoryDetailsByUrl = async (repoUrl: string, basePath: string) =>
  await instance.get(`/github/repositories/details?url=${repoUrl}&basePath=${basePath}`);

export const getRepositoryTree = async (repoId: number) => await instance.get(`/github/repositories/${repoId}/tree`);

export const linkRepository = async (
  framework: string,
  repositoryId: number,
  basePath: string,
  projectConfiguration: any,
  envs: any,
) =>
  await instance.post(`/github/link-repository`, {
    framework,
    repositoryId,
    basePath,
    projectConfiguration,
    envs,
  });

export const getLinkedRepositories = async (projectId: any) =>
  await instance.get(`/projects/${projectId}/repositories`);

export const deleteLinkedRepository = async (repoId: string) => await instance.delete(`/github/repositories/${repoId}`);

export const getJobId = async (repoId: string) => await instance.get(`/github/checks/${repoId}`);

export const connectUserToGithub = async (codeId?: string, installationId?: string) =>
  await instance.get(`/integrations/github/callback?code=${codeId}&installation_id=${installationId}`);

export const getTemplates = async () => await instance.get("/github/templates");

export const createProject = async (projectDetails: any) =>
  await instance.post("/github/create-project", projectDetails);

export const checkIntegrationUser = async (integrationName: string) =>
  await instance.get(`/integrations/${integrationName}`);

export const disconnectIntegration = async (integrationName: string) =>
  await instance.delete(`/integrations/${integrationName}`);

export const createNeonProject = async (projectData: any) =>
  await instance.post("/integrations/neon/projects", projectData);

export const getNeonProjects = async () => await instance.get("/integrations/neon/projects");

export const getNeonProjectDetails = async (projectId: string) =>
  await instance.get(`/integrations/neon/projects/${projectId}`);

export const oauthRedirect = async (integrationName: string, params: string) =>
  (await instance.get(`/integrations/${integrationName}/callback?${params}`)).data.status;

export const getIntegrationEnvironmentVariablesList = (projectId: string, envId: string, integrationName: string) =>
  instance.get(`/projects/${projectId}/${envId}/integrations/${integrationName}`);

export const getProjectDetailsByName = async (projectName: string, region: string) =>
  await instance.get(`/projects/name/${projectName}?region=${region}`);

export const getProjectSubdomains = async (projectId: string, envId: string) =>
  await instance.get(`/frontend/${projectId}/${envId}`);

export const getDeployStatus = async (owner: string, repo: string) =>
  await instance.get(`/github/${owner}/${repo}/actions`);

export const getCollaborationRoles = async () => instance.get("/collaboration/roles");

export const getCollaborators = async (projectId: string) => instance.get(`/collaboration/project/${projectId}`);

export const addCollaborators = async (projectId: string, collaborators: any) =>
  instance.post(`/collaboration/${projectId}`, { ...collaborators });

export const removeCollaborator = async (requestId: string) => instance.delete(`/collaboration/${requestId}`);

export const getInvitationDetails = async (requestId: string) => await instance.get(`/collaboration/${requestId}`);

export const acceptCollaborationInvitation = async (requestId: string, payload: boolean) =>
  await instance.put(`/collaboration/${requestId}`, { accepted: payload });

export const getCurrentCollaboratorDetails = async (projectId: string) =>
  await instance.get(`/collaboration/role/${projectId}`);

export const updateCollaboratorRole = async (reuqestId: string, roleId: string) =>
  await instance.put(`/collaboration/role/${reuqestId}`, { role: roleId });

// Auth
export const getAuthProviders = async (envId: string) => await instance.get(`/core/auth/providers/${envId}`);

export const enableAuthProvider = async (envId: string, data: any) =>
  await instance.put(`/core/auth/providers/${envId}`, { ...data });

export const getAuth = async (envId: string) => await instance.get(`/core/auth/${envId}`);

export const activateAuth = async (envId: string, data: any) => await instance.put(`/core/auth/${envId}`, { ...data });

export const updateEmailTemplates = async (envId: string, data: any) =>
  await instance.put(`/core/auth/email-templates/${envId}`, { ...data });

export const getAuthEmailTemplate = async (envId: string) => await instance.get(`/core/auth/email-templates/${envId}`);

// DATABASES

export interface Database {
  id: string;
  name: string;
  region: string;
  type: "postgres-neon" | "mongo-atlas";
}

export const getAllDatabases = async (): Promise<Database[]> => {
  const response: AxiosResponse<StatusOk<{ databases: Database[] }>> = await instance.get("/databases");

  return response.data.databases;
};

export const getDatabaseConnectionURL = async (databaseId: string) => await instance.get(`/databases/${databaseId}`);

export const deleteDatabase = async (databaseId: string) => await instance.delete(`/databases/${databaseId}`);

export const createDatabase = async (databaseInfo: { name: string; type: string; region: string }) => {
  if (databaseInfo.type === "postgres-neon") {
    databaseInfo.region = `aws-${databaseInfo.region}`;
  }

  await instance.post("/databases", databaseInfo);
};

export const resetDatabasePassword = async (databaseId: string) =>
  await instance.post(`/databases/${databaseId}/reset-password`);

export const getLinkedDatabases = async (projectId: string, envId: string) =>
  await instance.get(`/projects/${projectId}/${envId}/databases`);

export const linkDatabaseToProject = async (projectId: string, envId: string, databaseId: string) =>
  await instance.post(`/projects/${projectId}/${envId}/databases/${databaseId}`, {});

export const unlinkDatabaseFromProject = async (projectId: string, envId: string, databaseId: string) =>
  await instance.delete(`/projects/${projectId}/${envId}/databases/${databaseId}`);

export const getPresignedURLForProjectCode = async (projectName: string, region: string, stage: string) => {
  const token = localStorage.getItem("apiToken") || "";

  const response = await axios({
    method: "POST",
    url: `${import.meta.env.VITE_API_BASE_URL}/core/get-project-code-url`,
    data: {
      projectName: projectName,
      region: region,
      stage: stage,
    },
    headers: {
      Authorization: `Bearer ${token}`,
      "Accept-Version": `genezio-webapp/${import.meta.env.VITE_VERSION}`,
    },
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
  });

  return response.data.presignedURL;
};

export const getPresignedURLForProjectCodeUpload = async (projectName: string, region: string, stage: string) =>
  await instance.post("/core/create-project-code-url", { projectName, region, stage });

export const getAllDeployments = async (envId: string) => await instance.get(`/core/deployments/${envId}`);

export const getDeploymentDetails = async (deploymentId: string) =>
  await instance.get(`/core/deployment/${deploymentId}`);

export const deployUsingBuildMachine = async (projectEnvID: string) =>
  await instance.post("/core/deployment/build-machine", { projectEnvID });

export const getAllMetrics = async (startTime: any, endTime: any, projectId: string) =>
  await instance.get("/metrics", {
    params: {
      startTime,
      endTime,
      projectId,
    },
  });

export const commitUsingBuildMachine = async (projectEnvID: string, commitMessage: string) =>
  await instance.post("/github/commit", { projectEnvID, commitMessage });
