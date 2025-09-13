import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, MenuProps as MenuAntDProps } from "antd";
import { useState } from "react";

type MenuProps = MenuAntDProps & {
  width?: number;
};

function Menu({ width = 256, items, ...props }: MenuProps) {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div style={{ width }}>
      <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{ marginBottom: 16 }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      {/* <Menu
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]} 
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
        {...props}
      /> */}
    </div>
  );
}

export default Menu;
