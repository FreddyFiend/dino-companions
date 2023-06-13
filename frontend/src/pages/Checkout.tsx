import React, { useState } from "react";
import cartStore from "../providers/cartStore";
import { CartItemDto } from "../@types/cartItem";
import CartItems from "../components/CartItems";
const Checkout = () => {
  const { cartItems, totalPrice } = cartStore();

  return (
    <div>
      <ul className="p-8 flex flex-col gap-8">
        {cartItems.map((item: CartItemDto) => {
          return (
            <li key={item.id} className="flex gap-4">
              <img src={item.imageThumb} alt={item.title} />
              <div className="flex flex-col">
                <h6 className="text-lg font-bold">{item.title}</h6>{" "}
                <p>${item.price}</p> <p>Quantity: {item.qty}</p>
                <p>Total: ${item.price * item.qty}</p>
              </div>
            </li>
          );
        })}
      </ul>
      <h3 className="text-2xl font-bold p-8"> Total Amount: ${totalPrice} </h3>
    </div>
  );
};

export default Checkout;
