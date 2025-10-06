import User from "@/@backend-types/User";
import HeaderPage from "@/components/HeaderPage";
import Drawer from "@/components/design/Drawer/Drawer";
import Table, { ColumnType } from "@/components/design/Table/Table";
import { useGetUsers } from "@/hooks/integration/users/queries";
import useDisclosure from "@/hooks/utils/use-disclosure";
import { TableProps } from "antd";
import classNames from "classnames";
import s from "./styles.module.scss";
import { useState } from "react";
import { format } from "date-fns";

const columns = [
  {
    title: "Nome",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Nível de acesso",
    dataIndex: "access_level",
    key: "access_level",
  },
  {
    title: "Telefone",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Criado em",
    dataIndex: "created_at",
    key: "created_at",
    render: (value: string) => format(new Date(value), "dd/MM/yyyy"),
    sorter: (a: User, b: User) =>
      new Date(a.created_at ?? "").getTime() -
      new Date(b.created_at ?? "").getTime(),
    sortDirections: ["descend", "ascend"],
    defaultSortOrder: "descend",
  },
];

function Users() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { data } = useGetUsers({ page, limit });
  const { handleClose, handleOpen, open } = useDisclosure();

  const handleChange = async (pagination: TableProps<User>["pagination"]) => {
    if (!pagination) return;

    setPage(pagination?.current ?? 1);
    setLimit(pagination?.pageSize ?? 10);
  };

  return (
    <div className={s.container}>
      <HeaderPage title="Usuários" />

      <button
        className={classNames("btn btn--primary", s.btn)}
        onClick={handleOpen}
      >
        Novo
      </button>

      <Table<User>
        columns={columns as ColumnType<User>[]}
        data={data?.data ?? []}
        pagination={data?.pagination}
        onChange={handleChange}
      />

      <Drawer
        btnConfirmText="Cadastrar"
        onClose={handleClose}
        open={open}
        title="Adicionar usuário"
        onConfirm={() => {}}
      >
        <form>
          <h1>Novo usuário</h1>
        </form>
      </Drawer>
    </div>
  );
}

export default Users;
