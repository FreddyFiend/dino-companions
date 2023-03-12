import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cards from "../components/Cards";
import Hero from "../components/Hero";
import Users from "../components/Users";

const mrProducts = [
  {
    id: 1,
    img: "../assets/knives.jpg",
    title: "Still a king",
    desc: "King in the castle",
  },
  {
    id: 2,
    img: "../assets/glass.jpg",
    title: "Glass onion ",
    desc: "King in the castle",
  },
  {
    id: 3,
    img: "../assets/knives.jpg",
    title: "Still a king",
    desc: "King in the castle",
  },
  {
    id: 4,
    img: "../assets/glass.jpg",
    title: "Glass onion ",
    desc: "King in the castle",
  },

  {
    id: 5,
    img: "../assets/knives.jpg",
    title: "Still a king",
    desc: "King in the castle",
  },
  {
    id: 6,
    img: "../assets/glass.jpg",
    title: "Glass onion ",
    desc: "King in the castle",
  },
];

const Homepage = () => {
  const [products, setProducts] = useState(mrProducts);

  return (
    <div className="bg-slate-200 min-h-screen">
      <Hero />
      <button>Get Users</button>
      {/*      <Users /> */}

      <Cards products={products} />
    </div>
  );
};

export default Homepage;
