import React, { useContext, useState } from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormInput from "../components/FormInput";
import { useMutation } from "@tanstack/react-query";
import { api, loginUserFn } from "../routes/usersApi";
import { UserContext } from "../providers/UserProvider";
import Cookies from "js-cookie";

const LoginSchema = z.object({
  email: z
    .string()
    .min(1, "*Email address is required!")
    .email("*Email Address is invalid!"),
  password: z.string().min(1, "Password is required"),
});

// extract the inferred type
export type LoginInput = z.TypeOf<typeof LoginSchema>;

const Login = () => {
  const userContext = useContext(UserContext);
  const getProfile = () => {
    api.get("/profile", { withCredentials: true }).then((res) => {
      console.log(res.data);
      console.log("Get Profile Clicked");
    });
  };
  const { mutate: loginUser } = useMutation(
    (userData: LoginInput) => loginUserFn(userData),
    {
      onMutate(variables) {
        // store.setRequestLoading(true);
      },
      onSuccess: (res) => {
        console.log(res);
        //Cookies.set("token", res.access_token, { httpOnly: true, expires: 7 });
        /*  store.setRequestLoading(false);
        toast.success("You successfully logged in");
        navigate(from); */
      },
      onError: (error: any) => {
        //store.setRequestLoading(false);
        if (Array.isArray((error as any).response.data.error)) {
          /* (error as any).response.data.error.forEach((el: any) =>
            toast.error(el.message, {
              position: "top-right",
            })
          ); */
          console.log(error);
        } else {
          console.log(error);
          /* toast.error((error as any).response.data.message, {
            position: "top-right",
          }); */
        }
      },
    }
  );

  const methods = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
    shouldUseNativeValidation: true,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmitHandler: SubmitHandler<LoginInput> = (values) => {
    loginUser(values);
  };

  return (
    <div>
      <FormProvider {...methods}>
        <form
          className="flex flex-col justify-center items-center"
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <FormInput label="Email" name="email" type="email" />
          <FormInput label="Password" name="password" type="password" />

          <input type="submit" className="p-btn" />
        </form>
      </FormProvider>
      <button className="p-btn" onClick={getProfile}>
        Get User Info
      </button>
    </div>
  );
};

export default Login;
