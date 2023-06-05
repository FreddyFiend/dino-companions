import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { useForm, SubmitHandler, FormProvider, set } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormInput from "../components/FormInput";
import { useMutation } from "@tanstack/react-query";
import { postProductFn } from "../routes/usersApi";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import userStore from "../providers/userStore";

//   id          String   @id @default(uuid())
//   title       String
//   description String?
//   published   Boolean? @default(false)
//   seller      User?    @relation(fields: [sellerId], references: [id])
//   sellerId    String?
//   quantity    Int
//   price       Float
//   createdAt   DateTime @default(now())
//   updatedAt   DateTime @updatedAt
const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const ProductSchema = z.object({
  title: z.string().max(50, "*Max 50 characters!"),
  description: z.string().max(3000, "*Max 3000 characters!"),
  image: z
    .any()
    .refine((file) => file[0]?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file[0]?.type),
      "Only .jpg, .jpeg, and .png formats are supported."
    ),
  quantity: z.number(),
  price: z.number(),
});

// extract the inferred type
export type ProductInput = z.TypeOf<typeof ProductSchema>;

const PostProduct = () => {
  const navigate = useNavigate();
  const { user, setUser, logoutUser } = userStore();

  const { mutate: postProduct } = useMutation(
    (productData: FormData) => postProductFn(productData),
    {
      onMutate() {
        // store.setRequestLoading(true);
      },
      onSuccess: (res) => {
        toast.success(`Successfully published the ${res.data.title}`);
        navigate("/");
        console.log(res.data);
        /*  store.setRequestLoading(false);
   
        navigate(from); */
      },
      onError: (error: any) => {
        if (error.response.status === 401) {
          logoutUser();
        }
        // console.error(error);
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

  const methods = useForm<ProductInput>({
    resolver: zodResolver(ProductSchema),
    shouldUseNativeValidation: false,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmitHandler: SubmitHandler<ProductInput> = async (data) => {
    let formData = new FormData();
    formData.append("image", data.image[0]);

    const { image, ...serializedData } = data;
    formData.append("data", JSON.stringify(serializedData));
    /* 
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("quantity", data.quantity.toString());
    formData.append("price", data.price.toString()); */

    //console.log(data);
    postProduct(formData);
  };

  return (
    <div>
      <FormProvider {...methods}>
        <form
          className="flex flex-col justify-center items-center"
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <FormInput label="Title" name="title" type="text" />
          <FormInput label="Description" name="description" type="text" />
          <FormInput label="Image" name="image" type="file" />
          <FormInput label="Quantity" name="quantity" type="number" />
          <FormInput label="Price" name="price" type="number" />

          <input type="submit" className="btn btn-blue mt-3" />
        </form>
      </FormProvider>
    </div>
  );
};

export default PostProduct;
