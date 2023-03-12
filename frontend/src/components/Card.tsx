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
      <img src={glass} />
      <div className="flex justify-between">
        <div className="first">
          <h3 className="font-semibold text-lg">Soap Today</h3>
          <p>Stars</p>
        </div>
        <div className="second">
          <h4 className="text-3xl font-bold">$59</h4>
          <h6 className="line-through">$99</h6>
        </div>
      </div>
    </div>
  );
};

export default Card;
