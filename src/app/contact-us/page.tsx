"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodType } from "zod";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaTwitter, FaDiscord } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io";
import { FaPhoneVolume, FaLocationDot } from "react-icons/fa6";
import { useState } from "react";
// Type definition for form data
export type ContactUsFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  subject: string;
  message?: string;
};

// Schema validation using Zod
export const contactUsSchema: ZodType<ContactUsFormData> = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^\d+$/, "Phone number must contain only digits"),
  subject: z.string().min(1, "Subject selection is required"),
  message: z.string().min(1, "Message is required"),
});

export default function ContactUsForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    watch,
  } = useForm<ContactUsFormData>({
    resolver: zodResolver(contactUsSchema),
    mode: "onSubmit",
  });

  const submitData = (data: ContactUsFormData) => {
    console.log("Form submitted:", data);
    if (!allFieldsFilled || (isSubmitted && Object.keys(errors).length > 0)) {
      setLoading(false);
    } else {
      setLoading(true);
    }
    router.push("#");
  };

  // Dynamic button styling logic
  const allFieldsFilled =
    watch("firstName") &&
    watch("lastName") &&
    watch("email") &&
    watch("phoneNumber") &&
    watch("subject") &&
    watch("message");

  return (
    <>
      <div className="contactUs-form-section">
        <div className="container">
          <div className="contactUs-form-body">
            <header className="firstHeader">
              <h2>Contact Us</h2>
              <h6>Any question or remarks? Just write us a message!</h6>
            </header>

            <div className="contactUs-body">
              {/* Side One */}
              <div className="contactUs-part-one">
                <header>
                  <h3>Let’s talk with us</h3>
                  <p>
                    Questions, comments, or suggestions? Simply fill in the form
                    and we’ll be in touch shortly.
                  </p>
                </header>

                {/* Contacts */}
                <div className="contactUs-details">
                  {/* Phone */}
                  <div className="contactUs-details-small">
                    <FaPhoneVolume />
                    <p>1234567890</p>
                  </div>
                  {/* Email */}
                  <div className="contactUs-details-small">
                    <MdOutlineMailOutline />
                    <p>example@gmail.com</p>
                  </div>
                  {/* Location */}
                  <div className="contactUs-details-small">
                    <FaLocationDot />
                    <p>Example Address Nigeria.</p>
                  </div>
                </div>

                {/* Socials */}
                <div className="contactUs-socials">
                  <button className="twitter">
                    <FaTwitter />
                  </button>
                  <button>
                    <IoLogoInstagram className="instagram" />
                  </button>
                  <button>
                    <FaDiscord className="discord" />
                  </button>
                </div>

                
              </div>

              {/* Side Two */}
              <div className="contactUs-part-two">
                <form
                  className="contactUs-form"
                  onSubmit={handleSubmit(submitData)}
                >
                  {/* First Name */}
                  <div className="contactUs-input">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      id="firstName"
                      {...register("firstName")}
                      placeholder="First Name"
                      className={`${
                        errors.firstName
                          ? "error-red-border"
                          : "error-gray-border"
                      }`}
                    />
                    {errors.firstName && (
                      <p className="text-[red]">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>

                  {/* Last Name */}
                  <div className="contactUs-input">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      id="lastName"
                      {...register("lastName")}
                      placeholder="Last Name"
                      className={`${
                        errors.lastName
                          ? "error-red-border"
                          : "error-gray-border"
                      }`}
                    />
                    {errors.lastName && (
                      <p className="text-[red]">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="contactUs-input">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      {...register("email")}
                      type="email"
                      placeholder="Enter your email"
                      className={`${
                        errors.email ? "error-red-border" : "error-gray-border"
                      }`}
                    />
                    {errors.email && (
                      <p className="text-[red]">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div className="contactUs-input">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                      id="phoneNumber"
                      {...register("phoneNumber")}
                      placeholder="Enter your phone number"
                      className={`${
                        errors.phoneNumber
                          ? "error-red-border"
                          : "error-gray-border"
                      }`}
                    />
                    {errors.phoneNumber && (
                      <p className="text-[red]">
                        {errors.phoneNumber.message}
                      </p>
                    )}
                  </div>

                  {/* Select Subject */}
                  <div className="contactUs-select">
                    <label>Select Subject?</label>
                    <div className="contactUs-subject">
                      <div>
                        <label>
                          <input
                            type="radio"
                            value="general"
                            {...register("subject")}
                          />
                          General Inquiry
                        </label>
                      </div>
                      <div>
                        <label>
                          <input
                            type="radio"
                            value="report"
                            {...register("subject")}
                          />
                          Report
                        </label>
                      </div>
                      <div>
                        <label>
                          <input
                            type="radio"
                            value="comment"
                            {...register("subject")}
                          />
                          Comment
                        </label>
                      </div>
                      <div>
                        <label>
                          <input
                            type="radio"
                            value="suggestion"
                            {...register("subject")}
                          />
                          Suggestions
                        </label>
                      </div>
                    </div>
                    {errors.subject && (
                      <p className="text-[red]">{errors.subject.message}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div className="contactUs-message">
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      {...register("message")}
                      placeholder="Enter your message"
                      className={`${
                        errors.message
                          ? "error-red-border"
                          : "error-gray-border"
                      }`}
                    />
                    {errors.message && (
                      <p className="text-[red]">{errors.message.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="contactUs-submit-container">
  <button className="contact-btn" type="submit" disabled={loading}>
    {loading ? 'Loading...' : 'Send Message'}
  </button>
</div>

                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
