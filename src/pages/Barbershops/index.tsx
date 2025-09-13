import BarberShop from "@/@backend-types/BarberShop";
import HeaderPage from "@/components/HeaderPage";
import Wrapper from "@/components/Wrapper";
import Drawer from "@/components/design/Drawer/Drawer";
import Table from "@/components/design/Table/Table";
import { useCreateBarberShop } from "@/hooks/integration/barbershops/mutations";
import { useGetBarbershops } from "@/hooks/integration/barbershops/queries";
import useDisclosure from "@/hooks/utils/use-disclosure";
import { FormProvider } from "@/libs/form/FormProvider";
import { useZodForm } from "@/libs/form/useZodForm";
import { ColumnType } from "antd/es/table";
import classNames from "classnames";
import { Controller } from "react-hook-form";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { barberShopSchema } from "./schema";
import s from "./styles.module.scss";

const columns: ColumnType[] = [
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

function Barbershops() {
  const { data } = useGetBarbershops();
  const { handleClose, handleOpen, open } = useDisclosure();
  const { mutateAsync: barberShopMutateAsync } = useCreateBarberShop();
  const form = useZodForm({
    schema: barberShopSchema,
    mode: "onSubmit",
    defaultValues: {
      email: "",
      name: "",
      address: "",
      document: "",
      auto_approve: false,
      status_payment: "",
      social_medias: "",
      phones: "",
      branding: "",
      latitude: "",
      longitude: "",
      subdomain: "",
      timezone: "",
      document_type: "",
      cover: "",
      description: "",
    },
  });

  async function handleSubmit(formData: BarberShop) {
    console.log(formData);
    await barberShopMutateAsync(formData);
    handleClose();
  }

  return (
    <div className={s.container}>
      <HeaderPage title="Barbearias">
        <button
          className={classNames("btn btn--primary", s.btn)}
          onClick={handleOpen}
        >
          Novo
        </button>
      </HeaderPage>
      <Table columns={columns} data={data ?? []} />

      <Drawer
        btnConfirmText="Cadastrar"
        onConfirm={form.handleSubmit(handleSubmit)}
        onClose={handleClose}
        open={open}
        title="Adicionar barbearia"
      >
        <FormProvider form={form} className={s.form} onSubmit={() => {}}>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Wrapper<BarberShop>
                errorMessage={fieldState.error?.message}
                error={Boolean(fieldState.error)}
                name="name"
              >
                <input
                  name="name"
                  type="text"
                  placeholder="Nome"
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                />
              </Wrapper>
            )}
          />

          <Controller
            name="address"
            control={form.control}
            render={({ field, fieldState }) => (
              <Wrapper<BarberShop>
                errorMessage={fieldState.error?.message}
                error={Boolean(fieldState.error)}
                name="address"
              >
                <input
                  name="address"
                  type="text"
                  placeholder="Endereço"
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                />
              </Wrapper>
            )}
          />

          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Wrapper<BarberShop>
                errorMessage={fieldState.error?.message}
                error={Boolean(fieldState.error)}
                name="email"
              >
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                />
              </Wrapper>
            )}
          />

          <Controller
            name="document"
            control={form.control}
            render={({ field, fieldState }) => (
              <Wrapper<BarberShop>
                errorMessage={fieldState.error?.message}
                error={Boolean(fieldState.error)}
                name="document"
              >
                <input
                  name="document"
                  type="text"
                  placeholder="Documento"
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                />
              </Wrapper>
            )}
          />

          <Controller
            name="auto_approve"
            control={form.control}
            render={({ field, fieldState }) => (
              <Wrapper<BarberShop>
                errorMessage={fieldState.error?.message}
                error={Boolean(fieldState.error)}
                name="auto_approve"
              >
                <div className={s.auto_approve}>
                  <input
                    name="auto_approve"
                    type="checkbox"
                    placeholder="Auto aprove"
                    value={field.value}
                    onChange={(value) => field.onChange(value)}
                  />
                  <label htmlFor="auto_approve">Auto aprove</label>
                </div>
              </Wrapper>
            )}
          />
          <Controller
            name="status_payment"
            control={form.control}
            render={({ field, fieldState }) => (
              <Wrapper<BarberShop>
                errorMessage={fieldState.error?.message}
                error={Boolean(fieldState.error)}
                name="status_payment"
              >
                <input
                  name="status_payment"
                  type="text"
                  placeholder="Status de pagamento"
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                />
              </Wrapper>
            )}
          />
          <Controller
            name="social_medias"
            control={form.control}
            render={({ field, fieldState }) => (
              <Wrapper<BarberShop>
                errorMessage={fieldState.error?.message}
                error={Boolean(fieldState.error)}
                name="social_medias"
              >
                <input
                  name="social_medias"
                  type="text"
                  placeholder="Médias sociais"
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                />
              </Wrapper>
            )}
          />
          <Controller
            name="phones"
            control={form.control}
            render={({ field, fieldState }) => (
              <Wrapper<BarberShop>
                errorMessage={fieldState.error?.message}
                error={Boolean(fieldState.error)}
                name="phones"
              >
                <input
                  name="phones"
                  type="text"
                  placeholder="Telefones"
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                />
              </Wrapper>
            )}
          />
          <Controller
            name="subdomain"
            control={form.control}
            render={({ field, fieldState }) => (
              <Wrapper<BarberShop>
                errorMessage={fieldState.error?.message}
                error={Boolean(fieldState.error)}
                name="subdomain"
              >
                <input
                  name="subdomain"
                  type="text"
                  placeholder="Subdomínio"
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                />
              </Wrapper>
            )}
          />
          <Controller
            name="timezone"
            control={form.control}
            render={({ field, fieldState }) => (
              <Wrapper<BarberShop>
                errorMessage={fieldState.error?.message}
                error={Boolean(fieldState.error)}
                name="timezone"
              >
                <input
                  name="timezone"
                  type="text"
                  placeholder="Timezone"
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                />
              </Wrapper>
            )}
          />
          <Controller
            name="document_type"
            control={form.control}
            render={({ field, fieldState }) => (
              <Wrapper<BarberShop>
                errorMessage={fieldState.error?.message}
                error={Boolean(fieldState.error)}
                name="document_type"
              >
                <input
                  name="document_type"
                  type="text"
                  placeholder="Tipo de documento"
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                />
              </Wrapper>
            )}
          />

          <Controller
            name="cover"
            control={form.control}
            render={({ field, fieldState }) => (
              <Wrapper<BarberShop>
                errorMessage={fieldState.error?.message}
                error={Boolean(fieldState.error)}
                name="cover"
              >
                <input
                  name="cover"
                  type="text"
                  placeholder="Cover"
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                />
              </Wrapper>
            )}
          />

          <Controller
            name="description"
            control={form.control}
            render={({ field, fieldState }) => (
              <Wrapper<BarberShop>
                errorMessage={fieldState.error?.message}
                error={Boolean(fieldState.error)}
                name="description"
              >
                <input
                  name="description"
                  type="text"
                  placeholder="Descrição"
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                />
              </Wrapper>
            )}
          />

          <Controller
            name="latitude"
            control={form.control}
            render={({ field, fieldState }) => (
              <Wrapper<BarberShop>
                errorMessage={fieldState.error?.message}
                error={Boolean(fieldState.error)}
                name="latitude"
              >
                <input
                  name="latitude"
                  type="text"
                  placeholder="Latitude"
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                />
              </Wrapper>
            )}
          />
          <Controller
            name="longitude"
            control={form.control}
            render={({ field, fieldState }) => (
              <Wrapper<BarberShop>
                errorMessage={fieldState.error?.message}
                error={Boolean(fieldState.error)}
                name="longitude"
              >
                <input
                  name="longitude"
                  type="text"
                  placeholder="Longitude"
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                />
              </Wrapper>
            )}
          />
          <Controller
            name="branding"
            control={form.control}
            render={({ field, fieldState }) => (
              <Wrapper<BarberShop>
                errorMessage={fieldState.error?.message}
                error={Boolean(fieldState.error)}
                name="branding"
              >
                <input
                  name="branding"
                  type="text"
                  placeholder="Branding"
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                />
              </Wrapper>
            )}
          />
        </FormProvider>
      </Drawer>
    </div>
  );
}

export default Barbershops;
