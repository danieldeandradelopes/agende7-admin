import { useBrandingContext } from "@/context/branding";

import { MoonOutlined, MoreOutlined, SunOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";
import { Outlet } from "react-router-dom";
import s from "./root.module.scss";
import DrawerMenu from "@/components/DrawerMenu";

function RooLayout() {
  const { theme, setTheme } = useBrandingContext();

  function handleChangeTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  return (
    <div className={s.container}>
      <DrawerMenu />
      <div className={s.content}>
        <Outlet />
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
