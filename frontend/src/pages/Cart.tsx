import React, { useState } from "react";
import cartStore from "../providers/cartStore";
import CartItems from "../components/CartItems";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { checkoutFn } from "../routes/usersApi";
import { CartItemDto } from "../@types/cartItem";
import userStore from "../providers/userStore";
import { toast } from "react-toastify";

const Cart = () => {
  const { cartItems, totalPrice } = cartStore();
  const { user } = userStore();
  const { setIsScreenLoading } = userStore();

  const { mutate: checkout } = useMutation(
    (cartItems: CartItemDto[]) => {
      const chItems = cartItems.map((item) => {
        return { itemId: item.id, quantity: item.qty };
      });
      return checkoutFn(chItems);
    },
    {
      onMutate() {
        setIsScreenLoading(true);
        // store.setRequestLoading(true);
      },
      onSuccess: (res) => {
        window.location.href = res;
        console.log(res);
        setIsScreenLoading(false);

        // toast.success(`Logged in as ${res.data.user.email}`);
        // navigate("/");
        // setUser(res.data.user);
        // localStorage.setItem("user", JSON.stringify(res.data.user));
        /*  store.setRequestLoading(false);
   
        navigate(from); */
      },
      onError: (error: any) => {
        setIsScreenLoading(false);

        // store.setRequestLoading(false);
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

  return (
    <div className="min-h-screen flex flex-col justify-start items-center">
      <div className="text-center p-8 font-bold text-3xl ">Cart Items</div>

      {cartItems.length !== 0 ? (
        <CartItems items={cartItems} />
      ) : (
        <div className=" p-8  text-xl"> No dinos found in the cart yet!</div>
      )}
      {/* <Link to="/checkout"> */}
      <button className="btn btn-blue mt-8" onClick={() => checkout(cartItems)}>
        Checkout
      </button>
      {/* </Link> */}
      <div className="h-1 w-5/6 bg-gray-500 m-5"></div>
      <h3 className="text-2xl font-light ">Total amount: ${totalPrice}</h3>
    </div>
  );
};

export default Cart;
