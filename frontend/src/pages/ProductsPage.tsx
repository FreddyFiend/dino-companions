import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../routes/usersApi";
import Cards from "../components/Cards";
import ProductFilters from "../components/ProductFilters";
import { useSearchParams } from "react-router-dom";
import StarRatings from "../components/StarRatings";
import { BiChevronsDown, BiChevronsUp } from "react-icons/bi";
const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [dateFilter, setDateFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [priceFilter, setPriceFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");

  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  const onDateFilterChange = (filter: string) => {
    setDateFilter(filter);
    searchParams.set("date", filter);
    setIsFilterMenuOpen(false);
  };
  const onRatingFilterChange = (filter: string) => {
    setRatingFilter(filter);
    searchParams.set("rating", filter);
    setIsFilterMenuOpen(false);
  };
  const onPriceFilterChange = (filter: string) => {
    setPriceFilter(filter);
    searchParams.set("price", filter);
    setIsFilterMenuOpen(false);
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
    <div className="p-4 transition">
      {/* <div className="flex flex-row gap-2 flex-wrap">
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
      </div> */}
      <div className="flex justify-center sm:hidden px-2 mb-3">
        {isFilterMenuOpen ? (
          <BiChevronsUp
            onClick={() => setIsFilterMenuOpen(false)}
            className=" bg-white opacity-80 text-4xl w-full rounded"
          />
        ) : (
          <BiChevronsDown
            onClick={() => setIsFilterMenuOpen(true)}
            className=" bg-white opacity-80 text-4xl w-full rounded"
          />
        )}
      </div>
      <div className={`flex flex-col  sm:flex-row px-2 `}>
        <div
          className={`${
            isFilterMenuOpen ? "flex" : "hidden"
          }  flex-col sm:flex   sm:basis-1/6 bg-white  p-2 b pb-10 justify-start items-center `}
        >
          <div className="text-xl font-semibold pt-2">Time</div>
          <div
            className={`hover:cursor-pointer `}
            onClick={() => onDateFilterChange("desc")}
          >
            <div className={`${dateFilter === "desc" ? "text-sky-500" : ""}`}>
              Recent
            </div>
          </div>
          <div
            className="hover:cursor-pointer"
            onClick={() => onDateFilterChange("asc")}
          >
            <div className={`${dateFilter === "asc" ? "text-sky-500" : ""}`}>
              Oldest
            </div>
          </div>
          <div className="text-xl font-semibold pt-2">Price</div>
          <div
            className="hover:cursor-pointer"
            onClick={() => onPriceFilterChange("all")}
          >
            <div className={`${priceFilter === "all" ? "text-sky-500" : ""}`}>
              All
            </div>
          </div>
          <div
            className="hover:cursor-pointer"
            onClick={() => onPriceFilterChange("0-100")}
          >
            <div className={`${priceFilter === "0-100" ? "text-sky-500" : ""}`}>
              0 to 100
            </div>
          </div>
          <div
            className="hover:cursor-pointer"
            onClick={() => onPriceFilterChange("100-1000")}
          >
            <div
              className={`${priceFilter === "100-1000" ? "text-sky-500" : ""}`}
            >
              100 to 1000
            </div>
          </div>
          <div
            className="hover:cursor-pointer"
            onClick={() => onPriceFilterChange("1000-5000")}
          >
            <div
              className={`${priceFilter === "1000-5000" ? "text-sky-500" : ""}`}
            >
              1000 to 5000
            </div>
          </div>
          <div
            className="hover:cursor-pointer"
            onClick={() => onPriceFilterChange("5000-10000")}
          >
            <div
              className={`${
                priceFilter === "5000-10000" ? "text-sky-500" : ""
              }`}
            >
              5000 to 10000
            </div>
          </div>
          <div className="text-xl font-semibold pt-2">Rating</div>
          <div
            className="hover:cursor-pointer"
            onClick={() => onRatingFilterChange("4.5")}
          >
            {" "}
            <StarRatings rating={5} />
          </div>
          <div
            className="hover:cursor-pointer"
            onClick={() => onRatingFilterChange("4")}
          >
            {" "}
            <StarRatings rating={4} />
          </div>
          <div
            className="hover:cursor-pointer"
            onClick={() => onRatingFilterChange("3")}
          >
            {" "}
            <StarRatings rating={3} />
          </div>
          <div
            className="hover:cursor-pointer"
            onClick={() => onRatingFilterChange("2")}
          >
            {" "}
            <StarRatings rating={2} />
          </div>
          <div
            className="hover:cursor-pointer"
            onClick={() => onRatingFilterChange("1")}
          >
            {" "}
            <StarRatings rating={1} />
          </div>
          <div
            className="hover:cursor-pointer"
            onClick={() => onRatingFilterChange("0")}
          >
            {" "}
            <StarRatings rating={0} />
          </div>
        </div>{" "}
        <div className="basis-5/6">
          {isLoading && <div className="text-xl font-bold p-4">Loading...</div>}
          <Cards products={data && data[1]} />
        </div>
      </div>
      <ul className="flex flex-row justify-center gap-4 py-8">
        {data &&
          [...Array(Math.ceil(data[0] / 10))].map((elementInArray, index) => (
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
