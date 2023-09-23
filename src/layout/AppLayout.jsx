import { BaseRoutes } from "../router";
import { LayoutHeader } from "../components/layout";
import { useEffect, useReducer, useState } from "react";
import { myRoute } from "../router";
import { useLocation } from "react-router-dom";

const AppLayout = () => {
  const [start, setStart] = useState(false);
  const location = useLocation();
  const [layouts, action] = useReducer(
    (layout, values) => {
      return { ...layout, ...values };
    },
    {
      type: null,
      hasTitle: true,
      title: "",
      backHash: "",
    }
  );
  useEffect(() => {
    let pathname = location.pathname;
    let items = myRoute.find((item) => item.path === pathname);
    if (items) {
      action(items.meta);
    }
  }, [location]);
  useEffect(() => {
    setTimeout(() => {
      setStart(true);
    }, 200);
  }, []);
  return (
    <div className="flex flex-col">
      <div style={{ margin: "10px 0 15px" }}>
        {!!layouts.type && start && <LayoutHeader {...layouts} />}
      </div>
      <BaseRoutes />
    </div>
  );
};

export default AppLayout;
