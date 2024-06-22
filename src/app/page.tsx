"use client";
import React, { useState } from "react";
import postLogin from "@/actions/postLogin";
import { useRouter } from "next/navigation";

interface LoginForm {
  email: string;
  userPassword: string;
}

const LoginPage: React.FC = () => {
  const [loginForm, setLoginForm] = useState<LoginForm>({
    email: "",
    userPassword: "",
  });
  const [error, setError] = useState<string>("");
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm({ ...loginForm, [name]: value });

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setIsEmailValid(emailRegex.test(value));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loginForm.email === "" || loginForm.userPassword === "") {
      setError("Both fields are required.");
    } else if (!isEmailValid) {
      setError("Please enter a valid email address.");
    } else {
      
      const response = await postLogin(loginForm);
      console.log('response', response);
      if (response.error) {
        setError(response.error);
      } else {
        setError("");
        alert("Logged in successfully");
        router.push("/gestionapp/projects");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-center mb-4">
          <img
            className="h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
        </div>
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
          Sign in to your account
        </h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={loginForm.email}
                onChange={handleChange}
                required
                className={`block w-full px-3 py-2 border ${
                  isEmailValid ? "border-green-500" : "border-gray-500"
                } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              />
              {!isEmailValid && loginForm.email && (
                <p className="mt-2 text-sm text-red-600">Invalid email address</p>
              )}
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="mt-1">
              <input
                id="userPassword"
                name="userPassword"
                type="password"
                autoComplete="current-password"
                value={loginForm.userPassword}
                onChange={handleChange}
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              disabled={!isEmailValid || !loginForm.email || !loginForm.userPassword}
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
