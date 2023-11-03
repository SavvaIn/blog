import * as Yup from "yup";

export const articleFormSchema = Yup.object()
  .shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Short description is required"),
    body: Yup.string().required("Text is required"),
    tagList: Yup.array().of(
      Yup.object().shape({
        value: Yup.string().min(1).required(),
      })
    ),
  })
  .required();

export const profileSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Email address is invalid"),
  password: Yup.string()
    .min(6, "Your password needs to be at least 6 characters.")
    .required("Password is required"),
  image: Yup.string().url("Must be the correct url"),
});

export const signUpSchema = Yup.object()
  .shape({
    username: Yup.string()
      .min(3, "Username must be more then 3 symbols")
      .max(20, "Username must be less then 20 characters.")
      .required("Username is required"),
    email: Yup.string()
      .email("Email address is invalid")
      .required("Email address is required"),
    password: Yup.string()
      .min(6, "Your password needs to be at least 6 characters.")
      .max(40, "Your password needs to be less then 40 characters.")
      .required("Password is required"),
    repassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords does not match")
      .required("Repeat password is required"),
    policy: Yup.boolean().oneOf([true], "Agreement is required"),
  })
  .required();

export const signInSchema = Yup.object()
  .shape({
    email: Yup.string()
      .email("Email address is invalid")
      .required("Email address is required"),
    password: Yup.string().required("Password is required"),
  })
  .required();
