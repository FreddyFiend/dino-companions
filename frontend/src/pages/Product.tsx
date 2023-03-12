import React from "react";
import { useParams } from "react-router-dom";

const Product = () => {
  let { id } = useParams();

  return (
    <div>
      Product Page
      {id}
    </div>
  );
};

export default Product;
