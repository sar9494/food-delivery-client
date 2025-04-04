"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { loginRejex } from "@/utils/userYup";
import { Formik } from "formik";
import Link from "next/link";

export const LogIn = () => {
  const router = useRouter();

  const logInHandler = async (values: { email: string; password: string }) => {
    const { email, password } = values;
    try {
      const response = await axios.post(
        "https://food-delivery-service-bx3v.onrender.com//user/login",
        {
          email: email,
          password: password,
        }
      );
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        router.push("/");
      }
      if (response.data.success === false) {
        console.log(response.data.message);
      }
      console.log(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <Formik
      validationSchema={loginRejex}
      onSubmit={logInHandler}
      initialValues={{ email: "", password: "" }}
    >
      {({ values, errors, handleChange, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6 w-[400px]">
            <p>
              <b>Log in</b>
            </p>
            <div className="flex flex-col gap-4">
              <Input
                placeholder="Enter your email address"
                name="email"
                onChange={handleChange}
                value={values.email}
              />
              <p className="text-red-500">{errors.email}</p>
              <Input
                placeholder="Password"
                name="password"
                onChange={handleChange}
                value={values.password}
              />
              <p className="text-red-500">{errors.password}</p>
              <div className="flex justify-between">
                <a className="underline" href="">
                  Forgot password ?
                </a>
                <Link href={"/signUp"}>
                  <p className="text-blue-400">Dont have a account?</p>
                </Link>
              </div>
            </div>
            <Button type="submit">Log in</Button>
          </div>
        </form>
      )}
    </Formik>
  );
};
