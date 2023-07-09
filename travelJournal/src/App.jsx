import React from "react";
import Data from "./Data.jsx";
import Nav from "./Navbar.jsx";
import Card from "./Card.jsx";
import "./App.css";


export default function App() {
  const data = Data.map(item => {
    return <Card
      key={item.title}
      {...item}
    />
  });
  return (
    <>
      <Nav />
      <section className="cards-list">{data}</section>
    </>
  );
}
