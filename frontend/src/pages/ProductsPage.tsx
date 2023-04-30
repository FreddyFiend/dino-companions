import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../routes/usersApi";
import Cards from "../components/Cards";
import ProductFilters from "../components/ProductFilters";
import { useSearchParams } from "react-router-dom";

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [dateFilter, setDateFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [priceFilter, setPriceFilter] = useState("");

  const onDateFilterChange = (filter: string) => {
    setDateFilter(filter);
    searchParams.set("date", filter);
  };

  const onPriceFilterChange = (filter: string) => {
    setPriceFilter(filter);
    searchParams.set("price", filter);
  };
  const { data, isLoading } = useQuery({
    queryKey: ["products", searchParams.toString()],
    queryFn: () => getProducts("?" + searchParams.toString()),
  });

  const setPageParam = (pageNum: number) => {
    console.log(pageNum);
    setCurrentPage(pageNum);
    searchParams.set("page", pageNum.toString());
    console.log(searchParams.toString());
  };

  return (
    <div className="">
      <div className="text-lg">Products Page</div>
      <div className="flex flex-row gap-2 flex-wrap">
        <select
          onChange={(event) => onDateFilterChange(event.target.value)}
          value={dateFilter}
        >
          <option value="desc">Recent</option>
          <option value="asc">Oldest</option>
        </select>
        <select
          onChange={(event) => onPriceFilterChange(event.target.value)}
          value={priceFilter}
        >
          <option value="all">All</option>
          <option value="0-100">0 to 100</option>
          <option value="100-1000">100 to 1000</option>
          <option value="1000-5000">1000 to 5000</option>
          <option value="5000-10000">5000 to 10000</option>
        </select>
      </div>

      <Cards products={data && data[1]} />
      <ul className="flex flex-row justify-center gap-4">
        {data &&
          [...Array(data[0])].map((elementInArray, index) => (
            <li className=" " key={index}>
              <button
                className={`bg-slate-300 ${
                  index === currentPage ? "bg-slate-300" : "bg-slate-100"
                } rounded px-3 py-1 hover:cursor-pointer font-semibold text-gray-600`}
                onClick={() => setPageParam(index)}
              >
                {index + 1}
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ProductsPage;
