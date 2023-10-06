import { Metaplex, walletAdapterIdentity } from "@metaplex-foundation/js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useContext, useEffect, useState } from "react";
import { Spin, Modal, Input } from "antd";
import { FindListing, IntoListing } from "../utils/mint";
import { UserContext } from "../contexts/ProxyWalletContextProvider";

const SwitchPet = () => {
  let times = 0;
  const { confirm } = Modal;
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const { connection } = useConnection();
  const wallet = useWallet();
  const [lists, setList] = useState([]);
  const { collections } = useContext(UserContext);
  const [seller,setSeller] = useState(null);

  useEffect(() => {
    setList((state) => {
      return [...collections];
    });
  }, [collections]);
  const [price, setPrice] = useState("0.1");
  // 卖
  const tosell = (item) => {
    setSeller(item)
    setOpen(true);
  };
  const confirmToSell = async () => {
    setConfirmLoading(true);
    const metaplex = Metaplex.make(connection).use(
      walletAdapterIdentity(wallet)
    );
    console.log(seller)
    try {
      const { listing, sellerTradeState } = await IntoListing(
        metaplex,
        price,
        seller?.collection
      );
      console.log("listing: ", listing);
      console.log("sellerTradeState: ", sellerTradeState);
    } catch (err) {
      console.log('err: ',err)
    }
    setConfirmLoading(false);
  };
  return (
    <div className="my-0">
      <Spin size="large my-100" spinning={loading} delay={200}>
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
                <img
                  src={item.img}
                  style={{ objectFit: "cover", height: "224px" }}
                />
              </div>
              <div className="grow-1 flex-col items-start text-left bg-[#6C727E]">
                <div className="ml-2">{item.nickname}</div>
                <div
                  className="flex items-start my-2 flex-wrap"
                  style={{ overflow: "hidden", whiteSpace: "pre" }}
                >
                  {item.attr
                    .filter((v) => v.value)
                    .map((v, i) => (
                      <span
                        key={`${v.trait_type}-${i}`}
                        className="bg-[#fff] my-1 mx-1"
                        style={{
                          color: "#000",
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
      </Spin>

      <Modal
        open={open}
        footer={null}
        centered
        closable={false}
        destroyOnClose
        width={280}
        onCancel={() => {
          setOpen(false);
        }}
        modalRender={() => {
          return (
            <div className="bg-[#fff] rounded-xl p-2 pointer-events-auto text-center">
              <p className="font-bold my-2">You need to enter the price.</p>
              <input
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                type="number"
                className="w-11/12 mx-auto focus:outline-none bg-[rgba(0,0,0,0.3)] p-1.5 text-white indent-1.5 rounded-md text-center"
              />
              <div
                onClick={() => {
                  !confirmLoading && confirmToSell();
                }}
                className="w-11/12 text-white my-2 mx-auto p-1.5 rounded-md my-4"
                style={{
                  background:
                    "linear-gradient(112.21deg, #67DEFF 1.98%, #EE66F9 98.02%)",
                }}
              >
                <Spin spinning={confirmLoading} size="small" className="mx-1"></Spin>
                Confirm
              </div>
            </div>
          );
        }}
      />
    </div>
  );
};
export default SwitchPet;
