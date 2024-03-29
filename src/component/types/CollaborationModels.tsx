export interface ChangeCollaboratorRoleModalProps {
  open: boolean;
  handleRoleChangeModal: (state: boolean) => void;
  fetchCollaborators: () => void;
  fetchCollaboratorDetails: () => void;
  collaborator: Collaborator;
  selectedRole: Role;
}

export interface AddCollaboratorModalProps {
  open: boolean;
  roles: any;
  handleCollaboratorModal: (state: boolean) => void;
  fetchCollaborators: () => void;
  project: {
    name: string;
    id: string;
  };
  projectCollaborators: {};
}

export interface RemoveCollaboratorModalProps {
  open: boolean;
  collaborator: Collaborator;
  handleCollaboratorModal: (state: boolean) => void;
  fetchCollaborators: () => void;

  currentCollaboratorDetails: {
    role: string;
    email: string;
  };
}

export interface NoCollaboratorsProps {
  handleCollaboratorModal: (state: boolean) => void;
}

export interface Role {
  id: string;
  name: string;
}

export interface Option {
  readonly label: string;
  readonly value: string;
}

export interface CollaborationListProps {
  setSelectedRemoveCollaborator: (collaborator: any) => void;
  setSelectedChangeRole: (collaborator: any, role: any) => void;
  handleRoleChangeModal: (collaborator: any) => void;
  collaborators: any;
  invitations: any;
  owner: any;
  roles: any;
  fetchCollaborators: () => void;
  fetchCollaboratorDetails: () => void;
  currentCollaboratorDetails: {
    role: string;
    email: string;
  };
}

export interface RemoveCollaborationResponse {
  status: number;
  data: {
    status: string;
  };
}

export interface Collaborator {
  status?: string;
  id: string;
  profileUrl: string;
  name: string;
  email: string;
  role: string;
}

export interface GetCollaboratorsRolesResponse {
  status: number;
  data: {
    status: string;
    roles: [];
  };
}
export interface GetCollaborators {
  status: number;
  data: {
    status: string;
    collaborators: [];
    invitations: [];
    owner: [];
  };
}

export interface CollaboratorDetails {
  email: string;
  role: string;
}

export interface InvitationDetails {
  owner: string;
  project: string;
  role: string;
  projectId: string;
  environmentId: string;
}
