import * as yup from "yup";
export const emailYup = yup
  .string()
  .required("Email is required.")
  .email("Wrong format");
export const userRejex = yup.object({
  email: emailYup,
  password: yup
    .string()
    .required("Password is required.")
    .min(8, "At least 8 characters are needed.")
    .matches(
      /[^a-zA-Z0-9]/,
      "Password must contain lowercase , uppercase, special character and digit"
    ),
});
