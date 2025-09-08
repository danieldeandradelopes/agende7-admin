import { Spin } from "antd";
import s from "./loading.module.scss";

function Loading() {
  return (
    <div className={s.container}>
      <Spin size="large"></Spin>
    </div>
  );
}

export default Loading;
