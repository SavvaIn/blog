import { SET_LOGGED, SET_USER, SET_ERROR } from "./actionTypes";

const initialState = {
  logged: false,
  user: {},
  errorState: "",
};

function reduserLogin(state = initialState, action) {
  switch (action.type) {
    case SET_LOGGED:
      return {
        ...state,
        logged: action.payload,
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case SET_ERROR:
      return {
        ...state,
        errorState: action.payload,
      };
    default:
      return state;
  }
}

export { reduserLogin };
