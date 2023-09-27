import {
  Metaplex,
  walletAdapterIdentity,
  PublicKey,
  sol,
} from "@metaplex-foundation/js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import setting from "../setting.json";
import axios from "axios";
import { Spin, Modal, Input } from "antd";
import * as web3 from "@solana/web3.js";

const SwitchPet = () => {
  let times = 0;
  const { confirm } = Modal;
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
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
      await Promise.all(promiseall).then((lists) => {
        setList((state) => [...lists]);
        setLoading(false);
      });
    }
  };
  const [price, setPrice] = useState();
  // 卖
  const tosell = (item) => {
    confirm({
      centered: true,
      width: 300,
      bodyStyle: {},
      okButtonProps: { loading: confirmLoading },
      content: (
        <div className="flex-col items-left">
          <div>Sell Price(sol):</div>
          <Input
            placeholder="input"
            className="my-2"
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
        </div>
      ),
      onOk: () => {
        return new Promise(async (resolve, reject) => {
          setConfirmLoading(true);
          const metaplex = Metaplex.make(connection).use(
            walletAdapterIdentity(wallet)
          );
          try {
            // 获取拍卖行信息
            let res = await metaplex.auctionHouse().findByCreatorAndMint({
              creator: metaplex.identity().publicKey,
              treasuryMint: new web3.PublicKey(
                "So11111111111111111111111111111111111111112"
              ),
            });
            console.log("拍卖行：", res);
          } catch (err) {
            console.log("获取拍卖失败，正在新建", err);
            try {
              await metaplex.auctionHouse().create({
                sellerFeeBasisPoints: 500, //手续费
                authority: metaplex.identity(),
                requiresSignOff: true,
                canChangeSalePrice: true,
              });
              console.log("创建成功");
            } catch (error) {
              console.log("err: ", error);
              reject(error);
            }
          }
          const res = await metaplex.auctionHouse().findByCreatorAndMint({
            creator: metaplex.identity().publicKey,
            treasuryMint: new web3.PublicKey(
              "So11111111111111111111111111111111111111112"
            ),
          });
          console.log("获取拍卖信息成功：", res);
          try {
            const { listing, sellerTradeState } = await metaplex
              .auctionHouse()
              .list({
                auctionHouse: res,
                mintAccount: item.aid,
                price: sol(price),
              });
            console.log("listing: ", listing);
            console.log("sellerTradeState: ", sellerTradeState);
          } catch (err) {
            
          }
        });
      },
    });
  };
  useEffect(() => {
    connection && wallet.connected && init();
  }, [connection, wallet.connected]);
  return (
    <div className="my-0">
      {loading ? (
        <Spin size="large"></Spin>
      ) : (
        <div className="grid grid-cols-2 gap-4 relative">
          {lists.map((item, index) => (
            <div className="flex-col h-150 relative" key={index}>
              <div
                className="absolute top-1 right-1"
                style={{
                  background:
                    "linear-gradient(112.21deg, #67DEFF 1.98%, #EE66F9 98.02%)",
                  padding: "3px 10px",
                  borderRadius: "8px",
                }}
                onClick={() => tosell(item)}
              >
                Sell
              </div>
              <div className="grow-2">
                <img src={item.img} style={{ objectFit: "cover" }} />
              </div>
              <div className="grow-1 flex-col items-start text-left bg-[#6C727E]">
                <div className="ml-2">{item.nickname}</div>
                <div className="flex items-start my-2">
                  {item.attr
                    .filter((v) => v.value)
                    .map((v, i) => (
                      <span
                        key={`${v.trait_type}-${i}`}
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
