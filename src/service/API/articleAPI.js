import axios from "./axios";
import { authHeader } from "./localStorage";

const baseURL = `https://blog.kata.academy/api/articles`;

export const getArticleList = async (offset = 0, limit = 5) => {
  const articles = await axios
    .get("articles", { params: { offset, limit } })
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });

  return articles;
};

export const postFavorited = async (slug) => {
  const config = {
    method: "post",
    url: `articles/${slug}/favorite`,
    ...authHeader(),
  };
  return axios(config)
    .then(() => true)
    .catch((e) => {
      throw e;
    });
};

export const delFavorited = async (slug) => {
  const config = {
    method: "delete",
    url: `articles/${slug}/favorite`,
    ...authHeader(),
  };
  return axios(config)
    .then(() => true)
    .catch((e) => {
      throw e;
    });
};

export function getArticle(slug) {
  const token = localStorage.getItem("token");
  return fetch(`${baseURL}/${slug}`, {
    method: "GET",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
}

export function newArticle(data) {
  const token = localStorage.getItem("token");
  const { title, body, description, tagList } = data;
  return fetch(`${baseURL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({
      article: {
        title: title,
        description: description,
        tagList: tagList,
        body: body,
      },
    }),
  }).then((response) => response.json());
}

export function editArticle(slug, data) {
  const token = localStorage.getItem("token");
  const { title, body, description, tagList } = data;
  return fetch(`${baseURL}/${slug}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({
      article: {
        title: title,
        description: description,
        tagList: tagList,
        body: body,
      },
    }),
  }).then((response) => response.json());
}

export const deleteArticle = async (slug) => {
  await axios.delete(`articles/${slug}`, { ...authHeader() }).catch((error) => {
    throw error;
  });
  return true;
};
