import React from "react";
import SVG_money from "../../images/svg/money.svg";
import SVG_rugby from "../../images/svg/rugby.svg";
import SVG_whiteline from "../../images/svg/whiteline.svg";
import SVG_skill from "../../images/svg/skill.svg";
import SVG_skin from "../../images/svg/skin.svg";
import SVG_voice from "../../images/svg/voice.svg";
import SVG_feed from "../../images/svg/feed.svg";
import PNG_union from "../../images/png/union.png";
import PNG_gradient from "../../images/png/gradient.png";
import PNG_petFile_Lennie from "../../images/png/petFile_Lennie.png";

import "./Panel.css";
import ChatCard from "../chat/ChatCard";
import { Modal } from "antd";

export default function Panel() {
  const { confirm } = Modal;
  const openDialog = () => {
    confirm({
      width:300,
      centered:true,
      icon:false,
      bodyStyle:{
        borderRadius:"15px"
      },
      style:{
        borderRadius:"15px"
      },
      content: "Some descriptions",
      onOk() {
        console.log("OK");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  return (
    <div
      className=" w-screen h-screen overflow-hidden"
      style={{
        backgroundImage: `url(${PNG_petFile_Lennie})`,
        backgroundSize: "70vw 55vh",
        backgroundPosition: "100% 20%",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className=" mt-3  text-white text-xs">
        <div className="flex justify-between ">
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
            <div className="mt-2 flex  ">
              <img className="mx-1" src={SVG_skin} alt="" />
              <img className="mx-1" src={SVG_skill} alt="" />
              <img className="mx-1" src={SVG_voice} alt="" />
            </div>
          </div>
          <div>
            <div className=" flex justify-end pr-4">
              <img
                className="-mr-4"
                src={SVG_money}
                alt="money"
                onClick={openDialog}
              />
              <img className="-mr-2" src={SVG_rugby} alt="rugby" />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#FFFFFF29]  flex mt-2 justify-start items-center rounded-full mr-8">
        <div className="  rounded-full w-10 h-10 flex justify-center items-center bg-[#0F49A080] border-2 border-white">
          <img className=" w-12 h-12 rounded-full" src={SVG_feed} alt="" />
        </div>
        <div className="flex-1  mx-3">
          <div className="flex bg-white rounded-full h-6">
            <div className=" gradient-color rounded-full h-6  w-2/3"></div>
          </div>
        </div>
      </div>
      <div className="bg-[#FFFFFF29] mt-4  rounded-xl mr-8 p-2 text-left">
        <p className=" text-left text-sm">Personality Label</p>
        <div className="mt-2 flex gap-4 text-black flex-wrap">
          <div className="px-1 rounded-sm bg-white">Cute</div>
          <div className="px-1 rounded-sm bg-white">CuteCute</div>
          <div className="px-1 rounded-sm bg-white">CuteCuteCute</div>
          <div className="px-1 rounded-sm bg-white">CuteCuteCute</div>
          <div className="px-1 rounded-sm bg-white">CuteCuteCuteCuteCute</div>
          <div className="px-2 rounded-sm bg-white"> + </div>
        </div>
      </div>
    </div>
  );
}
