import React, { useState } from "react";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import classNames from "classnames";
import s from "./input-password.module.scss";

export interface InputPasswordProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  showPassword?: boolean;
}

export const InputPassword: React.FC<InputPasswordProps> = ({
  showPassword: initialShowPassword = false,
  className,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(initialShowPassword);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className={s.container}>
      <input
        className={classNames("input-password", className)}
        {...props}
        type={showPassword ? "text" : "password"}
      />

      {showPassword ? (
        <EyeOutlined onClick={handleTogglePassword} />
      ) : (
        <EyeInvisibleOutlined onClick={handleTogglePassword} />
      )}
    </div>
  );
};
