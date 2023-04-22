import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../routes/usersApi";
import { mrProducts } from "./Homepage";
import Cards from "../components/Cards";

const ProductsPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
  const [products, setProducts] = useState(mrProducts);
  const [currentFruit, setCurrentFruit] = useState("oranges");

  const changeFruit = (newFruit: string) => {
    setCurrentFruit(newFruit);
    console.log(currentFruit);
  };
  return (
    <div className="">
      <div className="text-lg">Products Page</div>
      <select
        onChange={(event) => changeFruit(event.target.value)}
        value={currentFruit}
      >
        <option value="apples">Red Apples</option>
        <option value="oranges">Outrageous Oranges</option>
        <option value="tomatoes">Technically a Fruit Tomatoes</option>
        <option value="bananas">Bodacious Bananas</option>
      </select>
      <Cards products={data} />
    </div>
  );
};

export default ProductsPage;
