import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../routes/usersApi";
import Cards from "../components/Cards";
import ProductFilters from "../components/ProductFilters";
import { useSearchParams } from "react-router-dom";
import StarRatings from "../components/StarRatings";
const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [dateFilter, setDateFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [priceFilter, setPriceFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");

  const onDateFilterChange = (filter: string) => {
    setDateFilter(filter);
    searchParams.set("date", filter);
  };
  const onRatingFilterChange = (filter: string) => {
    setRatingFilter(filter);
    searchParams.set("rating", filter);
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

      <div className="flex ">
        <div className="basis-1/6 bg-slate-50 px-2 pb-10">
          <div className="text-xl font-semibold pt-2">Time</div>
          <div
            className="hover:cursor-pointer"
            onClick={() => onDateFilterChange("desc")}
          >
            Recent
          </div>
          <div
            className="hover:cursor-pointer"
            onClick={() => onDateFilterChange("asc")}
          >
            Oldest
          </div>
          <div className="text-xl font-semibold pt-2">Price</div>
          <div
            className="hover:cursor-pointer"
            onClick={() => onPriceFilterChange("all")}
          >
            All
          </div>
          <div
            className="hover:cursor-pointer"
            onClick={() => onPriceFilterChange("0-100")}
          >
            0 to 100
          </div>
          <div
            className="hover:cursor-pointer"
            onClick={() => onPriceFilterChange("100-1000")}
          >
            100 to 1000
          </div>
          <div
            className="hover:cursor-pointer"
            onClick={() => onPriceFilterChange("1000-5000")}
          >
            1000 to 5000
          </div>
          <div
            className="hover:cursor-pointer"
            onClick={() => onPriceFilterChange("5000-10000")}
          >
            5000 to 10000
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
          <Cards products={data && data[1]} />
        </div>
      </div>
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
