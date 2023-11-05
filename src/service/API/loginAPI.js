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

export const fetchUserData = async (token) => {
  if (!token) {
    return null;
  }
  const response = await fetch(`${baseURL}user/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  const body = await response.json();
  return body;
};

export const updateUser = async (dataUser) => {
  const res = await instanceAxios.put("user", dataUser);
  return res;
};
