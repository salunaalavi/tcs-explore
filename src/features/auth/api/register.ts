import { axiosInstance } from "@/lib";
import { TRegisterRequest, TRegisterResponse } from "../type";

export const register = (props: TRegisterRequest) => {
  return axiosInstance.post<TRegisterResponse>("/register", {
    username: props.username,
    email: props.email,
    password: props.password,
  });
};
