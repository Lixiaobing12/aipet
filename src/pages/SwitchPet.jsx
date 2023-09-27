import {
  Metaplex,
  walletAdapterIdentity,
  PublicKey,
} from "@metaplex-foundation/js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import setting from "../setting.json";
import axios from "axios";
import { Spin } from "antd";

const SwitchPet = () => {
  let times = 0;
  const [loading, setLoading] = useState(false);
  const { connection } = useConnection();
  const wallet = useWallet();
  const [lists, setList] = useState([]);
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
      console.log(promiseall);
      await Promise.all(promiseall).then((lists) => {
        console.log(lists);
        setList((state) => [...lists]);
        setLoading(false);
      });
    }
  };
  useEffect(() => {
    connection && wallet.connected && init();
  }, [connection, wallet.connected]);
  return (
    <div className="my-0">
      {loading ? (
        <Spin size="large"></Spin>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {lists.map((item, index) => (
            <div className="flex-col h-150" key={index}>
              <div className="grow-2">
                <img src={item.img} style={{ objectFit: "cover" }} />
              </div>
              <div className="grow-1 flex-col items-start text-left bg-[#6C727E]">
                <div className="ml-2">{item.nickname}</div>
                <div className="flex items-start my-2">
                  {item.attr
                    .filter((v) => v.value)
                    .map((v) => (
                      <span
                        key={v.trait_type}
                        className="bg-[#fff]"
                        style={{
                          color: "#000",
                          marginLeft: "6px",
                          padding: "0 5px",
                        }}
                      >
                        {v.value}
                      </span>
                    ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default SwitchPet;
