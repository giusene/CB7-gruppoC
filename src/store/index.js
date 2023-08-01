import { createContext } from "react";

export const MainContext = createContext({});

export const initialState = {
  user: {
    id: "",
    isLogged: false,
    firstName: "",
    lastName: "",
    email: "",
    userImg: "",
  },
  comments: [],
};
