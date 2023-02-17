import React from "react";
import "./home.css";
import Navbar from "../../components/Navbar/Navbar";
import LeftSide from "../../components/LeftSide/LeftSide";
import MainPost from "../../components/MainPost/MainPost";
import RightSide from "../../components/RightSide/RightSide";
// import { useSelector } from "react-redux";
const Home = () => {
  // const userDetails = useSelector((state) => state.user);
  // let user = userDetails.user;
  return (
    <div className='home'>
      <Navbar />
      <div className='component-container'>
        <LeftSide />
        <MainPost />
        <RightSide />
      </div>
    </div>
  );
};

export default Home;
