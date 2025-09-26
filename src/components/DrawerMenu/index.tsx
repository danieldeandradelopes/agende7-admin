import { useAuth } from "@/hooks/utils/use-auth";
import { useCustomNavigate } from "@/hooks/utils/use-custom-navigate";
import { getAuthLocal } from "@/services/firebase";
import {
  HomeOutlined,
  LogoutOutlined,
  MenuOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Drawer, Menu } from "antd";
import { ItemType, MenuItemType } from "antd/es/menu/interface";
import { useState } from "react";
import s from "./menu-drawer.module.scss";

function DrawerMenu() {
  const [open, setOpen] = useState(false);
  const { logout, getUser } = useAuth();
  const navigate = useCustomNavigate();
  const user = getUser();

  const handleLogout = async () => {
    const auth = await getAuthLocal();

    try {
      await auth.signOut();
      logout();
      navigate("/");
    } catch (error) {
      console.error("Erro ao deslogar:", error);
    }
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  const defaultMenuItems = [
    {
      key: "dashboard",
      icon: <HomeOutlined />,
      label: "Dashboard",
      onClick: () => handleNavigate("/dashboard"),
    },
    {
      key: "barbershop",
      icon: <HomeOutlined />,
      label: "Barbearias",
      onClick: () => handleNavigate("/barbershop"),
    },
    {
      key: "plans",
      icon: <HomeOutlined />,
      label: "Planos",
      onClick: () => handleNavigate("/plans"),
    },
    {
      key: "users",
      icon: <UserOutlined />,
      label: "Usuários",
      onClick: () => handleNavigate("/users"),
    },
  ];

  const lastMenuItems = [
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Sair",
      onClick: handleLogout,
    },
  ];

  const menuItems: ItemType<MenuItemType>[] = [
    ...defaultMenuItems,
    ...lastMenuItems,
  ];

  return (
    <div className={s.container}>
      <Button
        type="text"
        icon={<MenuOutlined />}
        onClick={() => setOpen(true)}
        className={s.menuButton}
      />
      <Drawer
        title="Agende7"
        placement="left"
        onClose={() => setOpen(false)}
        open={open}
        className={s.drawer}
      >
        <div className={s.menuContent}>
          <div className={s.userInfo}>
            <Avatar
              size={64}
              src={user?.avatar}
              icon={!user?.avatar && <UserOutlined />}
            />
            <span className={s.userName}>{user?.name}</span>
          </div>
          <Menu mode="vertical" items={menuItems} />
        </div>
      </Drawer>
    </div>
  );
}

export default DrawerMenu;
