import {
  WalletMultiButton,
  WalletDisconnectButton,
} from "@solana/wallet-adapter-react-ui";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SystemProgram } from "@solana/web3.js";
import BigNumber from "bignumber.js";

const ConnectWrapper = () => {
  const { connection } = useConnection();
  const { publicKey, connected } = useWallet();
  const [balance, setBalance] = useState("000.000");
  const init = async () => {
    const balance = await connection.getBalance(publicKey);
    setBalance(BigNumber(balance).div(1e9).toFixed(3));
  };
  useEffect(() => {
    connection && connected && init();
  }, [connection, connected]);

  return (
    <div className="flex justify-between">
      <div>
        <img src="/img/ava.svg" />
      </div>
      <div className="wallet-button-disconnect flex items-center">
        <img src="/img/money.svg" width={25}></img>
        <div>{balance} SOL</div>
      </div>
    </div>
  );
};
const DisConnectWrapper = () => {
  const connection = useConnection();
  const { publicKey, connected } = useWallet();
  const [balance, setBalance] = useState("000.000");
  const init = async () => {
    const balance = await connection.getBalance(publicKey);
    setBalance(BigNumber(balance).div(1e9).toFixed(3));
  };
  useEffect(() => {
    connection && connected && init();
  }, [connection, connected]);
  return (
    <div className="flex justify-between">
      <div className="wallet-button">
        <WalletMultiButton style={{ height: "38px", padding: "0 15px" }} />
      </div>
      <div className="wallet-button-disconnect flex items-center">
        <img src="/img/money.svg" width={25}></img>
        <div>{balance} SOL</div>
      </div>
    </div>
  );
};
const BothComponentWapper = ({ title, backurl = "/" }) => {
  const navigate = useNavigate();
  const back = () => {
    navigate(backurl);
  };
  return (
    <div className="flex items-center" style={{ margin: "0 -10px" }}>
      <img
        src="/img/back.svg"
        style={{ width: "20%", height: "33px" }}
        onClick={back}
      />
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
        <div
          style={{
            position: "absolute",
            zIndex: 1,
            fontWeight: "bold",
            fontSize: "1.2em",
          }}
        >
          {title}
        </div>
      </div>
    </div>
  );
};
const OnlyBackWapper = ({ backurl = "/" }) => {
  const navigate = useNavigate();
  const back = () => {
    navigate(backurl);
  };
  return (
    <div className="flex items-start" style={{ margin: "0 -10px" }}>
      <img
        src="/img/back.svg"
        style={{ width: "20%", height: "33px" }}
        onClick={back}
      />
    </div>
  );
};

const UseSlot = ({ backurl = "/", slot }) => {
  const navigate = useNavigate();
  const back = () => {
    navigate(backurl);
  };
  return (
    <div className="flex items-center" style={{ margin: "0 -10px" }}>
      <img
        src="/img/back.svg"
        style={{ width: "20%", height: "33px" }}
        onClick={back}
      />
      {slot}
    </div>
  );
};
/**
 *
 * @param {Object} props
 */
export const LayoutHeader = (props) => {
  const { publicKey, connected } = useWallet();
  if (!connected && publicKey === null) {
    return <DisConnectWrapper />;
  } else if (props.type === 1) {
    return <ConnectWrapper />;
  } else if (props.type === 2) {
    return <BothComponentWapper {...props} />;
  } else if (props.type === 3) {
    return <OnlyBackWapper {...props} />;
  } else if (props.type === 4) {
    return <UseSlot {...props} />;
  }
};
