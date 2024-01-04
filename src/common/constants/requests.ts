import { AUTH_API } from './endpoints';

export const reqLogin = {
  endpoint: `${AUTH_API}/login`,
};

export type loginCredentials = {
  email: string;
  password: string;
};
