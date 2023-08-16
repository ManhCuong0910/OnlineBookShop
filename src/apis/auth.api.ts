import { AuthResponse } from "src/types/auth.type";
import { SuccessResponse } from "src/types/utils.type";
import http from "src/utils/http";
export const URL_LOGIN = "/api/v1/auth/login";
export const URL_REGISTER = "/api/v1/user/register";
export const FETCH_ACCOUNT = "/api/v1/auth/account";
export const URL_LOGOUT = "/api/v1/auth/logout";
export const registerAccount = (body: {
  fullName: string;
  email: string;
  password: string;
  phone: number;
}) => {
  return http.post<AuthResponse>(URL_REGISTER, body);
};

export const loginAccount = (body: {
  username: string;
  password: string;
  delay: string;
}) => {
  return http.post<AuthResponse>(URL_LOGIN, body);
};

export const fetchAccount = () => {
  return http.get<AuthResponse>(FETCH_ACCOUNT);
};

export const logoutAccount = () => {
  return http.post<SuccessResponse<string>>(URL_LOGOUT);
};
