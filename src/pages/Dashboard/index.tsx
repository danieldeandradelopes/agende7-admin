import HeaderPage from "@/components/HeaderPage";
import s from "./styles.module.scss";

function Dashboard() {
  return (
    <div className={s.container}>
      <HeaderPage title="Dashboard" />
    </div>
  );
}

export default Dashboard;
