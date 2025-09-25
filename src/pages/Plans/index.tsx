import Plan from "@/@backend-types/Plan";
import HeaderPage from "@/components/HeaderPage";
import Drawer from "@/components/design/Drawer/Drawer";
import Table from "@/components/design/Table/Table";
import { useGetPlans } from "@/hooks/integration/plans/queries";
import useDisclosure from "@/hooks/utils/use-disclosure";
import s from "./styles.module.scss";

const columns = [
  {
    title: "Nome",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Descrição",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Funcionalidades",
    dataIndex: "features",
    key: "features",
  },
];

function Plans() {
  const { data } = useGetPlans();
  const { handleClose, handleOpen, open } = useDisclosure();

  return (
    <div className={s.container}>
      <HeaderPage title="Planos">
        <button onClick={handleOpen}>Novo</button>
      </HeaderPage>

      <Table<Plan> columns={columns} data={data ?? []} />

      <Drawer
        btnConfirmText="Cadastrar"
        onClose={handleClose}
        open={open}
        title="Adicionar barbearia"
        onConfirm={() => {}}
      >
        <form>
          <h1>Nova barbearia</h1>
        </form>
      </Drawer>
    </div>
  );
}

export default Plans;
