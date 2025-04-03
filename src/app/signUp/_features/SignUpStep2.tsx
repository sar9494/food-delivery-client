"use client";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { BackButton } from "../_components/BackButton";
import { useFormik } from "formik";
import { passRejex } from "@/utils/userYup";
import { signupType } from "@/utils/signupType";
import { Dispatch, SetStateAction } from "react";
export const SignUpStep2 = ({
  setStep,
  userInfo,
}: {
  setStep: Dispatch<SetStateAction<number>>;
  userInfo: signupType;
}) => {
  const router = useRouter();
  const letsGoHandler = async (values: { password: string }) => {
    const newUser = { ...userInfo, password: values.password };
    try {
      const response = await axios.post(
        "http://localhost:4000/user/signup/password",
        newUser
      );
      if (response.data.success) {
        router.push("/login");
      }
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const formik = useFormik({
    validationSchema: passRejex,
    initialValues: {
      password: "",
      confirm: "",
    },
    onSubmit: letsGoHandler,
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-col gap-6 w-[400px]">
        <BackButton onClick={() => setStep(1)} />
        <div>
          <p>
            <b>Create your account</b>
          </p>
          <p>Create a strong password with letters, numbers.</p>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <Input
              placeholder="Password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <p className="text-red-500">{formik.errors.password}</p>
          </div>
          <div>
            <Input
              placeholder="Confirm"
              name="confirm"
              onChange={formik.handleChange}
              value={formik.values.confirm}
            />
            <p className="text-red-500">{formik.errors.confirm}</p>
          </div>
          <label className="flex gap-2">
            <input type="checkbox" />
            <p>Show password</p>
          </label>
        </div>
        <Button type="submit">Next</Button>
        <Link href={`/login`}>
          <p className="text-[#2563EB]">Already have an account?</p>
        </Link>
      </div>
    </form>
  );
};
