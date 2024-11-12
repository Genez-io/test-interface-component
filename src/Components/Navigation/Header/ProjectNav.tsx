import { matchPath, useLocation, useParams } from "react-router-dom";
import { NavLink } from "../..";
import styled from "styled-components";

export default function ProjectNav() {
  const { projectId, envId } = useParams();
  const location = useLocation();
  const checkIsActive = (path: string) => {
    return matchPath({ path, caseSensitive: false }, location.pathname) !== null;
  };

  const StyledWrapper = styled.div`
    display: flex;
    justify-content: space-evenly;
  `;

  return (
    <StyledWrapper className="mx-5 px-5 py-2">
      <NavLink to={`/project/${projectId}/${envId}`} isActive={checkIsActive("/project/:projectId/:envId")}>
        Overview
      </NavLink>
      <NavLink to={`/edit-code/${projectId}/${envId}`} isActive={checkIsActive("/edit-code/:projectId/:envId")}>
        Edit Code
      </NavLink>
      <NavLink to={`/collaboration/${projectId}/${envId}`} isActive={checkIsActive("/collaboration/:projectId/:envId")}>
        Collaboration
      </NavLink>
      <NavLink
        to={`/project/${projectId}/${envId}/frontend`}
        isActive={checkIsActive("/project/:projectId/:envId/frontend")}
      >
        Domains
      </NavLink>
      <NavLink to={`/project/${projectId}/${envId}/logs`} isActive={checkIsActive("/project/:projectId/:envId/logs")}>
        Logs
      </NavLink>
      <NavLink
        to={`/test-interface/${projectId}/${envId}`}
        isActive={checkIsActive("/test-interface/:projectId/:envId")}
      >
        Test Interface
      </NavLink>
      <NavLink
        to={`/project/${projectId}/${envId}/environment-variables`}
        isActive={checkIsActive("/project/:projectId/:envId/environment-variables")}
      >
        Environment Variables
      </NavLink>
      <NavLink
        to={`/project/${projectId}/${envId}/integrations`}
        isActive={checkIsActive("/project/:projectId/:envId/integrations")}
      >
        Integrations
      </NavLink>
      <NavLink to={`/project/${projectId}/${envId}`} isActive={false}>
        Services
      </NavLink>
    </StyledWrapper>
  );
}
