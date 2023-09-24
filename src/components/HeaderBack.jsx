import React from "react";
import "./HeaderBack.css";
import SVG_back from "../images/svg/back.svg";
import SVG_title_petFile from "../images/svg/title_petFile.svg";

export default function HeaderBack() {
  return (
    <div className=" flex">
      <div id="back">
        <img src={SVG_back} />
      </div>

      <div id="back">
        <img src={SVG_title_petFile} />
      </div>
    </div>
  );
}
