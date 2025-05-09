import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  login: string;
  password: string;
  name: string;
}

interface AuthState {
  users: User[];
  isAuth: boolean;
  isAdmin: boolean;
  nameAuthUser: string;
}

const initialState: AuthState = {
  users: [
    { login: "rrr", password: "123", name: "Sasha" },
    { login: "admin", password: "cofe", name: "Admin" },
  ],
  isAuth: false,
  isAdmin: false,
  nameAuthUser: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    isAuthCheck: (
      state,
      action: PayloadAction<{ login: string; password: string }>
    ) => {
      const authUser = state.users.find(
        (el) =>
          el.login === action.payload.login &&
          el.password === action.payload.password
      );
      if (authUser) {
        state.isAuth = true;
        state.nameAuthUser = authUser.name;
        if (authUser.name === "Admin") state.isAdmin = true;
      }
    },
    logout: (state) => {
      state.isAuth = false;
      state.isAdmin = false;
    },
    addNewUser: (
      state,
      action: PayloadAction<{ login: string; password: string; name: string }>
    ) => {
      state.users.push({
        login: action.payload.login,
        password: action.payload.password,
        name: action.payload.name,
      });
    },
  },
});

export const { isAuthCheck, logout, addNewUser } = authSlice.actions;
export default authSlice.reducer;