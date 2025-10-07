import { HiAcademicCap, HiHome, HiUser } from "react-icons/hi";
import { Link } from "react-router-dom";
import s from "./side-navbar.module.scss";

function SideNavBar() {
  return (
    <div className={s.container}>
      <Link to="/dashboard">
        <HiHome size={24} />
        Dashboard
      </Link>
      <Link to="/barbershop">
        <HiAcademicCap size={24} />
        Barbearias
      </Link>

      <Link to="/users">
        <HiUser size={24} />
        Usuários
      </Link>
    </div>
  );
}

export default SideNavBar;
