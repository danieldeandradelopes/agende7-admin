import type { DrawerProps } from "antd";
import { Drawer as AntdDrawer, Button, Space } from "antd";
import React from "react";

interface IDrawer {
  title: string;
  placement?: DrawerProps["placement"];
  onClose: () => void;
  open: boolean;
  btnCancelText?: string;
  btnConfirmText: string;
  children: React.ReactNode;
}

const Drawer: React.FC<IDrawer> = ({
  title,
  placement = "right",
  onClose,
  open,
  btnCancelText = "Cancelar",
  btnConfirmText = "Confirmar",
  children,
}) => {
  return (
    <AntdDrawer
      title={title}
      placement={placement}
      width={500}
      onClose={onClose}
      open={open}
      extra={
        <Space>
          <Button onClick={onClose}>{btnCancelText}</Button>
          <Button type="primary" onClick={onClose}>
            {btnConfirmText}
          </Button>
        </Space>
      }
    >
      {children}
    </AntdDrawer>
  );
};

export default Drawer;
