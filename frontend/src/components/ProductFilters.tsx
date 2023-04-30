import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

const ProductFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [dateFilter, setDateFilter] = useState("");

  const [priceFilter, setPriceFilter] = useState("");

  const onDateFilterChange = (filter: string) => {
    setDateFilter(filter);
    searchParams.set("date", filter);
  };

  const onPriceFilterChange = (filter: string) => {
    setPriceFilter(filter);
    searchParams.set("price", filter);
    console.log(searchParams.toString());
  };

  return (
    <div className="flex flex-row gap-2 flex-wrap">
      <select
        onChange={(event) => onDateFilterChange(event.target.value)}
        value={dateFilter}
      >
        <option value="recent">Recent</option>
        <option value="month">This month</option>
      </select>
      <select
        onChange={(event) => onPriceFilterChange(event.target.value)}
        value={dateFilter}
      >
        <option value="0-100">0 to 100</option>
        <option value="100-1000">100 to 1000</option>
      </select>
    </div>
  );
};

export default ProductFilters;
