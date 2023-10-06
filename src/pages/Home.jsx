import { useMemo, useState, useReducer, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChatCard from "../components/chat/ChatCard";
import {
  Metaplex,
  walletAdapterIdentity,
  PublicKey,
  sol,
} from "@metaplex-foundation/js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import setting from "../setting.json";
import axios from "axios";

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
    { url: "/img/feed.svg", to: "/Feed" },
    { url: "/img/sell.svg", to: "/Feed" },
    { url: "/img/breed.svg", to: "/Feed" },
    { url: "/img/detail.svg", to: "/petArchives", width: 42 },
    { url: "/img/switch.svg", to: "/SwitchPet", width: 42 },
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
              width={item.width ?? 50}
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
  let times = 0;
  const [lists, setList] = useState([]);
  const { connection } = useConnection();
  const [loading, setLoading] = useState(false);
  const wallet = useWallet();
  const navigate = useNavigate();
  const [openChat, setOpenChat] = useState(false);
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

  const init = async () => {
    if (wallet.connected && wallet.publicKey) {
      if (times === 1) return;
      times++;
      setLoading(true);
      const metaplex = Metaplex.make(connection).use(
        walletAdapterIdentity(wallet)
      );
      const ownedNfts =
        (await metaplex.nfts().findAllByOwner({
          owner: metaplex.identity().publicKey,
        })) || [];

      let promiseall = [];
      let collectionMintPublicKeys = setting.nfts.map(
        (item) => item.collectionMintPublicKey
      );
      ownedNfts
        .filter((item) => {
          return collectionMintPublicKeys.includes(
            item.collection?.address.toBase58()
          );
        })
        .forEach((item) => {
          promiseall.push(
            new Promise(async (resolve, reject) => {
              const { data } = await axios.get(item.uri);
              resolve({
                aid: item.address.toBase58(),
                nickname: data.name,
                skill: [],
                attr: data.attributes,
                img: data.image,
              });
            })
          );
        });
      await Promise.all(promiseall).then((lists) => {
        setList((state) => [...lists]);
        setLoading(false);
      });
    }
  };
  useEffect(() => {
    connection && wallet.connected && init();
  }, [connection, wallet.connected]);
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
      {/* ChatCard */}
      <div
        className={`absolute top-60 right-5 w-2/3 ${openChat ? " " : "hidden"}`}
      >
        <ChatCard />
      </div>
      <img
        src="/img/pet.png"
        width={180}
        alt=""
        style={{ margin: "26vh auto 0" }}
        onClick={() => {
          lists.length && setOpenChat(!openChat);
        }}
      />

      <div className="flex justify-around">
        <div className="relative flex justify-center">
          <div className="absolute" style={{ width: "170px", top: "-60px" }}>
            <img src="/img/home_tip.png" alt="" />
          </div>
          <img
            src="/img/home_mint.png"
            width={90}
            alt=""
            onClick={() => {
              navigate("/Mint");
            }}
          />
        </div>
        <img
          src="/img/home_martin.png"
          width={90}
          alt=""
          onClick={() => navigate("/Martin-Pet")}
        />
      </div>
    </div>
  );
};
export default Home;
