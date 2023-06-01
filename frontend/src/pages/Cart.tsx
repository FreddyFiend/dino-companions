import React, { useState } from "react";
import cartStore from "../providers/cartStore";
import CartItems from "../components/CartItems";

const Cart = () => {
  const { cartItems } = cartStore();

  return (
    <div>
      <div className="text-center p-4 font-bold text-3xl h-screen">
        Cart Items
      </div>

      {cartItems ? (
        <CartItems items={cartItems} />
      ) : (
        <div className="text-xl">Your cart is empty</div>
      )}
    </div>
  );
};

export default Cart;
