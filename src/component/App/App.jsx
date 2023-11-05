import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import { fetchUserData } from "../../service/API/loginAPI";
import { setLogged, setUser, setErrorState } from "../../store/action";

import { getArticleList } from "../../service/API/articleAPI";

import { Header } from "../Header/Header";
import { SignIn } from "../forms/SignIn";
import { SignUp } from "../forms/SignUp";
import { Profile } from "../forms/Profile";
import { CreatePost } from "../forms/CreatePost";
import { CreateArticle } from "../CreateArticle/CreateArticle";
import { ArticleList } from "../ArticleList/ArticleList";

import {
  slash,
  article,
  articleSlug,
  signUp,
  newArticle,
  articleSlugEdit,
  profile,
  signIn,
} from "../Route/Route";

import styles from "./App.module.scss";

function App() {
  const dispatch = useDispatch();
  const checkAuth = () => async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      const userData = await fetchUserData(token);

      if (userData) {
        dispatch(setLogged(true));
        dispatch(setErrorState(""));
        dispatch(setUser(userData.user));
      } else {
        return;
      }
    } catch (error) {
      dispatch(setErrorState(error));
    }
  };

  useEffect(() => {
    dispatch(checkAuth());
    getArticleList();
  }, []);

  return (
    <div className={styles.wrapper}>
      <Router>
        <Header />
        <Route exact path={slash} component={ArticleList} />
        <Route exact path={article} component={ArticleList} />
        <Route exact path={articleSlug} component={CreatePost} />
        <Route path={signUp} component={SignUp} />
        <Route path={signIn} component={SignIn} />
        <Route path={profile} component={Profile} />
        <Route path={newArticle} component={CreateArticle} />
        <Route path={articleSlugEdit} component={CreateArticle} />
      </Router>
    </div>
  );
}

export default App;
