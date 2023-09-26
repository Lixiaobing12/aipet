import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TitleSlot = () => {
  const [item, setItem] = useState("pet");
  const navigate = useNavigate();

  return (
    <div
      className="flex-auto flex items-center justify-center"
      style={{
        backgroundImage: "url('/img/header_title.svg')",
        backgroundSize: "100% 100%",
        height: "40px",
        position: "relative",
      }}
    >
      <div
        style={{
          width: "100px",
          height: "20px",
          background: "rgb(22,25,34)",
          position: "absolute",
        }}
      ></div>
      <ul
        className="flex justify-center flex-1 absolute"
        style={{ left: "10px", right: "5px" }}
      >
        <li
          className={item === "pet" ? "titleItem flex-1" : "flex-1"}
          onClick={() => {
            setItem("pet");
            navigate("/Martin-Pet");
          }}
        >
          Pet
        </li>
        <li
          className={item === "skin" ? "titleItem flex-1" : "flex-1"}
          onClick={() => {
            setItem("skin");
            navigate("/Martin-Skin");
          }}
        >
          Skin
        </li>
        <li
          className={item === "house" ? "titleItem flex-1" : "flex-1"}
          onClick={() => {
            setItem("house");
            navigate("/Martin-House");
          }}
        >
          House
        </li>
      </ul>
    </div>
  );
};
export default TitleSlot;
