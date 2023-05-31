import React from "react";
import { productDto } from "../@types/product";
import glass from "../assets/glass.jpg";
import { useNavigate } from "react-router-dom";
import StarRatings from "./StarRatings";
interface Props {
  product: productDto;
}
const Card: React.FC<Props> = ({ product }) => {
  const navigate = useNavigate();
  const newProduct = JSON.stringify(product);

  return (
    <div
      className="bg-white rounded-md p-4 min-w-[210px] hover:cursor-pointer"
      onClick={() => navigate("/product/" + product.id)}
    >
      <div className="header ">
        <img src={product.imageThumb} className="" />
      </div>
      <div className="flex justify-between">
        <div className="first">
          <h3 className=" py-1 w-[120px] max-h-[58px] overflow-hidden">
            {product.title}
          </h3>
          <StarRatings rating={product.rating} size={18} />
        </div>
        <div className="second">
          <h4 className="text-lg font-bold pt-1 text-amber-500 ">
            ${product.price}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Card;
