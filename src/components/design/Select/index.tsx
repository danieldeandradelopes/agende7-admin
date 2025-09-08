import { Select as SelectAntD, SelectProps as SelectPropsAntD } from "antd";
import React from "react";

type SelectProps = SelectPropsAntD;

const Select: React.FC<SelectProps> = ({ defaultValue, ...props }) => {
  return (
    <SelectAntD
      defaultValue={defaultValue}
      {...props}
      style={{
        height: 48,
      }}
    />
  );
};

export default Select;
