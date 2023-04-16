import React from "react";
import "./home.css";
import Navbar from "../../components/Navbar/Navbar";
import LeftSide from "../../components/LeftSide/LeftSide";
import MainPost from "../../components/MainPost/MainPost";
import RightSide from "../../components/RightSide/RightSide";
const Home = () => {
  return (
    <div>
      <Navbar />
      <div className='flex flex-row gap-2 bg-gray-800'>
        <div className='w-auto'>
          <LeftSide />
        </div>
        <div className='w-auto'>
          <MainPost />
        </div>
        <div className='w-auto'>
          <RightSide />
        </div>
      </div>
    </div>
  );
};

export default Home;
