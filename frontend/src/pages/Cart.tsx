import React, { useState } from "react";
import cartStore from "../providers/cartStore";
import CartItems from "../components/CartItems";

const Cart = () => {
  const { cartItems } = cartStore();

  return (
    <div className="h-screen">
      <div className="text-center p-4 font-bold text-3xl ">Cart Items</div>

      {cartItems.length !== 0 ? (
        <CartItems items={cartItems} />
      ) : (
        <div className=" p-8  text-xl"> No dinos found in the cart yet!</div>
      )}
    </div>
  );
};

export default Cart;
