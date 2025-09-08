import BarberShop from "@/@backend-types/BarberShop";
import HeaderPage from "@/components/HeaderPage";
import Table from "@/components/design/Table/Table";
import { useGetBarbershops } from "@/hooks/integration/barbershops/queries";
import s from "./styles.module.scss";

const columns = [
  {
    title: "Avatar",
    dataIndex: "cover",
    key: "cover",
    render: (value: string) => {
      return <img src={value} alt="cover" className={s.avatar} />;
    },
  },
  {
    title: "Nome",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Endereço",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Pagamento",
    dataIndex: "status_payment",
    key: "status_payment",
    render: (value: string) => {
      return <span>{value ?? "N/A"}</span>;
    },
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Documento",
    dataIndex: "document",
    key: "document",
  },
  {
    title: "Aprov. Autom.",
    dataIndex: "auto_approve",
    key: "auto_approve",
    render: (value: string) => {
      return <span>{value ? "Sim" : "Não"}</span>;
    },
  },
  {
    title: "Subdomínio",
    dataIndex: "subdomain",
    key: "subdomain",
  },
];

function Barbershops() {
  const { data } = useGetBarbershops();

  return (
    <div className={s.container}>
      <HeaderPage title="Barbearias" />
      <Table<BarberShop> columns={columns} data={data ?? []} />
    </div>
  );
}

export default Barbershops;
