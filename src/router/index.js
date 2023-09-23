import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
  useRoutes,
} from "react-router-dom";

import App from "../App";
import Home from "../pages/Home";

export const myRoute = [
  {
    path: "/",
    element: <Home />,
    meta: {
      pageType: 1,
    },
  },
];



export function BaseRoutes() {
  return (
    <Routes>
      {myRoute.map((item) => (
        <Route path={item.path} element={item.element} />
      ))}
    </Routes>
  );
}
