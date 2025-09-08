import { Path } from "react-hook-form";
import s from "./wrapper.module.scss";
import classNames from "classnames";
interface IWrapperProps<T> extends React.PropsWithChildren {
  label?: string;
  error: boolean;
  errorMessage?: string;
  name: Path<T>;
}

function Wrapper<T>({
  error,
  children,
  name,
  errorMessage,
  label,
  ...props
}: IWrapperProps<T> & { className?: string }) {
  return (
    <div className={classNames(props.className)} {...props}>
      {label && <label htmlFor={name}>{label}</label>}
      {children}
      {error && <span className={s.error}>{errorMessage}</span>}
    </div>
  );
}

export default Wrapper;
