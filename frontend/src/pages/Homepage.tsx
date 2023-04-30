import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cards from "../components/Cards";
import Hero from "../components/Hero";
import Users from "../components/Users";
import { getProducts } from "../routes/usersApi";
import { useQuery } from "@tanstack/react-query";

export const mrProducts = [
  {
    id: "1",
    imageThumb: "../assets/knives.jpg",
    title: "Still a king",
    description: "King in the castle",
  },
  {
    id: "2",
    imageThumb: "../assets/glass.jpg",
    title: "Glass onion ",
    description: "King in the castle",
  },
  {
    id: "3",
    imageThumb: "../assets/knives.jpg",
    title: "Still a king",
    description: "King in the castle",
  },
  {
    id: "4",
    imageThumb: "../assets/glass.jpg",
    title: "Glass onion ",
    description: "King in the castle",
  },

  {
    id: "5",
    imageThumb: "../assets/knives.jpg",
    title: "Still a king",
    description: "King in the castle",
  },
  {
    id: "6",
    imageThumb: "../assets/glass.jpg",
    title: "Glass onion ",
    description: "King in the castle",
  },
];

const Homepage = () => {
  // const { data, isLoading } = useQuery({
  //   queryKey: ["products"],
  //   queryFn: getProducts,
  // });
  // const [products, setProducts] = useState(mrProducts);

  return (
    <div className="bg-slate-200 min-h-screen">
      <Hero />
      <button>Get Users</button>
      {/*      <Users /> */}

      {/* <Cards products={data} /> */}
    </div>
  );
};

export default Homepage;
