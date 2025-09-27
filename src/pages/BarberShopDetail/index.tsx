import BarberShop from "@/@backend-types/BarberShop";
import HeaderPage from "@/components/HeaderPage";
import Wrapper from "@/components/Wrapper";
import Option from "@/components/design/Option";
import Select from "@/components/design/Select";
import { useUpdateBarberShop } from "@/hooks/integration/barbershops/mutations";
import { useGetBarbershopById } from "@/hooks/integration/barbershops/queries";
import { FormProvider } from "@/libs/form/FormProvider";
import { useZodForm } from "@/libs/form/useZodForm";
import { Collapse } from "antd";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { updateBarberShopSchema, UpdateBarberShopType } from "./schema";
import s from "./styles.module.scss";

const items = (
  form: UseFormReturn<UpdateBarberShopType>,
  handleSubmit: (data: UpdateBarberShopType) => void,
  barbershop: BarberShop,
  isEditMode: boolean,
  handleEdit: () => void,
  handleCancelEdit: () => void,
  isPending: boolean
) => [
  {
    key: "1",
    label: "Dados da barbearia",
    children: (
      <>
        {!isEditMode && (
          <button
            className={classNames("btn btn--primary", s.editBtn)}
            onClick={handleEdit}
          >
            <FaEdit /> Editar
          </button>
        )}

        <FormProvider form={form} className={s.form} onSubmit={handleSubmit}>
          {barbershop.cover && (
            <div className={s.imagePreview}>
              <label>Prévia da Logo:</label>
              <img
                src={barbershop.cover}
                alt="Logo da barbearia"
                className={s.coverImage}
              />
            </div>
          )}

          <div className={s.formGrid}>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Wrapper<UpdateBarberShopType>
                  errorMessage={fieldState.error?.message}
                  error={Boolean(fieldState.error)}
                  name="name"
                  label="Nome:"
                >
                  <input
                    name="name"
                    type="text"
                    placeholder="Nome da barbearia"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    disabled={!isEditMode}
                    className={!isEditMode ? s.inputDisabled : ""}
                  />
                </Wrapper>
              )}
            />

            <Controller
              name="address"
              control={form.control}
              render={({ field, fieldState }) => (
                <Wrapper<UpdateBarberShopType>
                  errorMessage={fieldState.error?.message}
                  error={Boolean(fieldState.error)}
                  name="address"
                  label="Endereço:"
                >
                  <input
                    name="address"
                    type="text"
                    placeholder="Endereço completo"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    disabled={!isEditMode}
                    className={!isEditMode ? s.inputDisabled : ""}
                  />
                </Wrapper>
              )}
            />

            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Wrapper<UpdateBarberShopType>
                  errorMessage={fieldState.error?.message}
                  error={Boolean(fieldState.error)}
                  name="email"
                  label="E-mail:"
                >
                  <input
                    name="email"
                    type="email"
                    placeholder="E-mail da barbearia"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    disabled={!isEditMode}
                    className={!isEditMode ? s.inputDisabled : ""}
                  />
                </Wrapper>
              )}
            />

            <Controller
              name="document_type"
              control={form.control}
              render={({ field, fieldState }) => (
                <Wrapper<UpdateBarberShopType>
                  errorMessage={fieldState.error?.message}
                  error={Boolean(fieldState.error)}
                  name="document_type"
                  label="Tipo de documento:"
                >
                  <Select
                    placeholder="Selecione o tipo de documento"
                    onChange={(event) => field.onChange(event)}
                    value={field.value}
                    disabled={!isEditMode}
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
                <Wrapper<UpdateBarberShopType>
                  errorMessage={fieldState.error?.message}
                  error={Boolean(fieldState.error)}
                  name="document"
                  label="Documento:"
                >
                  <input
                    name="document"
                    type="text"
                    placeholder="Número do documento"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    disabled={!isEditMode}
                    className={!isEditMode ? s.inputDisabled : ""}
                  />
                </Wrapper>
              )}
            />

            <Controller
              name="subdomain"
              control={form.control}
              render={({ field, fieldState }) => (
                <Wrapper<UpdateBarberShopType>
                  errorMessage={fieldState.error?.message}
                  error={Boolean(fieldState.error)}
                  name="subdomain"
                  label="Subdomínio:"
                >
                  <input
                    name="subdomain"
                    type="text"
                    placeholder="Subdomínio único"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    disabled={!isEditMode}
                    className={!isEditMode ? s.inputDisabled : ""}
                  />
                </Wrapper>
              )}
            />

            <Controller
              name="cover"
              control={form.control}
              render={({ field, fieldState }) => (
                <Wrapper<UpdateBarberShopType>
                  errorMessage={fieldState.error?.message}
                  error={Boolean(fieldState.error)}
                  name="cover"
                  label="Logo/Imagem:"
                >
                  <input
                    name="cover"
                    type="text"
                    placeholder="URL da imagem"
                    value={field.value || ""}
                    onChange={(e) => field.onChange(e.target.value)}
                    disabled={!isEditMode}
                    className={!isEditMode ? s.inputDisabled : ""}
                  />
                </Wrapper>
              )}
            />

            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Wrapper<UpdateBarberShopType>
                  errorMessage={fieldState.error?.message}
                  error={Boolean(fieldState.error)}
                  name="description"
                  label="Descrição:"
                >
                  <input
                    type="text"
                    name="description"
                    placeholder="Descrição da barbearia"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    disabled={!isEditMode}
                    className={!isEditMode ? s.inputDisabled : ""}
                  />
                </Wrapper>
              )}
            />

            <Controller
              name="latitude"
              control={form.control}
              render={({ field, fieldState }) => (
                <Wrapper<UpdateBarberShopType>
                  errorMessage={fieldState.error?.message}
                  error={Boolean(fieldState.error)}
                  name="latitude"
                  label="Latitude:"
                >
                  <input
                    name="latitude"
                    type="number"
                    step="any"
                    placeholder="Latitude"
                    value={field.value ?? ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(
                        value === "" ? undefined : parseFloat(value)
                      );
                    }}
                    disabled={!isEditMode}
                    className={!isEditMode ? s.inputDisabled : ""}
                  />
                </Wrapper>
              )}
            />

            <Controller
              name="longitude"
              control={form.control}
              render={({ field, fieldState }) => (
                <Wrapper<UpdateBarberShopType>
                  errorMessage={fieldState.error?.message}
                  error={Boolean(fieldState.error)}
                  name="longitude"
                  label="Longitude:"
                >
                  <input
                    name="longitude"
                    type="number"
                    step="any"
                    placeholder="Longitude"
                    value={field.value ?? ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(
                        value === "" ? undefined : parseFloat(value)
                      );
                    }}
                    disabled={!isEditMode}
                    className={!isEditMode ? s.inputDisabled : ""}
                  />
                </Wrapper>
              )}
            />

            <Controller
              name="auto_approve"
              control={form.control}
              render={({ field, fieldState }) => (
                <Wrapper<UpdateBarberShopType>
                  errorMessage={fieldState.error?.message}
                  error={Boolean(fieldState.error)}
                  name="auto_approve"
                  label="Aprovação Automática:"
                >
                  <Select
                    placeholder="Aprovação automática"
                    onChange={(event) => field.onChange(event)}
                    value={field.value === "true" ? "true" : "false"}
                    disabled={!isEditMode}
                  >
                    <Option value="">Não definido</Option>
                    <Option value="true">Sim</Option>
                    <Option value="false">Não</Option>
                  </Select>
                </Wrapper>
              )}
            />

            <Controller
              name="timezone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Wrapper<UpdateBarberShopType>
                  errorMessage={fieldState.error?.message}
                  error={Boolean(fieldState.error)}
                  name="timezone"
                  label="Fuso Horário:"
                >
                  <input
                    name="timezone"
                    type="text"
                    placeholder="Ex: America/Sao_Paulo"
                    value={field.value || ""}
                    onChange={(e) => field.onChange(e.target.value)}
                    disabled={!isEditMode}
                    className={!isEditMode ? s.inputDisabled : ""}
                  />
                </Wrapper>
              )}
            />
          </div>
        </FormProvider>

        {isEditMode && (
          <div className={s.editActions}>
            <button
              className="btn btn--primary"
              onClick={form.handleSubmit(handleSubmit)}
              disabled={isPending}
            >
              <FaSave /> {isPending ? "Salvando..." : "Salvar"}
            </button>
            <button
              className="btn btn--danger"
              onClick={handleCancelEdit}
              disabled={isPending}
            >
              <FaTimes /> Cancelar
            </button>
          </div>
        )}
      </>
    ),
  },
  {
    key: "2",
    label: "Horários de funcionamento",
    children: <p>teste2</p>,
  },
  {
    key: "3",
    label: "Configurações",
    children: <p>essee3</p>,
  },
];

function BarberShopDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);

  const barbershopId = id ? parseInt(id, 10) : 0;
  const { data: barbershop, isLoading } = useGetBarbershopById(barbershopId);
  const { mutateAsync: updateBarberShop, isPending } = useUpdateBarberShop();

  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  const form = useZodForm({
    schema: updateBarberShopSchema,
    mode: "onSubmit",
    defaultValues: {
      name: "",
      address: "",
      email: "",
      document: "",
      document_type: "cpf" as const,
      subdomain: "",
      cover: "",
      description: "",
      latitude: "",
      longitude: "",
      auto_approve: "false",
      timezone: "",
    },
  });

  useEffect(() => {
    if (barbershop) {
      form.reset({
        name: barbershop.name || "",
        address: barbershop.address || "",
        email: barbershop.email || "",
        document: barbershop.document || "",
        document_type: (barbershop.document_type as "cpf" | "cnpj") || "cpf",
        subdomain: barbershop.subdomain || "",
        cover: barbershop.cover || "",
        description: barbershop.description || "",
        latitude: barbershop.latitude || "",
        longitude: barbershop.longitude || "",
        auto_approve: barbershop.auto_approve ? "true" : "false",
        timezone: barbershop.timezone || "",
      });
    }
  }, [barbershop, form]);

  async function handleSubmit(formData: UpdateBarberShopType) {
    if (!barbershopId) return;

    await updateBarberShop({
      id: barbershopId,
      data: {
        ...formData,
        latitude: formData.latitude ? parseFloat(formData.latitude) : undefined,
        longitude: formData.longitude
          ? parseFloat(formData.longitude)
          : undefined,
      },
    });
    setIsEditMode(false);
  }

  function handleEdit() {
    setIsEditMode(true);
  }

  function handleCancelEdit() {
    setIsEditMode(false);
    if (barbershop) {
      form.reset({
        name: barbershop.name || "",
        address: barbershop.address || "",
        email: barbershop.email || "",
        document: barbershop.document || "",
        document_type: (barbershop.document_type as "cpf" | "cnpj") || "cpf",
        subdomain: barbershop.subdomain || "",
        cover: barbershop.cover || "",
        description: barbershop.description || "",
        latitude: barbershop.latitude || 0,
        longitude: barbershop.longitude || 0,
        auto_approve: barbershop.auto_approve ? "true" : "false",
        timezone: barbershop.timezone || "",
      });
    }
  }

  function handleBack() {
    navigate("/barbershop");
  }

  if (isLoading) {
    return (
      <div className={s.container}>
        <HeaderPage title="Carregando..." className={s.header} />
        <div className={s.loading}>Carregando dados da barbearia...</div>
      </div>
    );
  }

  if (!barbershop) {
    return (
      <div className={s.container}>
        <HeaderPage title="Barbearia não encontrada" className={s.header} />
        <div className={s.error}>
          <p>Barbearia não encontrada.</p>
          <button className="btn btn--primary" onClick={handleBack}>
            Voltar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={s.container}>
      <HeaderPage
        title={`Visualizando: ${barbershop.name}`}
        className={s.header}
      />
      <div className={s.actions}>
        <button className="btn btn--secondary" onClick={handleBack}>
          Voltar
        </button>
      </div>

      <Collapse
        items={items(
          form,
          handleSubmit,
          barbershop,
          isEditMode,
          handleEdit,
          handleCancelEdit,
          isPending
        )}
        defaultActiveKey={["1"]}
        onChange={onChange}
      />
    </div>
  );
}

export default BarberShopDetail;
