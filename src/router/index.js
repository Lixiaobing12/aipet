import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import Minter from "../pages/Minter";
import Minters from "../pages/Minters";
import PetArchives from "../pages/PetArchives";
import Martin from "../pages/Martin/MartinPet";
import MartinSkin from "../pages/Martin/MartinSkin";
import MartinHouse from "../pages/Martin/MartinHouse";
import TitleSlot from "../components/martin/TitleSlot";
import Feed from "../pages/Feed";

export const myRoute = [
  {
    path: "/",
    element: <Home />,
    meta: {
      // type:1 首页 2有title、返回路径 3 只有返回路径
      type: 1,
      title: "sss",
      backurl: "/",
    },
  },
  {
    path: "/petArchives",
    element: <PetArchives />,
    meta: {
      // type:1 首页 2有title、返回路径 3 只有返回路径
      type: 1,
      title: "petArchives",
      backurl: "/",
    },
  },
  {
    path: "/Mint",
    element: <Minter />,
    meta: {
      // type:1 首页 2有title、返回路径 3 只有返回路径
      type: 2,
      title: "Mint Pet",
      backurl: "/",
    },
  },
  {
    path: "/Martin-Pet",
    element: <Martin />,
    meta: {
      // type:1 首页 2有title、返回路径 3 只有返回路径 4使用组件
      type: 4,
      title: "",
      slot: <TitleSlot />,
      backurl: "/",
    },
  },
  {
    path: "/Martin-Skin",
    element: <MartinSkin />,
    meta: {
      // type:1 首页 2有title、返回路径 3 只有返回路径 4使用组件
      type: 4,
      title: "",
      slot: <TitleSlot />,
      backurl: "/",
    },
  },
  {
    path: "/Martin-House",
    element: <MartinHouse />,
    meta: {
      // type:1 首页 2有title、返回路径 3 只有返回路径 4使用组件
      type: 4,
      title: "",
      slot: <TitleSlot />,
      backurl: "/",
    },
  },
  {
    path: "/Feed",
    element: <Feed />,
    meta: {
      // type:1 首页 2有title、返回路径 3 只有返回路径
      type: 3,
      title: "Feed Pet",
      backurl: "/",
    },
  },
  // {
  //   path:'/rM',
  //   element:<Minters />,
  //   meta: {
  //     // type:1 首页 2有title、返回路径 3 只有返回路径
  //     type: 2,
  //     title:"Mint Pet",
  //     backurl:'/'
  //   },
  // }
];

export function BaseRoutes() {
  return (
    <Routes>
      {myRoute.map((item) => (
        <Route path={item.path} element={item.element} key={item.path} />
      ))}
    </Routes>
  );
}
