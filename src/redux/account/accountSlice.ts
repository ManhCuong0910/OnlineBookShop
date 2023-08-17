import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import { User } from "src/types/user.type";
import { clearLS } from "src/utils/auth";
interface Account {
  isAuthenticated: boolean;
  user: User;
  isLoading: boolean;
}
const initialState: Account = {
  isAuthenticated: false,
  isLoading: true,
  user: {
    avatar: "",
    email: "",
    fullName: "",
    id: "",
    phone: "",
    role: "",
  },
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    doLoginAction: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isLoading = false;
      state.isAuthenticated = true;
    },
    doGetAccountAction: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isLoading = false;
      state.isAuthenticated = true;
    },
    doLogoutAccount: (state) => {
      clearLS();
      state.user = {
        email: "",
        phone: "",
        fullName: "",
        role: "",
        avatar: "",
        id: "",
      };
      state.isAuthenticated = false;

      message.success("Đăng xuất thành công", 1);
    },
  },
});

export const { doLoginAction, doGetAccountAction, doLogoutAccount } =
  accountSlice.actions;

export default accountSlice.reducer;
