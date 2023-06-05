import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { deleteProduct, getProducts } from "../routes/usersApi";
import { productDto } from "../@types/product";
import StarRatings from "../components/StarRatings";
import { AiFillDelete } from "react-icons/ai";

import DeleteProduct from "../components/dialogs/DeleteProduct";
import userStore from "../providers/userStore";

const AdminProducts = () => {
  const { setIsScreenLoading } = userStore();
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts("?" + "date=desc"),
  });

  const { mutate: deleteProductMutate } = useMutation(
    (id: string) => deleteProduct(id),
    {
      onMutate() {
        setShowDeleteDialog(false);
        setIsScreenLoading(true);
        // store.setRequestLoading(true);
      },
      onSuccess: (res) => {
        console.log(res);
        setIsScreenLoading(false);

        /*  store.setRequestLoading(false);
   
        navigate(from); */
      },
      onError: (error: any) => {
        setIsScreenLoading(false);

        //store.setRequestLoading(false);
        // if (Array.isArray((error as any).response.data.error)) {
        //   (error as any).response.data.error.forEach((el: any) =>
        //     toast.error(el.message, {
        //       position: "top-right",
        //     })
        //   );
        //   console.log(error);
        // } else {
        //   console.log(error);
        //   toast.error((error as any).response.data.message, {
        //     position: "top-right",
        //   });
        // }
      },
    }
  );
  let [showDeleteDialog, setShowDeleteDialog] = useState(false);

  let [selectedId, setSelectedId] = useState("");

  const onDeleteSelect = (id: string) => {
    setSelectedId(id);
    setShowDeleteDialog(true);
  };

  return (
    <div>
      <DeleteProduct
        onAction={() => deleteProductMutate(selectedId)}
        onClose={() => setShowDeleteDialog(false)}
        visibility={showDeleteDialog}
      />
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {data &&
            data[1].map((product: productDto) => (
              <div className="lg:w-1/4 md:w-1/2 p-4 w-full " key={product.id}>
                <a className="block relative h-48 rounded overflow-hidden">
                  <img
                    alt="ecommerce"
                    className="object-cover object-center w-full h-full block"
                    src={product.imageThumb}
                  />
                </a>
                <div className="mt-4 flex justify-between items-end">
                  <div>
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                      <StarRatings rating={product.rating} size={16} />
                    </h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">
                      {product.title}
                    </h2>
                    <p className="mt-1">{product.seller.email}</p>
                  </div>
                  <button className="btn  btn-amber float-right">
                    <AiFillDelete
                      className=" text-red-500"
                      size={28}
                      onClick={() => onDeleteSelect(product.id)}
                    />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
