import { useBrandingContext } from "@/context/branding";

import SideNavBar from "@/components/design/SideNavBar";
import { MoonOutlined, MoreOutlined, SunOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";
import { Outlet } from "react-router-dom";
import s from "./root.module.scss";

function RooLayout() {
  const { theme, setTheme } = useBrandingContext();

  function handleChangeTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  return (
    <div className={s.container}>
      <div className={s.content}>
        <SideNavBar />
        <div className={s.children}>
          <Outlet />
        </div>
      </div>

      <FloatButton.Group
        trigger="click"
        placement="top"
        style={{ position: "absolute", bottom: 96 }}
        type="primary"
        icon={<MoreOutlined />}
      >
        <FloatButton
          shape="circle"
          type="primary"
          icon={theme === "dark" ? <SunOutlined /> : <MoonOutlined />}
          className={s.float}
          onClick={handleChangeTheme}
        />
      </FloatButton.Group>
    </div>
  );
}

export default RooLayout;
