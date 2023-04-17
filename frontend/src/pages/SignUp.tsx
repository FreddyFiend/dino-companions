import React, { useState } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormInput from "../components/FormInput";

const SignUpSchema = z.object({
  name: z.string().min(5, "*Please type at least 5 letters!"),
  username: z.string().min(5, "*Please type at least 5 letters!"),
  email: z
    .string()
    .min(1, "*Email address is required!")
    .email("*Email Address is invalid!"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

// extract the inferred type
type SignUpInput = z.TypeOf<typeof SignUpSchema>;

const SignUp = () => {
  const methods = useForm<SignUpInput>({
    resolver: zodResolver(SignUpSchema),
    shouldUseNativeValidation: true,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmitHandler: SubmitHandler<SignUpInput> = (values) => {
    // 👇 Executing the loginUser Mutation
    console.log(values);
  };

  return (
    <div>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmitHandler)}
          className="flex flex-col justify-center items-center"
        >
          <FormInput label="Name" name="name" type="text" />
          <FormInput label="Username" name="username" type="text" />
          <FormInput label="Email" name="email" type="email" />
          <FormInput label="Password" name="password" type="password" />
          <input type="submit" className="p-btn mt-4" />
        </form>
      </FormProvider>
    </div>
  );
};

export default SignUp;
