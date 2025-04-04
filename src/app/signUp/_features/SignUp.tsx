"use client";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { useFormik } from "formik";
import Link from "next/link";
import axios from "axios";
import { emailSchema } from "@/utils/userYup";
import { BackButton } from "../_components/BackButton";
import { Dispatch, SetStateAction, useState } from "react";
import { signupType } from "@/utils/signupType";

export const SignUp = ({
  setStep,
  setUserInfo,
  userInfo,
}: {
  setStep: Dispatch<SetStateAction<number>>;
  setUserInfo: Dispatch<
    SetStateAction<{
      email: string;
      password: string;
      confirm: string;
    }>
  >;
  userInfo: signupType;
}) => {
  const [isExist, setIsExist] = useState(true);

  const handleCheckEmail = async (values: { email: string }) => {
    try {
      const response = await axios.post(
        "https://food-delivery-service-bx3v.onrender.com/user/signUp",
        values
      );
      setIsExist(response.data.success);
      if (response.data.success) {
        setUserInfo({ ...userInfo, email: values.email });
        setStep(2);
      }
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: emailSchema,
    onSubmit: (values) => {
      handleCheckEmail(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-col gap-6 w-[400px]">
        <BackButton />
        <div>
          <p>
            <b>Create your account</b>
          </p>
          <p>Sign up to explore your favorite dishes.</p>
        </div>
        <div className="flex flex-col gap-0.5">
          <Input
            placeholder="Enter your email address"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          <p className="text-red-500">{formik.errors.email}</p>
          {!isExist && <p className="text-red-500">Already have account</p>}
        </div>
        <Button type="submit">Next</Button>
        <div className="flex gap-2">
          <p>Already have an account?</p>
          <Link href={`/login`}>
            <p className="text-[#2563EB]">Log in</p>
          </Link>
        </div>
      </div>
    </form>
  );
};
