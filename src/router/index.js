import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";

import App from "../App";

export function BaseRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/app" element={<App />}></Route>
      </Routes>
    </Router>
  );
}
