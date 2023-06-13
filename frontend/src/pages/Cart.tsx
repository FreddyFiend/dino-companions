import React, { useState } from "react";
import cartStore from "../providers/cartStore";
import CartItems from "../components/CartItems";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems } = cartStore();

  return (
    <div className="min-h-screen flex flex-col justify-start items-center">
      <div className="text-center p-8 font-bold text-3xl ">Cart Items</div>

      {cartItems.length !== 0 ? (
        <CartItems items={cartItems} />
      ) : (
        <div className=" p-8  text-xl"> No dinos found in the cart yet!</div>
      )}
      <Link to="/checkout">
        <button className="btn btn-blue mt-8">Checkout</button>
      </Link>
    </div>
  );
};

export default Cart;
