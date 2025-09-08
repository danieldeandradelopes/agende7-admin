import s from "./divisor.module.scss";
interface IDivisorProps {
  width?: number;
  marginTop?: number;
  marginBottom?: number;
}

function Divisor({ width, marginBottom, marginTop }: IDivisorProps) {
  const margins = {
    marginTop: marginTop ? `${marginTop}px` : "0",
    marginBottom: marginBottom ? `${marginBottom}px` : "0",
  };

  return (
    <div
      style={{ width: width ? `${width}px` : "100%", ...margins }}
      className={s.container}
    />
  );
}

export default Divisor;
