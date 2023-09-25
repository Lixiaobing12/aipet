import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import Home from "../pages/Home";
import Minter from "../pages/Minter";
import Minters from '../pages/Minters';

export const myRoute = [
  {
    path: "/",
    element: <Home />,
    meta: {
      // type:1 首页 2有title、返回路径 3 只有返回路径
      type: 1,
      title:"sss",
      backurl:'/'
    },
  },
  {
    path: "/Mint",
    element: <Minter />,
    meta: {
      // type:1 首页 2有title、返回路径 3 只有返回路径
      type: 2,
      title:"Mint Pet",
      backurl:'/'
    },
  },
  {
    path:'/rM',
    element:<Minters />,
    meta: {
      // type:1 首页 2有title、返回路径 3 只有返回路径
      type: 2,
      title:"Mint Pet",
      backurl:'/'
    },
  }
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
