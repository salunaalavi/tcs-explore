import { axiosInstance } from "@/lib";
import { TGetCurrentUserResponse } from "../type";

export const getCurrentUser = () => {
  return axiosInstance.get<TGetCurrentUserResponse>("/user");
};
