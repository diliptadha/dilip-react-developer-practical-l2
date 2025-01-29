"use client";
import { getFromLocalStorage } from "@/utils/localstorage";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useCallback, FormEvent } from "react";
import { toast } from "react-toastify";

const validateEmail = (email: string): boolean => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

const validatePassword = (password: string): boolean => {
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordPattern.test(password);
};

interface FormData {
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  
mobile: string;
}

interface Errors {
  fullname?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  gender?: string;
  mobile?: string;
}

const SignupPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    mobile: "",
  });
  const [errors, setErrors] = useState<Errors>({});

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const validateFields = useCallback(() => {
    const newErrors: Errors = {};

    if (!formData.fullname) newErrors.fullname = "Fullname is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!validatePassword(formData.password)) {
      newErrors.password =
        "Password must be at least 8 characters, include 1 uppercase, 1 lowercase, 1 number, and 1 special character";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.mobile) newErrors.mobile = "Mobile number is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);


  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
        const storedData = getFromLocalStorage("userData");
        let userDataArray: FormData[] = storedData
          ? JSON.parse(storedData)
          : [];

      if (validateFields()) {
        // Save to Local Storage
        userDataArray.push(formData);
        localStorage.setItem("userData", JSON.stringify(userDataArray));
        toast.success("Signup successful");
        router.push("/login");
        setFormData({
          fullname: "",
          email: "",
          password: "",
          confirmPassword: "",
          gender: "",
          mobile: "",
        });
        setErrors({});
      }
    },
    [formData, validateFields]
  );


  return (
    <div className="flex justify-center items-center text-black min-h-screen bg-gray-100">
      <form
        className="w-full max-w-md p-6 rounded-2xl bg-white shadow-xl"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="fullname">
            Fullname
          </label>
          <input
            id="fullname"
            name="fullname"
            type="text"
            className={`w-full p-2 border rounded-lg ${
              errors.fullname ? "border-red-500" : "border-gray-300"
            }`}
            value={formData.fullname}
            onChange={handleChange}
          />
          {errors.fullname && (
            <p className="text-red-500 text-sm mt-1">{errors.fullname}</p>
          )}
        </div>

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

        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-2"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            className={`w-full p-2 border rounded-lg ${
              errors.confirmPassword ? "border-red-500" : "border-gray-300"
            }`}
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Gender</label>
          <select
            name="gender"
            className={`w-full p-2 border rounded-lg ${
              errors.gender ? "border-red-500" : "border-gray-300"
            }`}
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && (
            <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="mobile">
            Mobile
          </label>
          <input
            id="mobile"
            name="mobile"
            type="text"
            className={`w-full p-2 border rounded-lg ${
              errors.mobile ? "border-red-500" : "border-gray-300"
            }`}
            value={formData.mobile}
            onChange={handleChange}
          />
          {errors.mobile && (
            <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
        >
          Signup
        </button>
        <div className="text-center mt-4">
          <Link href="/login" className="text-blue-500 hover:underline">
            Already have an account? Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
