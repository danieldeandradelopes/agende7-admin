import { Select as SelectAntD, SelectProps as SelectPropsAntD } from "antd";
import React from "react";
import s from "./select.module.scss";

type SelectProps = SelectPropsAntD;

const Select: React.FC<SelectProps> = ({ defaultValue, ...props }) => {
  return (
    <SelectAntD
      className={s.container}
      defaultValue={defaultValue}
      {...props}
    />
  );
};

export default Select;
