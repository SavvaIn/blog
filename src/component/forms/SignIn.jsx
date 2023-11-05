import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";

import { loginUser } from "../../store/action";
import { signInSchema } from "../Yup/yup";

import styles from "../App/App.module.scss";

function SignIn() {
  const dispatch = useDispatch();
  const { errorState, logged } = useSelector((state) => state.reduserLogin);
  const history = useHistory();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onBlur", resolver: yupResolver(signInSchema) });

  const onSubmit = (data) => {
    const { email, password } = data;
    const user = {
      user: {
        email: email,
        password: password,
      },
    };
    dispatch(loginUser(user));
  };

  useEffect(() => {
    if (logged) {
      history.push("/");
      reset();
    }
  }, [logged]);

  return (
    <div className={styles.block__form}>
      <h2>Sign In</h2>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">Email address</label>
        <input
          id="email"
          type="email"
          className={styles.input}
          placeholder="Email address"
          {...register("email")}
        />
        {errors?.email && (
          <div className={styles.error}>{errors?.email.message || "Error"}</div>
        )}

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          className={styles.input}
          placeholder="Password"
          {...register("password")}
        />
        {errors?.password && (
          <div className={styles.error}>
            {errors?.password.message || "Error"}
          </div>
        )}
        <input type="submit" name="submit" id="submit" value="Login" />
      </form>
      <p>
        Already have an account? <Link to="/sign-up">Sign Up</Link>.
      </p>
      {errorState && <div className={styles.error}>{errorState}</div>}
    </div>
  );
}

export { SignIn };
