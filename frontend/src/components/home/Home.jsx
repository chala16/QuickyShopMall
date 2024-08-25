import React from "react";
import NavBar from "./Navbar/Navbar";
import "react-toastify/dist/ReactToastify.css";
import ImageMover from "../mover/ImageMover";
import Footer from "../footer/Footer";

const Home = () => {
  return (
    <div>
      <NavBar />
      <ImageMover />
      Home
      <Footer />
    </div>
  );
};

export default Home;
