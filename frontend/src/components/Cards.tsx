import React from "react";
import Card from "./Card";
import { productDto } from "../@types/product";

interface Props {
  products: productDto[];
}

const Cards: React.FC<Props> = ({ products }) => {
  return (
    <div className=" flex justify-evenly flex-wrap gap-2 ">
      {products?.map((product: productDto) => (
        <Card product={product} key={product.id} />
      ))}
    </div>
  );
};

export default Cards;
