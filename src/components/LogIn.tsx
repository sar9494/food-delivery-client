"use client";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ChevronLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
export const LogIn = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({ email: "", password: "" });

  const handleOnChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "email") {
      setUserInfo({ ...userInfo, email: e.target.value });
    } else {
      setUserInfo({ ...userInfo, password: e.target.value });
    }
  };
  const getData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/user/login",
        userInfo
      );
      console.log(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const letsGoHandler = () => {
    const checkEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (checkEmail.test(userInfo.email) && userInfo.password.length >= 8) {
      getData();
    } else if (checkEmail.test(userInfo.email)) {
    } else if (userInfo.email.length === 0 && userInfo.password.length < 8) {
      setError({ password: "lenght", email: "lenght" });
    }
  };
  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);
  return (
    <div className="flex flex-col gap-6 w-[400px]">
      <Button className="w-fit border bg-white px-4 py-6">
        <ChevronLeft color="black " />
      </Button>
      <div>
        <p>
          <b>Log in</b>
        </p>
        <p>Log in to enjoy your favorite dishes.</p>
      </div>
      <div className="flex flex-col gap-4">
        <Input
          placeholder="Enter your email address"
          name="email"
          onChange={handleOnChangeEmail}
        />
        <Input
          placeholder="Password"
          name="password"
          onChange={handleOnChangeEmail}
        />
        <a className="underline" href="">
          Forgot password ?
        </a>
      </div>
      <Button onClick={letsGoHandler}>Let's Go</Button>
      <div className="flex gap-2">
        <p>Don’t have an account?</p>
        <a className="text-[#2563EB]" href="">
          Sign up
        </a>
      </div>
    </div>
  );
};
