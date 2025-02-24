"use client";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ChevronLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { userInfoType } from "@/type/userInfoType";
import Link from "next/link";
import axios from "axios";

export const SignUp = ({
  setStep,
  setUserInfo,
  userInfo,
}: {
  setStep: Function;
  setUserInfo: Function;
  userInfo: userInfoType;
}) => {
  const [error, setError] = useState("");
  const checkSignedUp = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/user/signup",
        userInfo
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const handleOnChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, email: e.target.value });
  };
  const letsGoHandler = () => {
    const checkEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (userInfo.email.length === 0) {
      setError("lenght");
    } else if (!checkEmail.test(userInfo.email)) {
      setError("type");
    } else {
      setError("");
      checkSignedUp();
      // setStep(2);
    }
  };
  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);
  return (
    <div className="flex flex-col gap-6 w-[400px]">
      <Button className="w-fit border bg-white px-3 py-3">
        <ChevronLeft color="black " />
      </Button>
      <div>
        <p>
          <b>Create your account</b>
        </p>
        <p>Sign up to explore your favorite dishes.</p>
      </div>
      <div className="flex flex-col gap-4">
        <Input
          placeholder="Enter your email address"
          name="email"
          onChange={handleOnChangeEmail}
        />
        {error.length !== 0 && (
          <p className="text-red-500">
            Invalid email. Use a format like example@email.com
          </p>
        )}
        <a className="underline" href="">
          Forgot password ?
        </a>
      </div>
      <Button onClick={letsGoHandler}>Let's Go</Button>
      <div className="flex gap-2">
        <p>Already have an account?</p>
        <Link href={`/login`}>
          <p className="text-[#2563EB]">Log in</p>
        </Link>
      </div>
    </div>
  );
};
