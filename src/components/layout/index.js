import {
  WalletMultiButton,
  WalletDisconnectButton,
} from "@solana/wallet-adapter-react-ui";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import React from "react";

const ConnectWrapper = () => {
  const { publicKey, connected } = useWallet();
  return (
    <div className="flex relative top-6 justify-around">
      <div>
        <img src="/img/ava.svg" />
      </div>
      <div className="wallet-button-disconnect flex items-center">
        <img src="/img/money.svg" width={25}></img>
        <div>000.000 SOL</div>
      </div>
    </div>
  );
};
const DisConnectWrapper = () => {
  return (
    <div className="flex relative top-6 justify-around">
      <div className="wallet-button">
        <WalletMultiButton style={{ height: "38px", padding: "0 15px" }} />
      </div>
      <div className="wallet-button-disconnect flex items-center">
        <img src="/img/money.svg" width={25}></img>
        <div>000.000 SOL</div>
      </div>
    </div>
  );
};
/**
 *
 * @param {Object} props
 */
export const LayoutHeader = (props) => {
  if (props.type === 0) {
    return <DisConnectWrapper />;
  } else if (props.type === 1) {
    return <ConnectWrapper />;
  }
};
