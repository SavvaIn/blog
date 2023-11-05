import React, { useState, useEffect } from "react";
import { Pagination, Spin, Alert } from "antd";

import { getArticleList } from "../../service/API/articleAPI";
import { Article } from "../Article/Article";
import styles from "./ArticleList.module.scss";

function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(false);
  const [articlesCount, setArticlesCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [load, setLoaded] = useState(true);
  const token = localStorage.getItem("token");

  const fetchArticles = (page) => {
    const offset = (page - 1) * 5;
    getArticleList(offset)
      .then((body) => {
        setArticles(body.articles);
        setArticlesCount(body.articlesCount);
        setLoaded(false);
      })
      .catch(() => setError(true));
  };

  useEffect(() => {
    fetchArticles(currentPage);
  }, [token, currentPage]);

  const onChangePage = (page) => {
    fetchArticles(page);
    setCurrentPage(page);
  };

  return (
    <div className={styles.article__list}>
      {load && <Spin size="large" />}
      {error && (
        <Alert
          message="An error occurred while fetching articles."
          type="error"
        />
      )}
      {articles.map((item) => (
        <Article key={item.slug} data={item} />
      ))}
      {articlesCount > 0 && (
        <Pagination
          defaultCurrent={1}
          total={articlesCount}
          showSizeChanger={false}
          className={styles.pagination}
          onChange={onChangePage}
          current={currentPage}
        />
      )}
    </div>
  );
}

export { ArticleList };
