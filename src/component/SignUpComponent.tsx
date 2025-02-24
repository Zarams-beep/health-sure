"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CiMail, CiLock } from "react-icons/ci";
import { FaEye, FaEyeSlash, FaRegCircle } from "react-icons/fa";
import { RiMentalHealthFill, RiInformationLine} from "react-icons/ri";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSubmitFormData } from "@/types/auth";
// import { SignUpFormData } from "@/types/auth";
import { signUpSchema } from "@/features/SignUpSchema";
import { useRouter } from "next/navigation";

const SignUp: React.FC = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch
  } = useForm<SignUpSubmitFormData>({ resolver: zodResolver(signUpSchema), mode: "onSubmit" });
  const [isLoading, setIsLoading] = useState(false);
 
  const submitData = async () => {
    setIsLoading(true);
    router.push("/auth/log-in");
    setIsLoading(false);
  };

    // Simulate the delay for 2 seconds
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // ------ changing button color dependent on form validation ------
  const fullName = watch("fullName");
  const email = watch("email");
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");
  const allFieldsFilled = fullName && email && password && confirmPassword;


  return (
    <>
      <div
        className="login-container signup-container">
        {/* -------- left half of signup page -------- */}
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
        {/* -------- form input of signup page -------- */}
        <div className="login-form-container">
          {/* -------- form heading -------- */}
          <div className="form-header">
            <h2
              className="form-title"
            >
              Create an account
            </h2>
            <p className="form-subtitle">
              Already have an account?&nbsp;&nbsp;
              <Link
                href={"/auth/log-in"}
                className="">
                Login
              </Link>
            </p>
          </div>
          {/* -------- form details and input -------- */}
          <form
            className="login-form"
            action=""
            onSubmit={handleSubmit(submitData)}
          >
            {/* -------- form details and save details button -------- */}
            <div className="flex flex-col gap-3">
              {/* -------- form details only -------- */}
              <div className="sign-up-section">
                {/* -------- full name -------- */}
                <div className="input-group">
                  <label
                    htmlFor="full-name"
                    className="input-label"
                  >
                    Full Name
                  </label>
                  <div className="input-wrapper">
                  <span className="input-icon">
                      <RiMentalHealthFill
                      color={errors.email ? "#f65252" : "#59676e"}
                      size={18}
                      />
                    </span>
                    <input
                      className={`input-field ${
                        errors.fullName
                          ? "input-error"
                          : "input-normal"
                      }`}
                      type="text"
                      id="full-name"
                      placeholder="Enter your full name"
                      required
                      {...register("fullName")}
                    />
                 
                  </div>
                  {errors.fullName && (
                    <div className="error-message">
                      <RiInformationLine size={"18px"} />
                      <p className="error-text">
                        {errors.fullName.message}
                      </p>
                    </div>
                  )}
                </div>
                {/* -------- email -------- */}
                <div className="input-group">
                  <label
                    htmlFor="full-email"
                    className="input-label"
                  >
                    Full Email
                  </label>
                  <div className="input-wrapper">
                  <span className="input-icon">
                      <CiMail
                       color={errors.password ? "#f65252" : "#59676e"}
                       size={18}
                      />
                    </span>
                    <input
                      className={`input-field ${
                        errors.email
                          ? "input-error" : "input-normal"
                      }`}
                      type="email"
                      id="full-email"
                      placeholder="Enter your full email"
                      required
                      {...register("email")}
                    />
                   
                  </div>
                  {errors.email && (
                    <div className="error-message">
                      <RiInformationLine size={"18px"} />
                      <p className="error-text">
                        {errors.email.message}
                      </p>
                    </div>
                  )}
                </div>
                {/* -------- password -------- */}
                <div className="input-group">
                  <label
                    htmlFor="password"
                    className="input-label"
                  >
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
                      type={showPassword ? 'text' : 'password'}
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
                    </button></div>
                  </div>
                  {errors.password && (
                    <div className="error-message">
                      <RiInformationLine size={"18px"} />
                      <p className="error-text">
                        {errors.password.message}
                      </p>
                    </div>
                  )}
                </div>
                {/* -------- confirm password -------- */}
                <div className="input-group">
                  <label
                    htmlFor="confirm-password"
                    className="input-label"
                  >
                    Confirm Password
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
                        errors.confirmPassword
                          ? "input-error" : "input-normal"
                      }`}
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirm-password"
                      placeholder="Enter your password"
                      required
                      {...register("confirmPassword")}
                    />
                   <button type="button"
                className="show-password-toggle" onClick={handleShowConfirmPassword}
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}>
                    {showConfirmPassword ? (
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
                    </button></div>

                  </div>
                  {errors.confirmPassword && (
                    <div className="error-message">
                      <RiInformationLine size={"18px"} />
                      <p className="error-text">
                        {errors.confirmPassword.message}
                      </p>
                    </div>
                  )}
                </div>
                {/* -------- save details checkbox -------- */}
              </div>
              <div className="checkbox-group">
                <input
                  type="checkbox"
                  name="save-details"
                  id="save-details"
                  className="checkbox"
                />
                <label htmlFor="save-details" className="checkbox-label">Save details</label>
              </div>
            </div>
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
    "Create account"
  )}
</button>
          </form>
        </div>
      </div>
    </>
  );
};
export default SignUp;
