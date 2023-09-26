import { useEffect, useMemo, useReducer, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import BigNumber from "bignumber.js";
import { useRef } from "react";
function ParallaxText({ pets, baseVelocity = 100, action }) {
  /**
   * The number of times to repeat the child text should be dynamically calculated
   * based on the size of the text and viewport. Likewise, the x motion value is
   * currently wrapped between -20 and -45% - this 25% is derived from the fact
   * we have four children (100% / 4). This would also want deriving from the
   * dynamically generated number of children.
   */
  const getScale = (index) => {
    console.log(index);
    return 2;
  };
  const ref = useRef(null);
  return useMemo(
    () => (
      <div className="parallax" ref={ref}>
        {pets.map(({ url }, index) => (
          <img
            src={url}
            key={url}
            style={{
              width: "30%",
              marginRight: "-20px",
              transform: "scale(1.2)",
            }}
            onClick={() => {
              action(index);
            }}
          ></img>
        ))}
      </div>
    ),
    []
  );
}
const Minter = () => {
  const connection = useConnection();
  const { publicKey } = useWallet();
  const [balance, setBalance] = useState("000.000");
  const init = async () => {
    const balance = await connection.connection.getBalance(publicKey);
    setBalance(BigNumber(balance).div(1e9).toFixed(3));
  };
  useEffect(() => {
    init();
  }, []);
  const [pets, action] = useReducer(
    (pets, petIndex) => {
      pets.forEach((item, index) => {
        if (index === petIndex) {
          item.active = true;
        } else {
          item.active = false;
        }
      });
      return [...pets];
    },
    [
      { url: "/img/boom.png", active: false, isMint: false },
      { url: "/img/bobo.png", active: false, isMint: false },
      { url: "/img/gg.png", active: true, isMint: true },
      { url: "/img/happy.png", active: false, isMint: false },
      { url: "/img/huahua.png", active: false, isMint: false },
      { url: "/img/lala.png", active: false, isMint: false },
    ]
  );
  return (
    <div style={{ marginTop: "10px", overflow: "hidden" }}>
      <div className="flex justify-between items-start">
        <div className="flex-col">
          <div
            style={{
              backgroundImage: "url('/img/zebra.svg')",
              backgroundSize: "100% 100%",
              padding: "5px 10px",
            }}
            className="text-xl font-bold"
          >
            Lennie
          </div>
          <img src="/img/limit.svg" alt="" className="mt-1" />
        </div>

        <div className="flex items-center relative">
          <div
            className="rounded-b-br font-bold"
            style={{
              background: "rgba(255,255,255,0.2)",
              padding: "0 10px 0 20px",
            }}
          >
            {balance}
          </div>
          <img
            src="/img/sol.png"
            width={30}
            alt=""
            className="absolute drop-shadow-lg"
            style={{ left: "-10px" }}
          />
        </div>
      </div>
      <div
        style={{
          margin: "20px auto 0",
          display: "inline-block",
          width: "67%",
          height: "330px",
        }}
      >
        {pets
          .filter((i) => i.active)
          .map(({ url }) => (
            <img src={url} key={url} />
          ))}
      </div>
      <div
        style={{
          backgroundImage:
            "linear-gradient(112.21deg, #67DEFF 1.98%, #EE66F9 98.02%)",
          borderRadius: "15px 0 15px 0",
          backgroundSize: "100% 100%",
          padding: "5px 10px",
          marginBottom: "20px",
          marginTop: "-15px",
        }}
        className="inline-flex items-center justify-center"
      >
        <div className="flex items-center relative">
          <div
            className="rounded-b-br font-bold"
            style={{
              background: "rgba(255,255,255,0.2)",
              padding: "0 10px 0 20px",
              minWidth: "80px",
            }}
          >
            1
          </div>
          <img
            src="/img/sol.png"
            width={30}
            alt=""
            className="absolute drop-shadow-lg"
            style={{ left: "-10px" }}
          />
        </div>
        <span style={{ marginLeft: "10px", fontWeight: "bold" }}>Mint</span>
      </div>

      <div className="absolute top-1/2 right-5 flex-col">
        <img src="/img/skin.png" width={40} />
        <img src="/img/skill.png" width={40} style={{ marginTop: "15px" }} />
      </div>
      {/* <div style={{ height: "100px", width: "100%", background: "#fff" }}></div> */}
      <ParallaxText baseVelocity={0} pets={pets} action={action}></ParallaxText>
    </div>
  );
};

export default Minter;
