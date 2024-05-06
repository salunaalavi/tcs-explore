import { TUser } from "@/features/auth";

export type TAuthStore = {
  user: TUser | null;
  doLogin: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<void>;
  doLogout: () => Promise<void>;
  doRegister: ({
    email,
    password,
    username,
  }: {
    email: string;
    password: string;
    username: string;
  }) => Promise<void>;
  resetUser: () => void;
};
