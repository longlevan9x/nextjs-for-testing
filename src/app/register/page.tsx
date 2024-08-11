'use client';
import { z } from "zod";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

const schema = z.object({
  name: z.string().min(1, { message: "Trường Name không được để trống" }),
  email: z.string().min(1, { message: "Trường Email không được để trống" }).email({ message: "Trường Email không đúng định dang @gmail.com" }),
  password: z.string().min(1, { message: "Trường Password không được để trống" }),
  confirmPassword: z.string().min(1, { message: "Trường Confirm Password không được để trống" })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Confirm Password không giống với Password",
  path: ["confirmPassword"], // path of error
});

function parseErrors(errors: any) {
  const _err: any = {};
  for (const key in errors) {
    const element = errors[key];
    _err[key] = element[0];
  }

  return _err;
}

function checkExistEmail(email: string) {
  if(email === "abc@gmail.com") {
    return true;
  }

  return false;
}

export default function Register() {
  let [errors, setErrors] = useState({} as any);
  let [errEmailMess, setErrEmailMess] = useState(false);

  function handleSubmit(e: any) {
    setErrors({});
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const email: string = formData.get('email') as string;
    const validatedFields = schema.safeParse({
      email: email,
      name: formData.get('name'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
    });

    // Return early if the form data is invalid
    if (!validatedFields.success) {
      const _errors = validatedFields.error.flatten().fieldErrors;
      console.log(_errors)
      setErrors(parseErrors(_errors));
    }

    if(checkExistEmail(email)) {
      setErrEmailMess(true);
    }
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-lg">
          <Image
            alt="Your Company"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-lg">
          <Link href="/" className="flex hover:cursor-pointer">
            <div className="mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
              </svg>
            </div>
            <div>
              <p>BACK TO HOME</p>
            </div>
          </Link>

          <div className={!errEmailMess ? 'hidden' : ''}>
            <div className="flex mt-2 ">
              <span className="inline-flex w-full items-center rounded-md bg-red-600 px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-gray-500/10">
                Email đã tồn tại
              </span>
            </div>
          </div>

          <div className="flex mt-5 text-2xl">
            <p className="mr-2 font-bold">Register</p>
            <p>below</p>
          </div>

          <div className="flex mt-2 mb-2">
            <p className="mr-2 text-gray-400">Already have an account?</p>
            <Link href="/login" className="text-blue-500">Log in</Link>
          </div>

          <form method="POST" className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <span className="text-red-500 font-light text-sm">{errors?.name}</span>
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <span className="text-red-500 font-light text-sm">{errors?.email}</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <span className="text-red-500 font-light text-sm">{errors?.password}</span>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="confirm-password" className="block text-sm font-medium leading-6 text-gray-900">
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="confirm-password"
                  name="confirmPassword"
                  type="password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <span className="text-red-500 font-light text-sm">{errors?.confirmPassword}</span>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-normal leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                SIGN UP
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
