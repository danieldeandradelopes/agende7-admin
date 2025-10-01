import BarberShop, {
  BarberShopWithDefaultTemplate,
} from "@/@backend-types/BarberShop";
import HeaderPage from "@/components/HeaderPage";
import Wrapper from "@/components/Wrapper";
import Drawer from "@/components/design/Drawer/Drawer";
import Option from "@/components/design/Option";
import Select from "@/components/design/Select";
import Table, { ColumnType } from "@/components/design/Table/Table";
import { useCreateBarberShop } from "@/hooks/integration/barbershops/mutations";
import { useGetBarbershops } from "@/hooks/integration/barbershops/queries";
import { useGetPlans } from "@/hooks/integration/plans/queries";
import useDisclosure from "@/hooks/utils/use-disclosure";
import { FormProvider } from "@/libs/form/FormProvider";
import { useZodForm } from "@/libs/form/useZodForm";
import classNames from "classnames";
import { Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createBarberShopWithTemplateSchema } from "./schema";
import s from "./styles.module.scss";
import { columns } from "./types";

function Barbershops() {
  const { data } = useGetBarbershops();
  const { data: plans } = useGetPlans();

  const { handleClose, handleOpen, open } = useDisclosure();
  const { mutateAsync: barberShopMutateAsync } = useCreateBarberShop();
  const navigate = useNavigate();

  const form = useZodForm({
    schema: createBarberShopWithTemplateSchema,
    mode: "onSubmit",
    defaultValues: {
      email: "",
      name: "",
      address: "",
      document: "",
      phone: "",
      latitude: 0,
      longitude: 0,
      subdomain: "",
      document_type: "cpf",
      cover: "",
      description: "",
      plan_price_id: undefined,
    },
  });

  async function handleSubmit(formData: BarberShopWithDefaultTemplate) {
    await barberShopMutateAsync({
      ...formData,
      plan_price_id: Number(formData.plan_price_id),
    });
    form.reset();
    handleClose();
  }

  const handleRowClick = (record: BarberShop) => {
    navigate(`/barbershop/${record.id}`);
  };

  return (
    <div className={s.container}>
      <HeaderPage title="Barbearias" className={s.header} />

      <button
        className={classNames("btn btn--primary", s.btn)}
        onClick={handleOpen}
      >
        Novo
      </button>

      <Table<BarberShop>
        columns={columns as ColumnType<BarberShop>[]}
        data={data ?? []}
        onRowClick={handleRowClick}
      />

      <Drawer
        btnConfirmText="Cadastrar"
        onConfirm={form.handleSubmit(handleSubmit)}
        onClose={handleClose}
        open={open}
        title="Adicionar barbearia"
      >
        <FormProvider form={form} className={s.form} onSubmit={handleSubmit}>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Wrapper<BarberShopWithDefaultTemplate>
                errorMessage={fieldState.error?.message}
                error={Boolean(fieldState.error)}
                name="name"
                label="Nome:"
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
              <Wrapper<BarberShopWithDefaultTemplate>
                errorMessage={fieldState.error?.message}
                error={Boolean(fieldState.error)}
                name="address"
                label="Endereço:"
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
              <Wrapper<BarberShopWithDefaultTemplate>
                errorMessage={fieldState.error?.message}
                error={Boolean(fieldState.error)}
                name="email"
                label="E-mail:"
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
            name="document_type"
            control={form.control}
            render={({ field, fieldState }) => (
              <Wrapper<BarberShopWithDefaultTemplate>
                errorMessage={fieldState.error?.message}
                error={Boolean(fieldState.error)}
                name="document_type"
                label="Tipo de documento:"
              >
                <Select
                  placeholder="Selecione o tipo de documento"
                  onChange={(event) => field.onChange(event)}
                  value={field.value}
                >
                  <Option value="cpf">CPF</Option>
                  <Option value="cnpj">CNPJ</Option>
                </Select>
              </Wrapper>
            )}
          />

          <Controller
            name="document"
            control={form.control}
            render={({ field, fieldState }) => (
              <Wrapper<BarberShopWithDefaultTemplate>
                errorMessage={fieldState.error?.message}
                error={Boolean(fieldState.error)}
                name="document"
                label="Documento: "
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
            name="phone"
            control={form.control}
            render={({ field, fieldState }) => (
              <Wrapper<BarberShopWithDefaultTemplate>
                errorMessage={fieldState.error?.message}
                error={Boolean(fieldState.error)}
                name="phone"
                label="Telefone:"
              >
                <input
                  name="phone"
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
              <Wrapper<BarberShopWithDefaultTemplate>
                errorMessage={fieldState.error?.message}
                error={Boolean(fieldState.error)}
                name="subdomain"
                label="Subdomínio:"
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
            name="cover"
            control={form.control}
            render={({ field, fieldState }) => (
              <Wrapper<BarberShopWithDefaultTemplate>
                errorMessage={fieldState.error?.message}
                error={Boolean(fieldState.error)}
                name="cover"
                label="Logo:"
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
              <Wrapper<BarberShopWithDefaultTemplate>
                errorMessage={fieldState.error?.message}
                error={Boolean(fieldState.error)}
                name="description"
                label="Descrição:"
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
              <Wrapper<BarberShopWithDefaultTemplate>
                errorMessage={fieldState.error?.message}
                error={Boolean(fieldState.error)}
                name="latitude"
                label="Latitude:"
              >
                <input
                  name="latitude"
                  type="number"
                  placeholder="Latitude"
                  value={field.value ?? ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(
                      value === "" ? undefined : parseFloat(value)
                    );
                  }}
                />
              </Wrapper>
            )}
          />
          <Controller
            name="longitude"
            control={form.control}
            render={({ field, fieldState }) => (
              <Wrapper<BarberShopWithDefaultTemplate>
                errorMessage={fieldState.error?.message}
                error={Boolean(fieldState.error)}
                name="longitude"
                label="Longitude:"
              >
                <input
                  name="longitude"
                  type="number"
                  placeholder="Longitude"
                  value={field.value ?? ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(
                      value === "" ? undefined : parseFloat(value)
                    );
                  }}
                />
              </Wrapper>
            )}
          />

          <Controller
            name="plan_price_id"
            control={form.control}
            render={({ field, fieldState }) => (
              <Wrapper<BarberShopWithDefaultTemplate>
                errorMessage={fieldState.error?.message}
                error={Boolean(fieldState.error)}
                name="plan_price_id"
                label="Plano:"
              >
                <Select
                  placeholder="Selecione o plano"
                  onChange={(event) => field.onChange(event)}
                  value={field.value}
                >
                  {plans?.map((plan) => (
                    <Option key={plan.id} value={plan.id}>
                      {plan.name}
                    </Option>
                  ))}
                </Select>
              </Wrapper>
            )}
          />
        </FormProvider>
      </Drawer>
    </div>
  );
}

export default Barbershops;
