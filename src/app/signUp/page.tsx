"use client";
import { useEffect, useState } from "react";
import { SignUp } from "./_features/SignUp";
import { SignUpStep2 } from "./_features/SignUpStep2";

export default function Home() {
  const [step, setStep] = useState(1);
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    confirm: "",
  });
  return (
    <div className="flex w-screen items-center justify-center py-5 ">
      <div className="flex w-[1300px] items-center justify-center gap-5">
        {step == 1 && (
          <SignUp
            setStep={setStep}
            setUserInfo={setUserInfo}
            userInfo={userInfo}
          />
        )}
        {step == 2 && <SignUpStep2 setStep={setStep} userInfo={userInfo} />}
        <img src="mainImage.png" alt="" />
      </div>
    </div>
  );
}
