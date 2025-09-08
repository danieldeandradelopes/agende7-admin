import EmptyIcon from "@/assets/empty.svg";
import s from "./empty.module.scss";

interface IEmptyProps {
  message?: string;
  size?: string;
  fontSize?: string;
}

function Empty({
  message = "Não há nada aqui :( ",
  size = "100%",
  fontSize = "1.8rem",
}: IEmptyProps) {
  return (
    <div className={s.container}>
      <img src={EmptyIcon} alt="empty" style={{ width: size, height: size }} />
      <span style={{ fontSize: fontSize }}>{message}</span>
    </div>
  );
}

export default Empty;
