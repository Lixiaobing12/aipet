import React from "react";
import SVG_money from "../../images/svg/money.svg";
import SVG_rugby from "../../images/svg/rugby.svg";
import SVG_whiteline from "../../images/svg/whiteline.svg";
import PNG_union from "../../images/png/union.png";
import PNG_gradient from "../../images/png/gradient.png";
import PNG_petFile_Lennie from "../../images/png/petFile_Lennie.png";

import "./Panel.css";
import ChatCard from "../chat/ChatCard";

export default function Panel() {
  return (
    <div
      className=" w-screen h-screen"
      style={{
        backgroundImage: `url(${PNG_petFile_Lennie})`,
        backgroundSize: "70vw 55vh",
        backgroundPosition: "100% 20%",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="px-3 mt-3  text-white text-xs">
        <div className="flex justify-between">
          <div className=" flex-col ">
            <div className="flex mt-6 ">
              <div className="bg-[#FFFFFF29]  pl-1 flex justify-center items-center rounded-r-lg">
                <p> Citizen </p>
                <div className=" rounded-full bg-white w-3 h-3 ml-1"></div>
              </div>
              <div className="ml-2 rounded-xl bg-[#FFFFFF29] px-1">OneGen</div>
            </div>

            <div
              id="petName"
              className="mt-2"
              style={{
                backgroundImage: `url(${PNG_union})`,
                backgroundSize: "cover",
              }}
            >
              <p className=" text-xl font-bold pl-1 ">Lennie</p>
            </div>
            <div
              className="mt-2 px-1"
              style={{
                backgroundImage: `url(${PNG_gradient})`,
                backgroundSize: "cover",
              }}
            >
              AID : 123456
            </div>
            <img className="mt-2 w-full" src={SVG_whiteline} alt="" />
            {/* Basic Information */}
            <p className="mt-4 text-sm gradient-text font-bold">
              Basic Information
            </p>
            <div className="mt-1 bg-[#FFFFFF29] px-2  bg-opacity-10">
              <p>Gender</p>
              <p className=" text-sm font-bold">Male</p>
            </div>
            <div className="mt-1 bg-[#FFFFFF29] px-2  bg-opacity-10">
              <p>Birthday</p>
              <p className=" text-sm font-bold">June 1</p>
            </div>
            {/* Owner */}
            <p className="mt-4 text-sm gradient-text font-bold">Owner</p>
            <div className="mt-1 bg-[#FFFFFF29] px-2  bg-opacity-10">
              <p>Name</p>
              <p className=" text-sm font-bold">Florence</p>
            </div>
            <div className="mt-1 bg-[#FFFFFF29] px-2  bg-opacity-10">
              <p>UID</p>
              <p className=" text-sm font-bold">000000</p>
            </div>
            <div className="mt-1 bg-[#FFFFFF29] px-2 bg-opacity-10">
              <p>Blockchain address</p>
              <p className=" text-sm font-bold">0x59...0000</p>
            </div>
          </div>
          <div>
            <div className=" flex">
              <img className="-mr-4" src={SVG_money} alt="money" />
              <img className="-mr-2" src={SVG_rugby} alt="rugby" />
            </div>
            <ChatCard />
          </div>
        </div>
      </div>
    </div>
  );
}
