import { SET_LOGGED, SET_USER, SET_ERROR } from "./actionTypes";
import {
  signUp,
  signIn,
  updateUser,
  instanceAxios,
} from "../service/API/loginAPI";

export const setLogged = (logged) => ({
  type: SET_LOGGED,
  payload: logged,
});

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const setErrorState = (error) => ({
  type: SET_ERROR,
  payload: error,
});

export const registerUser = (dataUser) => {
  return async (dispatch) => {
    try {
      const res = await signUp(dataUser);
      const { user } = res.data;
      dispatch(setUser(user));
      dispatch(setErrorState(""));
    } catch (error) {
      if (error.response.status === 422)
        dispatch(setErrorState(error.response.data.errors.email));
      else {
        dispatch(setErrorState(error.message));
      }
    }
  };
};

export const loginUser = (dataUser) => {
  return async (dispatch) => {
    try {
      const res = await signIn(dataUser);
      const { user } = res.data;
      const { token } = user;
      if (token !== localStorage.getItem("token")) {
        localStorage.setItem("token", token);
        instanceAxios.defaults.headers.Authorization = `Token ${token}`;
      }
      dispatch(setUser(user));
      dispatch(setLogged(true));
      dispatch(setErrorState(""));
    } catch (error) {
      if (error.message === "422") dispatch(setErrorState(error.message));
      else dispatch(setErrorState(error.message));
      dispatch(setLogged(false));
    }
  };
};

export const userUpdate = (dataUser) => {
  return async (dispatch) => {
    try {
      const res = await updateUser(dataUser);
      const { user } = res.data;
      dispatch(setUser(user));
      dispatch(setErrorState(""));
    } catch (error) {
      const value = Object.entries(error).map(
        ([key, value]) => `${key}: ${value}`
      );
      dispatch(setErrorState(value));
    }
  };
};
