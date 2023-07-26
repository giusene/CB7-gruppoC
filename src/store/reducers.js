
export const mainReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER_LOGGED":
      return {
        ...state,
        id: action.payload.localId,
        isLogged: true,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
        userImg: action.payload.userImg,
      };
    // ...
    default:
      console.log(state);
      return state;
  }
};
