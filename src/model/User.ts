export enum USER_ROLE {
  NORMAL = "NORMAL",
  ADMIN = "ADMIN",
}

export type AuthenticationData = {
  id: string;
  role: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: USER_ROLE;
};

export interface UserInputDTO {
  name: string;
  email: string;
  password: string;
  role: USER_ROLE;
}
