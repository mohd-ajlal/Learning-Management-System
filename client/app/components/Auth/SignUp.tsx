'use client';

import React, { FC, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AiOutlineEye, AiOutlineEyeInvisible, AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { styles } from '../../../app/styles/style';
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";
import { useRegisterMutation } from '@/redux/features/auth/authApi';
import toast from 'react-hot-toast';

type Props = {
  setRoute: (route: string) => void;
};

const schema = Yup.object().shape({
    name:Yup.string().required("Please enter your name"),
  email: Yup.string().email("Invalid email").required("Please enter your email"),
  password: Yup.string().required("Please enter your password").min(6),
});

const SignUp: FC<Props> = ({setRoute}) => {
   const [show, setShow] = useState(false);

  const [register, { data, isSuccess, error }] = useRegisterMutation();


  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Registration successful";
      toast.success(message);
      setRoute("Verification");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);
  

  const formik = useFormik({
    initialValues: {name: "", email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ name,email, password }) => {
      // setRoute("Verification")
      const data = {
        name,
        email,
        password
      };

      await register(data)

    },  
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-6 shadow-input bg-white dark:bg-black">      <h1 className={`${styles.title}`}>
        Join To Gravity
      </h1>

      
      <form onSubmit={handleSubmit} className="space-y-6">

        <div className='mb-3'>
        <LabelInputContainer>
          <Label  htmlFor="name" className={styles.label}>
            Enter your Name
          </Label >
          <Input 
            type="text"
            name=""
            value={values.name}
            onChange={handleChange}
            id="name"
            placeholder="Mohd Ajlal"
            // className={`${styles.input} ${errors.email && touched.email && "border-red-500 focus:border-red-500"} focus:ring-2 focus:ring-blue-500`}
          />
          {errors.name && touched.name && (
            <span className="text-red-500 pt-2 block">{errors.name}</span>
          )}
        </LabelInputContainer>
        </div>
        <LabelInputContainer>
          <Label  htmlFor="email" className={styles.label}>
            Enter your Email
          </Label >
          <Input 
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            id="email"
            placeholder="abc@example.com"
            // className={`${styles.input} ${errors.email && touched.email && "border-red-500 focus:border-red-500"} focus:ring-2 focus:ring-blue-500`}
          />
          {errors.email && touched.email && (
            <span className="text-red-500 pt-2 block">{errors.email}</span>
          )}
        </LabelInputContainer>

        <LabelInputContainer>
          <Label  htmlFor="password" className={styles.label}>
            Enter Your Password
          </Label >
          <Input 
            type={show ? "text" : "password"}
            name="password"
            value={values.password}
            onChange={handleChange}
            id="password"
            placeholder="**********"
            className={`${errors.password && touched.password && "border-red-500 focus:border-red-500"} focus:ring-2 focus:ring-blue-500`}
          />
          {show ? (
            <AiOutlineEye
              className="absolute mx-10 right-2 cursor-pointer"
              size={20}
              onClick={() => setShow(false)}
              aria-label="Hide Password"
            />
          ) : (
            <AiOutlineEyeInvisible
              className="absolute mx-10 right-2 cursor-pointer"
              size={20}
              onClick={() => setShow(true)}
              aria-label="Show Password"
            />
          )}
          {errors.password && touched.password && (
            <span className="text-red-500 pt-2 block">{errors.password}</span>
          )}
        </LabelInputContainer >

        <div className="w-full">
          <button
            type="submit"
            value="Sign Up"
            className={`${styles.button} hover:bg-blue-600 transition duration-300`}
          >
            Sign Up
          </button>
        </div>
        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
        <h5 className='text-center pt-4 font-Poppins text-[14px] text-black dark:text-white'>Or Join With</h5>
        <div className="w-full">
        {/* <div className="flex flex-col space-y-4">
        <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              Google
            </span>
            <BottomGradient />
          </button>
        <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >
            <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              GitHub
            </span>
            <BottomGradient />
          </button>

          
        </div> */}
        <div className="flex items-center justify-center my-3 space-x-4">
  <div
    className="flex items-center cursor-pointer px-4 py-2 rounded-md shadow-input bg-gray-50 dark:bg-zinc-900 hover:bg-gray-200 dark:hover:bg-neutral-800"
    // onClick={() => signIn("google")}
  >
    <FcGoogle size={20} className="mr-2" />
    <span className="text-neutral-700 dark:text-neutral-300 text-sm">Google</span>
  </div>
  <div
    className="flex items-center cursor-pointer px-4 py-2 rounded-md shadow-input bg-gray-50 dark:bg-zinc-900 hover:bg-gray-200 dark:hover:bg-neutral-800"
// onClick={() => signIn("github")}
  >
    <AiFillGithub size={20} className="mr-2" />
    <span className="text-neutral-700 dark:text-neutral-300 text-sm">GitHub</span>
  </div>
</div>

        </div>
        <h5 className='text-center pt-4 font-Poppins text-[14px]'>Already Have An Account?{" "}
          <span className='text-[#2190ff] pl-1 cursor-pointer'
          onClick={()=>setRoute("Login")}
          >Sign In</span>

        </h5>


      </form>
    </div>
  );
};

export default SignUp;


const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};
 
const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};