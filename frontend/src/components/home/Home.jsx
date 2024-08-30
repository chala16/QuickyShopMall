import React from "react";
import NavBar from "./Navbar/Navbar";
import "react-toastify/dist/ReactToastify.css";
import ImageMover from "../mover/ImageMover";
import Footer from "../footer/Footer";
import HomeContainer from "./HomeContainer";

const Home = () => {
  return (
    <div>
      <NavBar />
      <ImageMover />
      <HomeContainer/>
      <Footer />
    </div>
  );
};

export default Home;
