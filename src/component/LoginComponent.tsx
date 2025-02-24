"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setFullName } from "@/store/slices/authSlices";
import Image from "next/image";
import Link from "next/link";
import { CiMail, CiLock } from "react-icons/ci";
import { FaEye, FaEyeSlash, FaRegCircle } from "react-icons/fa";
import { RiMentalHealthFill, RiInformationLine } from "react-icons/ri";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormData } from "@/types/auth";
import { loginSchema } from "@/features/LoginSchema";
import { useRouter } from "next/navigation";

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
  });

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
const fullName = watch("fullName");
  const email = watch("email");
  const password = watch("password");
  const allFieldsFilled = fullName && email && password;

  const onSubmit = (data: LoginFormData) => {
    setIsLoading(true);
    dispatch(setFullName(data.fullName));

    // Ensure fullName is defined before routing
    if (data.fullName) {
      router.push(`/dashboard/${data.fullName}/landing-page`);
    } else {
      alert("Full name is missing!");
    }

    console.log("Form data:", data);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <Image
          src={"/hero-img-2.jpg"}
          alt="login image"
          width={470}
          height={470}
          quality={100}
          className="login-image"
        />
      </div>

      <div className="login-form-container">
        <div className="form-header">
          <h2 className="form-title">Hi, Welcome back</h2>
          <p className="form-subtitle">
            Don’t have an account?&nbsp;&nbsp;
            <Link href={"/auth/signup"} className="linking-auth">
              Sign Up
            </Link>
          </p>
        </div>

        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
{/* full name */}
<div className="input-group">
            <label htmlFor="fullName" className="input-label">
              Full Name
            </label>
            <div className="input-wrapper">
            <span className="input-icon">
                <RiMentalHealthFill
                  color={errors.fullName ? "#f65252" : "#59676e"}
                  size={18}
                />
              </span>
              <input
                className={`input-field ${
                  errors.fullName ? "input-error" : "input-normal"
                }`}
                type="fullName"
                id="full-fullName"
                placeholder="Enter your fullName"
                {...register("fullName")}
              />
            </div>
            {errors.fullName && (
              <div className="error-message">
                <RiInformationLine size={"18px"} />
                <p className="error-text">{errors.fullName.message}</p>
              </div>
            )}
          </div>

        {/* email */}
          <div className="input-group">
            <label htmlFor="email" className="input-label">
              Email
            </label>
            <div className="input-wrapper">
            <span className="input-icon">
                <CiMail
                  color={errors.email ? "#f65252" : "#59676e"}
                  size={18}
                />
              </span>
              <input
                className={`input-field ${
                  errors.email ? "input-error" : "input-normal"
                }`}
                type="email"
                id="full-email"
                placeholder="Enter your email"
                {...register("email")}
              />
            </div>
            {errors.email && (
              <div className="error-message">
                <RiInformationLine size={"18px"} />
                <p className="error-text">{errors.email.message}</p>
              </div>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="password" className="input-label">
              Choose Password
            </label>
            <div className="input-wrapper">
            <span className="input-icon">
                <CiLock
                  color={errors.password ? "#f65252" : "#59676e"}
                  size={18}
                />
              </span>
             
              <div className="input-second">
              <input
                className={`input-field ${
                  errors.password ? "input-error" : "input-normal"
                }`}
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                required
                {...register("password")}
              />
             <button
                type="button"
                className="show-password-toggle"
                onClick={handleShowPassword}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <FaEyeSlash
                    color={errors.password ? "#f65252" : "#59676e"}
                    size={18}
                  />
                ) : (
                  <FaEye
                    color={errors.password ? "#f65252" : "#59676e"}
                    size={18}
                  />
                )}
              </button>
              </div>
            </div>
            {errors.password && (
              <div className="error-message">
                <RiInformationLine size={"18px"} />
                <p className="error-text">{errors.password.message}</p>
              </div>
            )}
          </div>

          <div className="checkbox-group">
            <input
              type="checkbox"
              name="save-details"
              id="save-details"
              className="checkbox"
            />
            <label htmlFor="save-details" className="checkbox-label">
              Save details
            </label>
            
          </div>
          <Link href={"/auth/forgot-password"} className="forgot-password-link">
              Forgot password
            </Link>
          <button
            className={`submit-button ${
              allFieldsFilled ? "active-button" : "disabled-button"
            }`}
            type="submit"
            disabled={!isValid || isLoading}
          >
            {isLoading ? (
              <div className="loading-spinner">
                <FaRegCircle className="spinner-icon" />
              </div>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
