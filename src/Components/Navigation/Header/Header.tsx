import GenezioLogo from "../../GenezioLogo";
import styled from "styled-components";
import { Button, NavLink, Select } from "../../index";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FolderIcon } from "../../../assets/icons/folder";
import { SupportIcon } from "../../../assets/icons/support";
import ProjectNav from "./ProjectNav";
import { BackArrowIcon } from "../../../assets/icons/backArrow";
import Skeleton from "react-loading-skeleton";
import { useEffect, useState } from "react";
import { getProjectsForUser, Project, ProjectEnv } from "../../../types/ApiAxios";
import { computeProjectUrl } from "../../../types/Utils";

const HeaderWrapper = styled.header`
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: ${({ theme }) => theme.background};

  /* Light theme shadow */
  ${({ theme }) =>
    theme.background === "#FFFFFF" &&
    `
    box-shadow: 0 4px 8px rgba(217, 217, 217, 0.05),
                0 4px 16px rgba(115, 115, 115, 0.1);
  `}

  /* Dark theme shadow */
  ${({ theme }) =>
    theme.background === "#111111" &&
    `
    box-shadow: 0 1px 8px rgba(217, 217, 217, 0.05),
                0 0.5px 16px rgba(115, 115, 115, 0.06);
  `}
`;

const TopHeader = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey700};
  padding: 18px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProfilePhoto = styled.div`
  color: ${({ theme }) => theme.color};
  border: 1px solid ${({ theme }) => theme.colors.grey700};
  border-radius: 100%;
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledProjectSelector = styled.div`
  min-width: 300px;
`;

function ProjectSelector({ projectId, envId }: { projectId: string; envId: string }) {
  const navigate = useNavigate();

  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [currentEnv, setCurrentEnv] = useState<ProjectEnv | null>(null);

  useEffect(() => {
    getProjectsForUser(0, 10000).then((projects) => {
      setProjects(projects);

      const currentProject = projects.find((project) => project.id === projectId);
      setCurrentProject(currentProject || null);
      setCurrentEnv(currentProject?.projectEnvs.find((env) => env.id === envId) || null);

      setIsLoading(false);
    });
  }, [projectId, envId]);

  return (
    <StyledProjectSelector className="d-flex align-items-center">
      <Select
        variant="grey700"
        options={projects.map((project) => ({ label: project.name, value: project.id }))}
        isDisabled={isLoading}
        isSearchable
        key={currentProject?.id}
        defaultValue={{
          value: currentProject?.id || "",
          label: isLoading ? <Skeleton /> : currentProject?.name || "Project",
        }}
        onChange={(selection) => {
          const project = projects.find((project) => project.id === selection?.value);
          navigate(computeProjectUrl(project!));
        }}
      />
      <Select
        options={currentProject?.projectEnvs.map((env) => ({ label: env.name, value: env.id })) || []}
        isDisabled={isLoading}
        key={currentEnv?.id}
        isSearchable
        defaultValue={{
          value: currentEnv?.id || "",
          label: isLoading ? <Skeleton /> : currentEnv?.name || "Env",
        }}
        onChange={(selection) => {
          navigate(computeProjectUrl(currentProject!, selection?.value));
        }}
      />
    </StyledProjectSelector>
  );
}

const Header = () => {
  const { projectId, envId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const checkIsActive = (path: string) => location.pathname === path;

  let navigation;
  if (projectId && envId) {
    navigation = (
      <>
        <div className="d-flex align-items-center">
          <NavLink isActive={false} to={"/dashboard"}>
            <GenezioLogo style={{ width: "41px" }} className="mr-5" />
          </NavLink>

          <Button variant="grey500" onClick={() => navigate("/dashboard")} icon={<BackArrowIcon />} />
        </div>

        <ProjectSelector projectId={projectId} envId={envId} />
      </>
    );
  } else {
    navigation = (
      <div className="d-flex align-items-center">
        <NavLink isActive={false} to={"/dashboard"}>
          <GenezioLogo style={{ width: "41px" }} className="mr-5" />
        </NavLink>

        <NavLink isActive={checkIsActive("/dashboard")} to={"/dashboard"}>
          All Projects
        </NavLink>
        <NavLink isActive={checkIsActive("/databases")} to={"/databases"} className="ml-4">
          Databases
        </NavLink>
        <NavLink isActive={checkIsActive("/billing")} to={"/billing"} className="ml-4">
          Billing
        </NavLink>
      </div>
    );
  }

  return (
    <HeaderWrapper>
      <TopHeader>
        {navigation}

        <div className="d-flex align-items-center">
          <NavLink
            isActive={false}
            grey={true}
            to={"https://discord.gg/uc9H5YKjXv"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <SupportIcon />
            Support
          </NavLink>

          <NavLink isActive={false} grey={true} to={"https://genezio.com/docs/"} className="mx-4">
            <FolderIcon />
            Docs
          </NavLink>
          <ProfilePhoto>T</ProfilePhoto>
        </div>
      </TopHeader>

      {projectId && envId ? <ProjectNav /> : null}
    </HeaderWrapper>
  );
};

export default Header;
