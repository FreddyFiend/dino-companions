import React from "react";
import { productDto } from "../@types/product";
import glass from "../assets/glass.jpg";
interface Props {
  product: productDto;
}
const Card: React.FC<Props> = ({ product }) => {
  const newProduct = JSON.stringify(product);
  return (
    <div className="bg-white rounded-md p-4">
      <div className="header">
        <img src={product.imageThumb} />
      </div>
      <div className="flex justify-between">
        <div className="first">
          <h3 className="font-semibold text-lg">{product.title}</h3>
          <h6 className="font-light text-base">{product.seller.name}</h6>
        </div>
        <div className="second">
          <h4 className="text-xl font-bold">{product.price}</h4>
        </div>
      </div>
    </div>
  );
};

export default Card;
