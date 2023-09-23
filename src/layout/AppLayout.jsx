import { Layout, Row, Col } from "antd";
import { Content, Footer, Header } from "antd/lib/layout/layout";
import Minter from "../pages/Minter";
import WrongNetwork from "../pages/WrongNetwork";
import logo from "../images/sol.png";
import { Route, Routes } from "react-router-dom";
import {
  WalletMultiButton,
  WalletDisconnectButton,
} from "@solana/wallet-adapter-react-ui";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

const AppLayout = () => {
  const { connection } = useConnection();
  const { publicKey, connected } = useWallet();

  return (
    <div
      className="flex flex-col"
      style={{ background: "rgb(2,12,34)" }}
    >
      <div className="flex">
        <WalletMultiButton className="wallet-button" />
      </div>
      <Content>
        {connected && publicKey != null && (
          <Routes>
            <Route path="/" element={<Minter />} />
            <Route path="/mint" element={<Minter />} />
          </Routes>
        )}
        {connected == false && <WrongNetwork />}
        {connected && publicKey == null && <WrongNetwork />}
      </Content>
    </div>
    // <Row>
    //   <Col span={24}>
    //     <Layout style={{ minHeight: "100vh" }}>
    //       <div className="flex">
    //         <WalletMultiButton className="wallet-button" />
    //       </div>
    //       <Content>
    //         {connected && publicKey != null && (
    //           <Routes>
    //             <Route path="/" element={<Minter />} />
    //             <Route path="/mint" element={<Minter />} />
    //           </Routes>
    //         )}
    //         {connected == false && <WrongNetwork />}
    //         {connected && publicKey == null && <WrongNetwork />}
    //       </Content>
    //       <Footer
    //         style={{
    //           position: "sticky",
    //           bottom: 0,
    //         }}
    //       >
    //         © 2022 All rights reserved by Daniel Armstrong.
    //       </Footer>
    //     </Layout>
    //   </Col>
    // </Row>
  );
};

export default AppLayout;
