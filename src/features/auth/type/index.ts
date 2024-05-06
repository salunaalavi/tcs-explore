export type TLoginRequest = {
  email: string;
  password: string;
};

export type TLoginResponse = {
  user: TUser;
};

export type TGetCurrentUserResponse = {
  user: TUser;
};

export type TRegisterRequest = {
  username: string;
  email: string;
  password: string;
};

export type TRegisterResponse = {
  user: TUser;
};

export type TUser = {
  email: string;
  username: string;
  bio: string;
  image: string;
};
