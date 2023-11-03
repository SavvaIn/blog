import { setLogged, setUser, setErrorState } from "../../store/action";
import axios from "./axios";

const baseURL = `https://blog.kata.academy/api/`;

export const instanceAxios = axios.create({
  baseURL: "https://blog.kata.academy/api",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Token ${localStorage.getItem("token")}`,
  },
});

export const signUp = async (dataUser) => {
  const res = await instanceAxios.post("users", dataUser);
  return res;
};

export const signIn = async (dataUser) => {
  const res = await instanceAxios.post("users/login", dataUser);
  return res;
};

export const checkAuth = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`${baseURL}user/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
        .then((response) => response.json())
        .then((body) => {
          dispatch(setLogged(true));
          dispatch(setErrorState(""));
          dispatch(setUser(body.user));
        });
    } else return;
  } catch (error) {
    dispatch(setErrorState(error));
  }
};

export const updateUser = async (dataUser) => {
  const res = await instanceAxios.put("user", dataUser);
  return res;
};

export const setLogOut = () => async (dispatch) => {
  try {
    localStorage.removeItem("token");
    dispatch(setUser({}));
    dispatch(setLogged(false));
    dispatch(setErrorState(""));
  } catch (error) {
    dispatch(setErrorState(error));
  }
};
