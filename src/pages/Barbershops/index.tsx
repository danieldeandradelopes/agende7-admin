import { CreateBarberShopWithTemplate } from "@/@backend-types/BarberShop";
import HeaderPage from "@/components/HeaderPage";
import Wrapper from "@/components/Wrapper";
import Drawer from "@/components/design/Drawer/Drawer";
import Table from "@/components/design/Table/Table";
import { useCreateBarberShop } from "@/hooks/integration/barbershops/mutations";
import { useGetBarbershops } from "@/hooks/integration/barbershops/queries";
import useDisclosure from "@/hooks/utils/use-disclosure";
import { FormProvider } from "@/libs/form/FormProvider";
import { useZodForm } from "@/libs/form/useZodForm";
import classNames from "classnames";
import { Controller } from "react-hook-form";
import { createBarberShopWithTemplateSchema } from "./schema";
import s from "./styles.module.scss";
import { columns } from "./types";

function Barbershops() {
  const { data } = useGetBarbershops();
  const { handleClose, handleOpen, open } = useDisclosure();
  const { mutateAsync: barberShopMutateAsync } = useCreateBarberShop();
  const form = useZodForm({
    schema: createBarberShopWithTemplateSchema,
    mode: "onSubmit",
    defaultValues: {
      email: "",
      name: "",
      address: "",
      document: "",
      features: [],
      phone: "",
      latitude: 0,
      longitude: 0,
      subdomain: "",
      documentType: "cpf",
      cover: "",
      description: "",
    },
  });

  async function handleSubmit(formData: CreateBarberShopWithTemplate) {
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
              <Wrapper<CreateBarberShopWithTemplate>
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
              <Wrapper<CreateBarberShopWithTemplate>
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
              <Wrapper<CreateBarberShopWithTemplate>
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
              <Wrapper<CreateBarberShopWithTemplate>
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
            name="features"
            control={form.control}
            render={({ field, fieldState }) => (
              <Wrapper<CreateBarberShopWithTemplate>
                errorMessage={fieldState.error?.message}
                error={Boolean(fieldState.error)}
                name="features"
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
            name="phone"
            control={form.control}
            render={({ field, fieldState }) => (
              <Wrapper<CreateBarberShopWithTemplate>
                errorMessage={fieldState.error?.message}
                error={Boolean(fieldState.error)}
                name="phone"
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
              <Wrapper<CreateBarberShopWithTemplate>
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
            name="documentType"
            control={form.control}
            render={({ field, fieldState }) => (
              <Wrapper<CreateBarberShopWithTemplate>
                errorMessage={fieldState.error?.message}
                error={Boolean(fieldState.error)}
                name="documentType"
              >
                <input
                  name="documentType"
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
              <Wrapper<CreateBarberShopWithTemplate>
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
              <Wrapper<CreateBarberShopWithTemplate>
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
              <Wrapper<CreateBarberShopWithTemplate>
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
              <Wrapper<CreateBarberShopWithTemplate>
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
        </FormProvider>
      </Drawer>
    </div>
  );
}

export default Barbershops;
