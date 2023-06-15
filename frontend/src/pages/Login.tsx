import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { useForm, SubmitHandler, FormProvider, set } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormInput from "../components/FormInput";
import { useMutation } from "@tanstack/react-query";
import { api, apiAuth, loginUserFn } from "../routes/usersApi";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import userStore from "../providers/userStore";
import LoadingScreen from "../components/LoadingScreen";

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
  const navigate = useNavigate();
  const { user, setUser, logoutUser, setIsScreenLoading } = userStore();

  const { mutate: loginUser } = useMutation(
    (userData: LoginInput) => loginUserFn(userData),
    {
      onMutate() {
        setIsScreenLoading(true);
        // store.setRequestLoading(true);
      },
      onSuccess: (res) => {
        setIsScreenLoading(false);

        toast.success(`Logged in as ${res.data.user.email}`);
        navigate("/");
        setUser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        /*  store.setRequestLoading(false);
   
        navigate(from); */
      },
      onError: (error: any) => {
        setIsScreenLoading(false);

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

  const methods = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
    shouldUseNativeValidation: true,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;
  const logout = () => {
    logoutUser();
  };

  const onSubmitHandler: SubmitHandler<LoginInput> = (values) => {
    loginUser(values);
    //signinUser(values);
  };
  return (
    <div className="flex flex-col  items-center h-screen">
      email: john@doe.com pass: JohnDoe666
      <h3 className="text-xl pt-16 pb-2 font-semibold">Login</h3>
      <FormProvider {...methods}>
        <form
          className="flex flex-col justify-center items-center "
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <FormInput label="Email" name="email" type="email" />
          <FormInput label="Password" name="password" type="password" />

          <input type="submit" className="btn btn-green mt-3" />
        </form>
      </FormProvider>
      <h1 className="pt-4 text-lg text-center">
        Not registered yet?{" "}
        <Link className="font-bold text-blue-600" to="/signup">
          Signup!
        </Link>{" "}
      </h1>
    </div>
  );
};

export default Login;
