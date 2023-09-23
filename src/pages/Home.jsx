import { useMemo, useState, useReducer } from "react";
import { useNavigate } from "react-router-dom";

const Items = () => {
  const navigate = useNavigate();
  const [height, setHeight] = useState("340px");
  const change = () => {
    if (height === "340px") {
      setHeight("200px");
    } else {
      setHeight("340px");
    }
  };
  const ls = [
    { url: "/img/feed.svg", to: "/feed" },
    { url: "/img/sell.svg", to: "/feed" },
    { url: "/img/breed.svg", to: "/feed" },
    { url: "/img/detail.svg", to: "/feed" },
    { url: "/img/switch.svg", to: "/feed" },
  ];

  return useMemo(() => {
    return (
      <>
        <div
          style={{
            height,
            transition: "height 500ms ease-in-out",
            overflow: "hidden",
          }}
        >
          {ls.map((item) => (
            <img
              src={item.url}
              key={item.url}
              width={50}
              onClick={() => {
                navigate(item.to);
              }}
              alt=""
              style={{ marginBottom: "5px" }}
            />
          ))}
        </div>
        <img
          src="/img/top.svg"
          width={50}
          style={{
            transform: height === "340px" ? "rotateZ(0deg)" : "rotateZ(180deg)",
            transition: "transform 500ms ease-in-out",
          }}
          onClick={change}
          alt=""
        />
      </>
    );
  }, [height]);
};
const Home = () => {
  const [layouts, action] = useReducer(
    (layout, values) => {
      return { ...layout, ...values };
    },
    {
      aid: "000000",
      nickname: "****",
      gender: "****",
      birthday: "****",
    }
  );
  return (
    <div
      style={{
        backgroundImage: "url('/img/homepageBg.png')",
        backgroundSize: "100% 100%",
      }}
    >
      <div className="absolute top-20">
        <Items />
      </div>
      <div className="absolute top-24 right-5">
        <div
          style={{
            backgroundImage: "url('/img/home_right.png')",
            backgroundSize: "100% 100%",
            width: "100px",
            padding: "5px 0",
          }}
        >
          <div className="flex-col relative right-4">
            <div
              className="relative flex items-center justify-center"
              style={{ marginTop: "10px" }}
            >
              <img src="/img/home_right_text.png" width={100} alt="" />
              <div
                className="absolute linear-text"
                style={{ fontSize: "1.2em" }}
              >
                AID:{layouts.aid}
              </div>
            </div>
            <div
              className="relative flex items-center justify-center"
              style={{ marginTop: "5px" }}
            >
              <img src="/img/home_right_text.png" width={100} alt="" />
              <div className="flex items-center absolute">
                <div className="linear-text">NickName</div>
                <div style={{ marginLeft: "5px", fontSize: ".9em" }}>
                  {layouts.nickname}
                </div>
              </div>
            </div>
            <div
              className="relative flex items-center justify-center"
              style={{ marginTop: "5px" }}
            >
              <img src="/img/home_right_text.png" width={100} alt="" />
              <div className="flex items-center absolute">
                <div className="linear-text">Gender</div>
                <div style={{ marginLeft: "5px", fontSize: ".9em" }}>
                  {layouts.gender}
                </div>
              </div>
            </div>
            <div
              className="relative flex items-center justify-center"
              style={{ marginTop: "5px" }}
            >
              <img src="/img/home_right_text.png" width={100} alt="" />
              <div className="flex items-center absolute">
                <div className="linear-text">Birthday</div>
                <div style={{ marginLeft: "5px", fontSize: ".9em" }}>
                  {layouts.birthday}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <img
        src="/img/pet.png"
        width={180}
        alt=""
        style={{ margin: "26vh auto 0" }}
      />
      <div className="flex justify-around">
        <img src="/img/home_mint.png" width={90} alt="" />
        <img src="/img/home_martin.png" width={90} alt="" />
      </div>
    </div>
  );
};
export default Home;
