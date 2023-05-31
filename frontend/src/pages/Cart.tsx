import React, { useState } from "react";
import cartStore from "../providers/cartStore";
import CartItems from "../components/CartItems";

const Cart = () => {
  const { cartItems } = cartStore();

  return (
    <div>
      <div className="text-center p-4 font-bold text-3xl">Cart Items</div>
      <CartItems items={cartItems} />
    </div>
  );
};

export default Cart;
