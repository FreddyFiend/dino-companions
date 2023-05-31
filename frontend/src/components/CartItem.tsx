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
    <div className="p-4 rounded-md shadow-lg bg-white mx-auto hover:cursor-pointer ">
      <Link to={`/product/${item.id}`}>
        <div className=" flex flex-col md:flex-row md:flex md:text-start text-start justify-start items-center gap-2 ">
          <div className="header  basis-1/4 ">
            <img className="ml-auto rounded-md" src={item.imageThumb} />
          </div>
          <div className="px-2  py-2 border basis-1/4">
            <div className="font-semibold  text-3xl ">{item.title}</div>{" "}
            <div className=" text-lg pt-2">
              Price:{" "}
              <span className="font-semibold text-xl">${item.price}</span>{" "}
            </div>{" "}
          </div>
          <div className="action text-center  flex items-center  pt-2 border rounded-md p-2  basis-1/4">
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
            <div className="text-xl select-none font-bold my-auto px-2">
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
          <div className="text-lg pt-1  basis-1/4">
            Total:{" "}
            <span className="text-2xl font-semibold">
              ${item.qty * item.price}
            </span>
          </div>
          <AiFillDelete
            size={28}
            className="text-red-600 cursor-pointer m-auto "
            onClick={() => removeCartItem(item.id)}
          />
        </div>
      </Link>
    </div>
  );
};

export default CartItem;
