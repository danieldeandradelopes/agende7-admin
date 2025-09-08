import { Switch as SwitchAntD, SwitchProps as SwitchPropsAntD } from "antd";
import React from "react";
import s from "./switch.module.scss";

type SwitchProps = SwitchPropsAntD;

const Switch: React.FC<SwitchProps> = ({ defaultValue, ...props }) => {
  return (
    <div className={s.container}>
      <SwitchAntD defaultValue={defaultValue} {...props} />
    </div>
  );
};

export default Switch;
