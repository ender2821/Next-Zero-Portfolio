"use client";

import { useForm } from "react-hook-form";
import { sendEmail } from "../app/utils/sendContactEmail";

export type FormData = {
  fullName: string;
  email: string;
  message: string;
};

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  function onSubmit(formData: FormData) {
    sendEmail(formData);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative">
      <div>
        <label
          htmlFor="full name"
          className="absolute -left-[9999px] invisible"
        >
          Full Name
        </label>
        {errors.fullName && (
          <p className="text-red-600">Please check Fullname field</p>
        )}
        <input
          type="text"
          placeholder="Full Name"
          className="bg-transparent border-0 border-b-2 border-[#5f6368] w-full mb-8 font-bold placeholder:fnt-bold p-2"
          {...register("fullName", { required: true })}
        />
      </div>
      <div>
        <label htmlFor="email" className="absolute -left-[9999px] invisible">
          Email
        </label>
        {errors.email && (
          <p className="text-red-600">Please check Email field</p>
        )}
        <input
          type="email"
          placeholder="Email"
          className="bg-transparent border-0 border-b-2 border-[#5f6368] w-full mb-8 font-bold placeholder:fnt-bold p-2"
          {...register("email", {
            required: true,
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Entered value does not match email format",
            },
          })}
        />
      </div>
      <div>
        <label htmlFor="message" className="absolute -left-[9999px] invisible">
          Message
        </label>
        {errors.message && (
          <p className="text-red-600">Please check Message field</p>
        )}
        <textarea
          rows={4}
          placeholder="Message"
          className="bg-transparent border-2 border-[#5f6368] w-full mb-8 font-bold placeholder:fnt-bold p-2"
          {...register("message", { required: true })}
        />
      </div>
      <div>
        <button
          type={"submit"}
          className="bg-[#27D5E8] p-4 text-black font-bold w-full hover:scale-105 focus:scale-105 transform transition-transform"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
