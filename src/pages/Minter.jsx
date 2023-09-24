import { useEffect, useMemo, useReducer } from "react";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";
import { wrap } from "@motionone/utils";

function ParallaxText({ pets, baseVelocity = 100, action }) {
  /**
   * The number of times to repeat the child text should be dynamically calculated
   * based on the size of the text and viewport. Likewise, the x motion value is
   * currently wrapped between -20 and -45% - this 25% is derived from the fact
   * we have four children (100% / 4). This would also want deriving from the
   * dynamically generated number of children.
   */
  return useMemo(
    () => (
      <div className="parallax">
        <motion.div className="scroller">
          {pets.map(({ url }, index) => (
            <motion.img
              src={url}
              key={url}
              style={{ width: "30%", margin: "0 -10px" }}
              onClick={() => {
                action(index);
              }}
            ></motion.img>
          ))}
        </motion.div>
      </div>
    ),
    []
  );
}
const Minter = () => {
  const [pets, action] = useReducer(
    (pets, petIndex) => {
      pets.forEach((item, index) => {
        if (index === petIndex) {
          item.active = true;
        } else {
          item.active = false;
        }
      });
      return [...pets]
    },
    [
      { url: "/img/bobo.png", active: false },
      { url: "/img/boom.png", active: false },
      { url: "/img/gg.png", active: true },
      { url: "/img/happy.png", active: false },
      { url: "/img/huahua.png", active: false },
      { url: "/img/lala.png", active: false },
    ]
  );
  return (
    <div style={{ marginTop: "10px" }}>
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
            000.000
          </div>
          <img
            src="/img/sol.png"
            width={30}
            alt=""
            className="absolute"
            style={{ left: "-10px" }}
          />
        </div>
      </div>
      <div
        style={{ margin: "20px auto", display: "inline-block", width: "67%",height:"330px" }}
      >
        {pets
          .filter((i) => i.active)
          .map(({ url }) => (
            <img src={url} key={url} />
          ))}
      </div>

      <ParallaxText baseVelocity={0} pets={pets} action={action}></ParallaxText>
    </div>
  );
};

export default Minter;
