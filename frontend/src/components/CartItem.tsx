import React from "react";
import { number, string } from "zod";
import { CartItemDto } from "../@types/cartItem";
import cartStore from "../providers/cartStore";

import {
  AiOutlineDown,
  AiOutlineUp,
  AiFillDelete,
  AiOutlineDoubleLeft,
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineDoubleRight,
} from "react-icons/ai";
import { Link } from "react-router-dom";

interface Props {
  item: CartItemDto;
}

const CartItem: React.FC<Props> = ({ item }) => {
  const { removeCartItem, changeCartItemQty } = cartStore();

  return (
    <div className="p-4 rounded-md shadow-lg bg-white mx-auto ">
      <div className=" flex flex-col md:flex-row md:flex md:text-start text-start md:justify-start justify-center items-center  md:items-stretch gap-2 ">
        <div className="header  basis-1/2 ">
          <img className="ml-auto rounded-md" src={item.imageThumb} />
        </div>
        <div className="px-2  py-2  basis-1/2">
          <Link to={`/dino/${item.id}`}>
            <div className="font-semibold  text-3xl hover:cursor-pointer ">
              {item.title}
            </div>{" "}
          </Link>{" "}
          <div className=" text-lg pt-2">
            <span className="font-semibold text-xl ">${item.price}</span>{" "}
          </div>{" "}
          <div className="action text-center  flex items-center  pt-2  rounded-md   ">
            <AiOutlineDoubleLeft
              size={26}
              onClick={() => changeCartItemQty(item.id, -10)}
              className="cursor-pointer text-indigo-700"
            />
            <AiOutlineLeft
              size={26}
              onClick={() => changeCartItemQty(item.id, -1)}
              className="cursor-pointer text-indigo-600"
            />
            <div className="text-xl select-none font-bold  my-auto px-2">
              {item.qty}
            </div>
            <AiOutlineRight
              size={26}
              onClick={() => changeCartItemQty(item.id, 1)}
              className="cursor-pointer text-indigo-600"
            />{" "}
            <AiOutlineDoubleRight
              size={26}
              onClick={() => changeCartItemQty(item.id, 10)}
              className="cursor-pointer text-indigo-700"
            />
          </div>
          <div className="text-lg pt-1  ">
            Total:{" "}
            <span className="text-2xl font-semibold text-indigo-500">
              ${item.qty * item.price}
            </span>
          </div>
        </div>
        <AiFillDelete
          size={28}
          className="text-red-600 cursor-pointer m-auto "
          onClick={() => removeCartItem(item.id)}
        />
      </div>
    </div>
  );
};

export default CartItem;
