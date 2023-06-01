import React, { useState } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormInput from "../components/FormInput";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { SignUpUserFn } from "../routes/usersApi";
import userStore from "../providers/userStore";
const SignUpSchema = z.object({
  name: z.string().min(5, "*Please type at least 5 letters!"),
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
export type SignUpInput = z.TypeOf<typeof SignUpSchema>;

const SignUp = () => {
  const navigate = useNavigate();
  const { user, setUser, logoutUser } = userStore();

  const { mutate: signUpUser } = useMutation(
    (userData: SignUpInput) => SignUpUserFn(userData),
    {
      onMutate() {
        // store.setRequestLoading(true);
      },
      onSuccess: (res) => {
        toast.success(`Logged in as ${res.data.user.email}`);
        navigate("/");
        setUser(res.data.user);
        /*  store.setRequestLoading(false);
   
        navigate(from); */
      },
      onError: (error: any) => {
        //store.setRequestLoading(false);
        if (Array.isArray((error as any).response.data.error)) {
          (error as any).response.data.error.forEach((el: any) =>
            toast.error(el.message, {
              position: "top-right",
            })
          );
          console.log(error);
        } else {
          console.log(error);
          toast.error((error as any).response.data.message, {
            position: "top-right",
          });
        }
      },
    }
  );

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
    //  Executing the loginUser Mutation
    signUpUser(values);
  };

  return (
    <div>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmitHandler)}
          className="flex flex-col justify-center items-center h-screen"
        >
          <FormInput label="Name" name="name" type="text" />
          <FormInput label="Email" name="email" type="email" />
          <FormInput label="Password" name="password" type="password" />
          <input type="submit" className="btn btn-green mt-4" />
        </form>
      </FormProvider>
    </div>
  );
};

export default SignUp;
