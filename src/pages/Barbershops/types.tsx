import { ColumnType } from "antd/es/table";

import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import s from "./styles.module.scss";

export const columns: ColumnType[] = [
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
    render: (value: string | undefined) => {
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
    render: (value: string | undefined) => {
      return <span>{value ? "Sim" : "Não"}</span>;
    },
  },
  {
    title: "Subdomínio",
    dataIndex: "subdomain",
    key: "subdomain",
  },
  {
    title: "Ações",
    dataIndex: "actions",
    key: "actions",
    render: () => {
      return (
        <div className={s.actions}>
          <FaRegTrashAlt />
          <FaEdit />
        </div>
      );
    },
  },
];
