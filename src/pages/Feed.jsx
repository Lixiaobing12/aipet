import React from "react";
import PNG_FeedBg from "../images/png/feedbg-1.png";
import SVG_Feed from "../images/svg/feed.svg";
import PNG_Feedbox from "../images/png/feedbox.png";
import PNG_Feedfood from "../images/png/feedfood.png";
import SVG_Feedbtn from "../images/svg/feedbtn.svg";
import SVG_Petcoin from "../images/svg/petcoin.svg";

export default function Feed() {
  return (
    <div
      class="relative"
      style={{
        backgroundImage: `url(${PNG_FeedBg})`,
        backgroundSize: "100% 100%",
      }}
    >
      <div className=" flex-col justify-between items-center z-10">
        <div className="bg-[#FFFFFF29] mx-32 py-2 flex justify-center items-center rounded-lg">
          <p className=" font-bold text-lg"> Lennie </p>
        </div>
        <img
          src="/img/pet.png"
          width={180}
          alt=""
          style={{ margin: "5vh auto 0" }}
        />
      </div>
      {/* feedAction */}
      <div className=" flex justify-center items-center">
        <div
          className="w-12 h-12 animate-bounce"
          style={{
            backgroundImage: `url(${PNG_Feedbox})`,
            backgroundSize: "100% 100%",
          }}
        >
          <div
            className="w-14 h-14"
            style={{
              backgroundImage: `url(${PNG_Feedfood})`,
              backgroundSize: "100% 100%",
            }}
          ></div>
        </div>
      </div>
      <div className="mt-4 flex justify-center items-center">
        <div
          className="w-24 flex py-1 justify-center items-center"
          style={{
            backgroundImage: `url(${SVG_Feedbtn})`,
            backgroundSize: "100% 100%",
          }}
        >
          <div className="flex ">
            <img src={SVG_Petcoin} alt="" className="w-6 h-6 z-20 " />
            <div className="flex-1 bg-[#0F49A080] pt-[1px] px-3 -ml-2 z-10 rounded-br-lg">
              100
            </div>
          </div>
        </div>
      </div>
      {/* feedscroll */}
      <div className="bg-[#FFFFFF29]   flex mt-4 justify-start items-center rounded-full">
        <div className="  rounded-full w-10 h-10 flex justify-center items-center bg-[#0F49A080] border-2 border-white">
          <img className=" w-12 h-12 rounded-full" src={SVG_Feed} alt="" />
        </div>
        <div className="flex-1  mx-3">
          <div className="flex bg-white rounded-full h-6">
            <div className=" gradient-color rounded-full h-6  w-2/3"></div>
          </div>
        </div>
      </div>
      <p className="mt-4 text-sm gradient-text font-bold">
        The pet also has energy: 60%
      </p>
    </div>
  );
}
