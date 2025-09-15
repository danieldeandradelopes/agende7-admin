import { Select as SelectAntD } from "antd";
import { OptionProps as OptionPropsAntD } from "antd/es/select";
import React from "react";

const { Option: OptionAnt } = SelectAntD;

type OptionProps = OptionPropsAntD;

const Option: React.FC<OptionProps> = ({ defaultValue, ...props }) => {
  return (
    <OptionAnt
      defaultValue={defaultValue}
      {...props}
      style={{
        height: 48,
      }}
    />
  );
};

export default Option;
