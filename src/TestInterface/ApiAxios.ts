import axios from "axios";

// const instance = axios.create({ baseURL: process.env.REACT_APP_API_BASE_URL });
const instance = axios.create({ baseURL: "https://dev.api.genez.io" });

instance.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("apiToken");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  config.headers["Content-Type"] = "application/json";
  config.headers["Accept-Version"] = `genezio-webapp/${"$npm_package_version"}`;
  return config;
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("apiToken");
      localStorage.removeItem("user");
      window.location.href = "/auth/login";
    }
    return error;
  },
);

export const getProjectsForUser = async (index: number, limit: number) =>
  await instance.get(`/projects?startIndex=${index}&projectsLimit=${limit}`);

export const getProjectById = async (projectId: string) => await instance.get(`/projects/${projectId}`);

export const deleteProjectById = async (projectId: string) => await instance.delete(`/projects/${projectId}`);

export const getClassById = async (classId: string) => await instance.get(`/classes/${classId}`);

export const getProjectRepositories = async (projectId: string) => await instance.get(`/github/${projectId}`);

export const getLogs = async (classId: string, startTime: any, endTime: any, searchTerm: string, nextToken?: any) =>
  await instance.get(`/classes/${classId}/logs`, {
    params: { startTime, endTime, searchTerm, nextToken },
  });

export const changeClassStatus = async (classId: string, status: any) =>
  await instance.post(`/classes/${classId}/change-status/${status}`);

export const getAccessTokens = async () => await instance.get(`/access-tokens`);

export const deleteAccessToken = async (tokenId: string) => await instance.delete(`/access-tokens/${tokenId}`);

export const createAccessToken = async (name: string) => await instance.post(`/access-tokens`, { tokenName: name });

export const getStripeSubscriptionLink = async (subscriptionPlan: string) =>
  await instance.get(`/subscription/get-checkout/${subscriptionPlan}`);

export const getStripeCustomerPortalLink = async () => await instance.get(`/subscription/customer-portal`);

export const cancelStripeSubscription = async () => await instance.post(`/subscription/cancel-subscription`);

export const getUserInformation = async () => await instance.get(`/users/user`);

export const getSubscriptionPlans = async () => await instance.get(`/plans`);

export const getFrontendByProjectId = async (projectId: string, envId: string) =>
  await instance.get(`/frontend/${projectId}/${envId}`);

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

// Environment Variables
export const getProjectEnv = async (projectId: string, envId: string) =>
  await instance.get(`/projects/${projectId}/${envId}/environment-variables`);

export const createProjectEnv = async (projectId: string, envId: string, environmentVariables: any) =>
  await instance.post(`/projects/${projectId}/${envId}/environment-variables`, {
    environmentVariables,
  });

export const deleteProjectEnv = async (projectId: string, envId: string, environmentVariableId: any) => {
  await instance.delete(`/projects/${projectId}/${envId}/environment-variables/${environmentVariableId}`);
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

export const addProjectIntegration = async (projectId: string, envId: string, payload: any) => {
  await instance.post(`/projects/${projectId}/${envId}/integrations`, payload);
};

export const getUserRepositories = async () => await instance.get("/github/repositories");

export const connectUserToGithub = async (installationId?: string) =>
  await instance.get(`/integrations/github/callback?code=${installationId}`);

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

export const getAllDatabases = async () => await instance.get("/databases");

export const getDatabaseConnectionURL = async (databaseId: string) => await instance.get(`/databases/${databaseId}`);

export const deleteDatabase = async (databaseId: string) => await instance.delete(`/databases/${databaseId}`);

export const createDatabase = async (databaseInfo: any) => await instance.post("/databases", { ...databaseInfo });

export const resetDatabasePassword = async (databaseId: string) =>
  await instance.post(`/databases/${databaseId}/reset-password`);

export const getLinkedDatabases = async (projectId: string, envId: string) =>
  await instance.get(`/projects/${projectId}/${envId}/databases`);

export const linkDatabaseToProject = async (projectId: string, envId: string, databaseId: string) =>
  await instance.post(`/projects/${projectId}/${envId}/databases/${databaseId}`, {});

export const unlinkDatabaseFromProject = async (projectId: string, envId: string, databaseId: string) =>
  await instance.delete(`/projects/${projectId}/${envId}/databases/${databaseId}`);
