import { Rate as RateAntD, RateProps as RatePropsAntD } from "antd";
import React from "react";

type RateProps = RatePropsAntD;

const Rate: React.FC<RateProps> = ({ defaultValue, ...props }) => {
  return <RateAntD allowHalf defaultValue={defaultValue} {...props} />;
};

export default Rate;
