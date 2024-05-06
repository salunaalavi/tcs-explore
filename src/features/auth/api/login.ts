import { axiosInstance } from "@/lib";
import { TLoginRequest, TLoginResponse } from "../type";

export const login = (props: TLoginRequest) => {
  return axiosInstance.post<TLoginResponse>("/login", {
    email: props.email,
    password: props.password,
  });
};
