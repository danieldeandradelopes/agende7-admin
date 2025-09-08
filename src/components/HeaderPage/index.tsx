import s from "./header-page.module.scss";

interface IHeaderPageProps {
  title: string;
  children?: React.ReactNode;
}

function HeaderPage({ title, children }: IHeaderPageProps) {
  return (
    <header className={s.container}>
      <h3>{title}</h3>
      {children}
    </header>
  );
}

export default HeaderPage;
