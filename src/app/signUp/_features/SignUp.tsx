"use client";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { userInfoType } from "@/type/userInfoType";
import { Formik, useFormik } from "formik";
import Link from "next/link";
import axios from "axios";
import { emailSchema } from "@/utils/userYup";
import { BackButton } from "../_components/BackButton";
import * as yup from "yup";
import { useState } from "react";

export const SignUp = ({
  setStep,
  setUserInfo,
  userInfo,
}: {
  setStep: Function;
  setUserInfo: Function;
  userInfo: userInfoType;
}) => {
  const [isExist, setIsExist] = useState(true);

  const handleCheckEmail = async (values: { email: string }) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/user/signUp",
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

  return (
    <Formik
      initialValues={{ email: "" }}
      validationSchema={emailSchema}
      onSubmit={(values) => {
        console.log("tets");

        handleCheckEmail(values);
      }}
    >
      {({ values, errors, handleChange, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
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
                value={values.email}
                onChange={handleChange}
              />
              <p className="text-red-500">{errors.email}</p>
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
      )}
    </Formik>
  );
};
