import React from "react";
import CartItem from "./CartItem";
import { CartItemDto } from "../@types/cartItem";

interface Props {
  items: CartItemDto[];
}

const CartItems: React.FC<Props> = ({ items }) => {
  return (
    <div className="">
      {items.map((item) => {
        return <CartItem item={item} key={item.id} />;
      })}
    </div>
  );
};

export default CartItems;
