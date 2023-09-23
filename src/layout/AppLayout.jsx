import { Layout, Row, Col } from "antd";
import { Content, Footer, Header } from "antd/lib/layout/layout";
import Minter from "../pages/Minter";
import WrongNetwork from "../pages/WrongNetwork";
import logo from "../images/sol.png";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  useRoutes,
} from "react-router-dom";
import {
  WalletMultiButton,
  WalletDisconnectButton,
} from "@solana/wallet-adapter-react-ui";
import { BaseRoutes } from "../router";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LayoutHeader } from "../components/layout";
import { useEffect, useReducer } from "react";
import { myRoute } from "../router";
import Home from "../pages/Home";

const AppLayout = () => {
  const { connection } = useConnection();
  const { publicKey, connected } = useWallet();
  const [layouts, action] = useReducer(
    (layout, values) => {
      return { ...layout, ...values };
    },
    {
      type: 0,
      hasTitle: true,
      title: "",
      backHash: "",
    }
  );
  useEffect(() => {
    const func = (hash) => {
      let pathname = hash;
      let items = myRoute.find((item) => item.path === pathname);
      if (items) {
        action(items);
      }
    };
    func(window.location.pathname);
    window.onhashchange = (hash) => {
      console.log("hash", hash);
    };
  }, []);
  return (
    <div className="flex flex-col">
      <LayoutHeader {...layouts} />
      <Content>
        <Router>
          <BaseRoutes />
        </Router>
      </Content>
    </div>
  );
};

export default AppLayout;
