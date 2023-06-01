import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Cards from "../components/Cards";
import Hero from "../components/Hero";
import Users from "../components/Users";
import { getProducts } from "../routes/usersApi";
import { useQuery } from "@tanstack/react-query";
import { Card } from "../components";
import { productDto } from "../@types/product";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

const Homepage = () => {
  const newProductsScroll = useRef<HTMLDivElement | null>(null);
  const bestProductsScroll = useRef<HTMLDivElement | null>(null);

  const newProducts = useQuery({
    queryKey: ["products", "date=desc"],
    queryFn: () => getProducts("?" + "date=desc"),
  });
  const bestProducts = useQuery({
    queryKey: ["products", "best=desc"],
    queryFn: () => getProducts("?" + "best=desc"),
  });

  return (
    <div className=" ">
      <Hero />
      <h4 className=" px-2 text-3xl font-semibold pt-8 pb-2">NEW DINOS</h4>

      <div className="pt-2 flex gap-4 overflow-x-hidden relative">
        {" "}
        <div className="absolute right-1 top-1/2 bg-cyan-100 p-1 bg-opacity-50 rounded-full z-10">
          {" "}
          <AiOutlineArrowRight
            size={40}
            onClick={() =>
              newProductsScroll?.current?.scrollTo({
                left: newProductsScroll?.current?.scrollLeft + 200,
                behavior: "smooth",
              })
            }
          />{" "}
        </div>
        <div className="absolute left-1 top-1/2 bg-cyan-100 p-1 bg-opacity-50 rounded-full z-10">
          {" "}
          <AiOutlineArrowLeft
            size={40}
            onClick={() =>
              newProductsScroll?.current?.scrollTo({
                left: newProductsScroll?.current?.scrollLeft - 200,
                behavior: "smooth",
              })
            }
          />{" "}
        </div>
        <div
          ref={newProductsScroll}
          className="pt-2 flex gap-4 overflow-x-auto relative"
        >
          {newProducts.isSuccess &&
            newProducts.data[1].map((product: productDto) => (
              <Card product={product} />
            ))}
          <Link
            to={"/products"}
            className="bg-slate-100 rounded-md p-4 min-w-[210px] hover:cursor-pointer text-center flex justify-center items-center"
          >
            {" "}
            <h3 className="text-2xl font-bold">SEE MORE</h3>
          </Link>
        </div>
      </div>

      <h4 className=" px-2 text-3xl font-semibold pt-8 pb-2">BEST DINOS</h4>
      <div className=" flex gap-4 overflow-x-hidden relative pb-24">
        {" "}
        <div className="absolute right-1 top-1/2 bg-cyan-100 p-1 bg-opacity-50 rounded-full z-10">
          {" "}
          <AiOutlineArrowRight
            size={40}
            onClick={() =>
              bestProductsScroll?.current?.scrollTo({
                left: bestProductsScroll?.current?.scrollLeft + 200,
                behavior: "smooth",
              })
            }
          />{" "}
        </div>
        <div className="absolute left-1 top-1/2 bg-cyan-100 p-1 bg-opacity-50 rounded-full z-10">
          {" "}
          <AiOutlineArrowLeft
            size={40}
            onClick={() =>
              bestProductsScroll?.current?.scrollTo({
                left: bestProductsScroll?.current?.scrollLeft - 200,
                behavior: "smooth",
              })
            }
          />{" "}
        </div>
        <div
          ref={bestProductsScroll}
          className="pt-2 flex gap-4 overflow-x-hidden relative"
        >
          {bestProducts.isSuccess &&
            bestProducts.data[1].map((product: productDto) => (
              <Card product={product} />
            ))}
          <Link
            to={"/products"}
            className="bg-slate-100 rounded-md p-4 min-w-[210px] hover:cursor-pointer text-center flex justify-center items-center"
          >
            {" "}
            <h3 className="text-2xl font-bold">SEE MORE</h3>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
