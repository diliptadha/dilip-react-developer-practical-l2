"use client";
import { getFromLocalStorage, saveToLocalStorage } from "@/utils/localstorage";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useCallback } from "react";
import { toast } from "react-toastify";

interface User {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

const LoginPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<User>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({
    email: undefined,
    password: undefined,
  });

  const handleChange = useCallback(
    (e: { target: { name: any; value: any } }) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const validateFields = useCallback((): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.password) newErrors.password = "Password is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = useCallback(
    (e: { preventDefault: () => void }) => {
      e.preventDefault();
      setErrors({});

      if (validateFields()) {
        const storedUsers = JSON.parse(getFromLocalStorage("userData") || "[]");
        const user = storedUsers.find(
          (u: User) =>
            u.email === formData.email && u.password === formData.password
        );

        if (user) {
          saveToLocalStorage("loggedUser", JSON.stringify(user));
          toast.success("Login successful");
          router.push("/");
        } else {
          toast.error("Invalid email or password");
          setFormData({ email: "", password: "" }); // Clear the form fields
        }
      }
    },
    [formData, validateFields, router]
  );

  return (
    <div className="flex justify-center items-center text-black min-h-screen bg-gray-100">
      <form
        className="w-full max-w-md p-6 bg-white rounded-2xl shadow-xl"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className={`w-full p-2 border rounded-lg ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className={`w-full p-2 border rounded-lg ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
        >
          Login
        </button>
        <div className="text-center mt-4">
          <Link href="/signup" className="text-blue-500 hover:underline">
            Don&#39;t have an account? Sign up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
