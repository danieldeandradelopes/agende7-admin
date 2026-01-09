import Wrapper from "@/components/Wrapper";
import { useGetBrandingById } from "@/hooks/integration/branding/queries";
import {
  useCreateBranding,
  useUpdateBranding,
} from "@/hooks/integration/branding/mutations";
import { FormProvider } from "@/libs/form/FormProvider";
import { useZodForm } from "@/libs/form/useZodForm";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { FaEdit, FaPlus, FaSave, FaTimes } from "react-icons/fa";
import { updateBrandingSchema, UpdateBrandingType } from "../schema";
import s from "../styles.module.scss";

export default function BrandingSection({
  barbershopId,
}: {
  barbershopId: number;
}) {
  const { data: branding, isLoading } = useGetBrandingById(barbershopId);
  const { mutateAsync: createBranding, isPending: isCreating } =
    useCreateBranding();
  const { mutateAsync: updateBranding, isPending: isUpdating } =
    useUpdateBranding();
  const [isEditing, setIsEditing] = useState(false);
  const form = useZodForm({ schema: updateBrandingSchema });

  const isPending = isCreating || isUpdating;

  useEffect(() => {
    if (branding) {
      form.reset({
        name: branding.name || "",
        theme: branding.theme || "light",
        // Paleta base
        primary_color: branding.primary_color || "",
        secondary_color: branding.secondary_color || "",
        tertiary_color: branding.tertiary_color || "",
        quaternary_color: branding.quaternary_color || "",
        background_color: branding.background_color || "",
        surface_color: branding.surface_color || "",
        text_primary_color: branding.text_primary_color || "",
        text_secondary_color: branding.text_secondary_color || "",
        border_color: branding.border_color || "",
        error_color: branding.error_color || "",
        success_color: branding.success_color || "",
        // Botões
        btn_primary_bg: branding.btn_primary_bg || "",
        btn_primary_text: branding.btn_primary_text || "",
        btn_secondary_bg: branding.btn_secondary_bg || "",
        btn_secondary_text: branding.btn_secondary_text || "",
        btn_tertiary_bg: branding.btn_tertiary_bg || "",
        btn_tertiary_text: branding.btn_tertiary_text || "",
        btn_quaternary_bg: branding.btn_quaternary_bg || "",
        btn_quaternary_text: branding.btn_quaternary_text || "",
        // Textos
        heading_color: branding.heading_color || "",
        subheading_color: branding.subheading_color || "",
        text_default: branding.text_default || "",
        text_muted: branding.text_muted || "",
        link_color: branding.link_color || "",
        link_hover_color: branding.link_hover_color || "",
        // Inputs
        input_bg: branding.input_bg || "",
        input_text: branding.input_text || "",
        input_border: branding.input_border || "",
        input_placeholder: branding.input_placeholder || "",
        input_focus_border: branding.input_focus_border || "",
        // Containers
        app_background: branding.app_background || "",
        card_background: branding.card_background || "",
        card_border: branding.card_border || "",
        card_shadow: branding.card_shadow || "",
        // Drawer/Sidebar
        drawer_bg: branding.drawer_bg || "",
        drawer_text: branding.drawer_text || "",
        drawer_border: branding.drawer_border || "",
        drawer_hover_bg: branding.drawer_hover_bg || "",
        drawer_active_bg: branding.drawer_active_bg || "",
        // Assets
        logo: branding.logo || "",
        favicon: branding.favicon || "",
      });
    }
  }, [branding, form]);

  const handleSubmit = async (data: UpdateBrandingType) => {
    if (branding && branding.id) {
      await updateBranding({ barbershopId, data });
    } else {
      await createBranding({ barbershopId, data });
    }
    setIsEditing(false);
  };

  const getDefaultValues = () => ({
    name: "",
    theme: "light" as const,
    primary_color: "#7359F8",
    secondary_color: "#9B8AFF",
    tertiary_color: "#C4B9FF",
    quaternary_color: "#E5DFFF",
    background_color: "#FFFFFF",
    surface_color: "#F5F5F5",
    text_primary_color: "#1A1A1A",
    text_secondary_color: "#666666",
    border_color: "#E0E0E0",
    error_color: "#F44336",
    success_color: "#4CAF50",
    btn_primary_bg: "#7359F8",
    btn_primary_text: "#FFFFFF",
    btn_secondary_bg: "#9B8AFF",
    btn_secondary_text: "#FFFFFF",
    btn_tertiary_bg: "#C4B9FF",
    btn_tertiary_text: "#1A1A1A",
    btn_quaternary_bg: "#E5DFFF",
    btn_quaternary_text: "#1A1A1A",
    heading_color: "#1A1A1A",
    subheading_color: "#333333",
    text_default: "#1A1A1A",
    text_muted: "#999999",
    link_color: "#7359F8",
    link_hover_color: "#5A3FD9",
    input_bg: "#FFFFFF",
    input_text: "#1A1A1A",
    input_border: "#E0E0E0",
    input_placeholder: "#999999",
    input_focus_border: "#7359F8",
    app_background: "#FFFFFF",
    card_background: "#FFFFFF",
    card_border: "#E0E0E0",
    card_shadow: "0 2px 8px rgba(0,0,0,0.1)",
    drawer_bg: "#FFFFFF",
    drawer_text: "#1A1A1A",
    drawer_border: "#E0E0E0",
    drawer_hover_bg: "#F5F5F5",
    drawer_active_bg: "#E5DFFF",
    logo: "",
    favicon: "",
  });

  const handleCancel = () => {
    setIsEditing(false);
    if (branding && branding.id) {
      form.reset({
        name: branding.name || "",
        theme: branding.theme || "light",
        primary_color: branding.primary_color || "",
        secondary_color: branding.secondary_color || "",
        tertiary_color: branding.tertiary_color || "",
        quaternary_color: branding.quaternary_color || "",
        background_color: branding.background_color || "",
        surface_color: branding.surface_color || "",
        text_primary_color: branding.text_primary_color || "",
        text_secondary_color: branding.text_secondary_color || "",
        border_color: branding.border_color || "",
        error_color: branding.error_color || "",
        success_color: branding.success_color || "",
        btn_primary_bg: branding.btn_primary_bg || "",
        btn_primary_text: branding.btn_primary_text || "",
        btn_secondary_bg: branding.btn_secondary_bg || "",
        btn_secondary_text: branding.btn_secondary_text || "",
        btn_tertiary_bg: branding.btn_tertiary_bg || "",
        btn_tertiary_text: branding.btn_tertiary_text || "",
        btn_quaternary_bg: branding.btn_quaternary_bg || "",
        btn_quaternary_text: branding.btn_quaternary_text || "",
        heading_color: branding.heading_color || "",
        subheading_color: branding.subheading_color || "",
        text_default: branding.text_default || "",
        text_muted: branding.text_muted || "",
        link_color: branding.link_color || "",
        link_hover_color: branding.link_hover_color || "",
        input_bg: branding.input_bg || "",
        input_text: branding.input_text || "",
        input_border: branding.input_border || "",
        input_placeholder: branding.input_placeholder || "",
        input_focus_border: branding.input_focus_border || "",
        app_background: branding.app_background || "",
        card_background: branding.card_background || "",
        card_border: branding.card_border || "",
        card_shadow: branding.card_shadow || "",
        drawer_bg: branding.drawer_bg || "",
        drawer_text: branding.drawer_text || "",
        drawer_border: branding.drawer_border || "",
        drawer_hover_bg: branding.drawer_hover_bg || "",
        drawer_active_bg: branding.drawer_active_bg || "",
        logo: branding.logo || "",
        favicon: branding.favicon || "",
      });
    } else {
      form.reset(getDefaultValues());
    }
  };

  if (isLoading) {
    return (
      <div className={s.section}>
        <p>Carregando branding...</p>
      </div>
    );
  }

  if (!branding || !branding.id) {
    return (
      <div className={s.section}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h3 style={{ margin: 0 }}>Branding</h3>
          {!isEditing && (
            <button
              className={s.editButton}
              onClick={() => {
                form.reset(getDefaultValues());
                setIsEditing(true);
              }}
            >
              <FaPlus /> Criar Branding
            </button>
          )}
        </div>
        {isEditing ? (
          <FormProvider form={form} onSubmit={handleSubmit}>
            {/* O formulário completo será renderizado abaixo, reutilizando o mesmo código */}
            {/* Por enquanto, vou duplicar a estrutura principal */}
            <div className={s.formGridSection}>
              <Wrapper<UpdateBrandingType>
                name="name"
                label="Nome do Tema:"
                error={Boolean(form.formState.errors.name)}
                errorMessage={
                  form.formState.errors.name?.message as string | undefined
                }
              >
                <Controller
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <input
                      type="text"
                      className={s.formInput}
                      placeholder="Nome do tema"
                      {...field}
                    />
                  )}
                />
              </Wrapper>

              <Wrapper<UpdateBrandingType>
                name="theme"
                label="Tema:"
                error={Boolean(form.formState.errors.theme)}
                errorMessage={
                  form.formState.errors.theme?.message as string | undefined
                }
              >
                <Controller
                  name="theme"
                  control={form.control}
                  render={({ field }) => (
                    <select className={s.formInput} {...field}>
                      <option value="light">Claro</option>
                      <option value="dark">Escuro</option>
                      <option value="custom">Personalizado</option>
                    </select>
                  )}
                />
              </Wrapper>
            </div>

            <div className={s.formButtons}>
              <button
                type="button"
                className={classNames(s.formButton, s.secondary)}
                onClick={handleCancel}
                disabled={isPending}
              >
                <FaTimes /> Cancelar
              </button>
              <button
                type="submit"
                className={classNames(s.formButton, s.primary)}
                disabled={isPending}
              >
                <FaSave /> {isPending ? "Salvando..." : "Criar"}
              </button>
            </div>
          </FormProvider>
        ) : (
          <div className={s.emptyMessage}>
            <p>Nenhum branding configurado</p>
            <p style={{ fontSize: "14px", marginTop: "10px" }}>
              Clique em "Criar Branding" para começar a configurar
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={s.section}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h3 style={{ margin: 0 }}>Branding</h3>
        {!isEditing && (
          <button className={s.editButton} onClick={() => setIsEditing(true)}>
            <FaEdit /> Editar
          </button>
        )}
      </div>

      <FormProvider form={form} onSubmit={handleSubmit}>
        {/* Informações Básicas */}
        <div className={s.formGridSection}>
          <Wrapper<UpdateBrandingType>
            name="name"
            label="Nome do Tema:"
            error={Boolean(form.formState.errors.name)}
            errorMessage={
              form.formState.errors.name?.message as string | undefined
            }
          >
            <Controller
              name="name"
              control={form.control}
              render={({ field }) => (
                <input
                  type="text"
                  className={classNames(
                    s.formInput,
                    !isEditing && s.inputDisabled
                  )}
                  placeholder="Nome do tema"
                  {...field}
                  disabled={!isEditing}
                />
              )}
            />
          </Wrapper>

          <Wrapper<UpdateBrandingType>
            name="theme"
            label="Tema:"
            error={Boolean(form.formState.errors.theme)}
            errorMessage={
              form.formState.errors.theme?.message as string | undefined
            }
          >
            <Controller
              name="theme"
              control={form.control}
              render={({ field }) => (
                <select
                  className={classNames(
                    s.formInput,
                    !isEditing && s.inputDisabled
                  )}
                  {...field}
                  disabled={!isEditing}
                >
                  <option value="light">Claro</option>
                  <option value="dark">Escuro</option>
                  <option value="custom">Personalizado</option>
                </select>
              )}
            />
          </Wrapper>
        </div>

        {/* Assets */}
        <div className={s.formGridSection}>
          <Wrapper<UpdateBrandingType>
            name="logo"
            label="Logo (URL):"
            error={Boolean(form.formState.errors.logo)}
            errorMessage={
              form.formState.errors.logo?.message as string | undefined
            }
          >
            <Controller
              name="logo"
              control={form.control}
              render={({ field }) => (
                <input
                  type="text"
                  className={classNames(
                    s.formInput,
                    !isEditing && s.inputDisabled
                  )}
                  placeholder="URL do logo"
                  {...field}
                  disabled={!isEditing}
                />
              )}
            />
          </Wrapper>

          <Wrapper<UpdateBrandingType>
            name="favicon"
            label="Favicon (URL):"
            error={Boolean(form.formState.errors.favicon)}
            errorMessage={
              form.formState.errors.favicon?.message as string | undefined
            }
          >
            <Controller
              name="favicon"
              control={form.control}
              render={({ field }) => (
                <input
                  type="text"
                  className={classNames(
                    s.formInput,
                    !isEditing && s.inputDisabled
                  )}
                  placeholder="URL do favicon"
                  {...field}
                  disabled={!isEditing}
                />
              )}
            />
          </Wrapper>
        </div>

        {/* Paleta Base */}
        <h4
          style={{
            marginTop: "24px",
            marginBottom: "16px",
            fontSize: "16px",
            fontWeight: 600,
          }}
        >
          Paleta Base
        </h4>
        <div className={s.formGridSection}>
          <div className={s.colorPicker}>
            <label>Cor Primária:</label>
            <Controller
              name="primary_color"
              control={form.control}
              render={({ field }) => (
                <>
                  <input
                    type="color"
                    {...field}
                    disabled={!isEditing}
                    style={{
                      opacity: isEditing ? 1 : 0.5,
                      cursor: isEditing ? "pointer" : "not-allowed",
                    }}
                  />
                  {field.value && <span>{field.value}</span>}
                </>
              )}
            />
          </div>

          <div className={s.colorPicker}>
            <label>Cor Secundária:</label>
            <Controller
              name="secondary_color"
              control={form.control}
              render={({ field }) => (
                <>
                  <input
                    type="color"
                    {...field}
                    disabled={!isEditing}
                    style={{
                      opacity: isEditing ? 1 : 0.5,
                      cursor: isEditing ? "pointer" : "not-allowed",
                    }}
                  />
                  {field.value && <span>{field.value}</span>}
                </>
              )}
            />
          </div>

          <div className={s.colorPicker}>
            <label>Cor Terciária:</label>
            <Controller
              name="tertiary_color"
              control={form.control}
              render={({ field }) => (
                <>
                  <input
                    type="color"
                    {...field}
                    disabled={!isEditing}
                    style={{
                      opacity: isEditing ? 1 : 0.5,
                      cursor: isEditing ? "pointer" : "not-allowed",
                    }}
                  />
                  {field.value && <span>{field.value}</span>}
                </>
              )}
            />
          </div>

          <div className={s.colorPicker}>
            <label>Cor Quaternária:</label>
            <Controller
              name="quaternary_color"
              control={form.control}
              render={({ field }) => (
                <>
                  <input
                    type="color"
                    {...field}
                    disabled={!isEditing}
                    style={{
                      opacity: isEditing ? 1 : 0.5,
                      cursor: isEditing ? "pointer" : "not-allowed",
                    }}
                  />
                  {field.value && <span>{field.value}</span>}
                </>
              )}
            />
          </div>

          <div className={s.colorPicker}>
            <label>Cor de Fundo:</label>
            <Controller
              name="background_color"
              control={form.control}
              render={({ field }) => (
                <>
                  <input
                    type="color"
                    {...field}
                    disabled={!isEditing}
                    style={{
                      opacity: isEditing ? 1 : 0.5,
                      cursor: isEditing ? "pointer" : "not-allowed",
                    }}
                  />
                  {field.value && <span>{field.value}</span>}
                </>
              )}
            />
          </div>

          <div className={s.colorPicker}>
            <label>Cor de Superfície:</label>
            <Controller
              name="surface_color"
              control={form.control}
              render={({ field }) => (
                <>
                  <input
                    type="color"
                    {...field}
                    disabled={!isEditing}
                    style={{
                      opacity: isEditing ? 1 : 0.5,
                      cursor: isEditing ? "pointer" : "not-allowed",
                    }}
                  />
                  {field.value && <span>{field.value}</span>}
                </>
              )}
            />
          </div>

          <div className={s.colorPicker}>
            <label>Cor de Texto Primária:</label>
            <Controller
              name="text_primary_color"
              control={form.control}
              render={({ field }) => (
                <>
                  <input
                    type="color"
                    {...field}
                    disabled={!isEditing}
                    style={{
                      opacity: isEditing ? 1 : 0.5,
                      cursor: isEditing ? "pointer" : "not-allowed",
                    }}
                  />
                  {field.value && <span>{field.value}</span>}
                </>
              )}
            />
          </div>

          <div className={s.colorPicker}>
            <label>Cor de Texto Secundária:</label>
            <Controller
              name="text_secondary_color"
              control={form.control}
              render={({ field }) => (
                <>
                  <input
                    type="color"
                    {...field}
                    disabled={!isEditing}
                    style={{
                      opacity: isEditing ? 1 : 0.5,
                      cursor: isEditing ? "pointer" : "not-allowed",
                    }}
                  />
                  {field.value && <span>{field.value}</span>}
                </>
              )}
            />
          </div>

          <div className={s.colorPicker}>
            <label>Cor de Borda:</label>
            <Controller
              name="border_color"
              control={form.control}
              render={({ field }) => (
                <>
                  <input
                    type="color"
                    {...field}
                    disabled={!isEditing}
                    style={{
                      opacity: isEditing ? 1 : 0.5,
                      cursor: isEditing ? "pointer" : "not-allowed",
                    }}
                  />
                  {field.value && <span>{field.value}</span>}
                </>
              )}
            />
          </div>

          <div className={s.colorPicker}>
            <label>Cor de Erro:</label>
            <Controller
              name="error_color"
              control={form.control}
              render={({ field }) => (
                <>
                  <input
                    type="color"
                    {...field}
                    disabled={!isEditing}
                    style={{
                      opacity: isEditing ? 1 : 0.5,
                      cursor: isEditing ? "pointer" : "not-allowed",
                    }}
                  />
                  {field.value && <span>{field.value}</span>}
                </>
              )}
            />
          </div>

          <div className={s.colorPicker}>
            <label>Cor de Sucesso:</label>
            <Controller
              name="success_color"
              control={form.control}
              render={({ field }) => (
                <>
                  <input
                    type="color"
                    {...field}
                    disabled={!isEditing}
                    style={{
                      opacity: isEditing ? 1 : 0.5,
                      cursor: isEditing ? "pointer" : "not-allowed",
                    }}
                  />
                  {field.value && <span>{field.value}</span>}
                </>
              )}
            />
          </div>
        </div>

        {/* Botões */}
        <h4
          style={{
            marginTop: "24px",
            marginBottom: "16px",
            fontSize: "16px",
            fontWeight: 600,
          }}
        >
          Botões
        </h4>
        <div className={s.formGridSection}>
          <div className={s.colorPicker}>
            <label>Botão Primário (BG):</label>
            <Controller
              name="btn_primary_bg"
              control={form.control}
              render={({ field }) => (
                <>
                  <input
                    type="color"
                    {...field}
                    disabled={!isEditing}
                    style={{
                      opacity: isEditing ? 1 : 0.5,
                      cursor: isEditing ? "pointer" : "not-allowed",
                    }}
                  />
                  {field.value && <span>{field.value}</span>}
                </>
              )}
            />
          </div>

          <div className={s.colorPicker}>
            <label>Botão Primário (Texto):</label>
            <Controller
              name="btn_primary_text"
              control={form.control}
              render={({ field }) => (
                <>
                  <input
                    type="color"
                    {...field}
                    disabled={!isEditing}
                    style={{
                      opacity: isEditing ? 1 : 0.5,
                      cursor: isEditing ? "pointer" : "not-allowed",
                    }}
                  />
                  {field.value && <span>{field.value}</span>}
                </>
              )}
            />
          </div>

          <div className={s.colorPicker}>
            <label>Botão Secundário (BG):</label>
            <Controller
              name="btn_secondary_bg"
              control={form.control}
              render={({ field }) => (
                <>
                  <input
                    type="color"
                    {...field}
                    disabled={!isEditing}
                    style={{
                      opacity: isEditing ? 1 : 0.5,
                      cursor: isEditing ? "pointer" : "not-allowed",
                    }}
                  />
                  {field.value && <span>{field.value}</span>}
                </>
              )}
            />
          </div>

          <div className={s.colorPicker}>
            <label>Botão Secundário (Texto):</label>
            <Controller
              name="btn_secondary_text"
              control={form.control}
              render={({ field }) => (
                <>
                  <input
                    type="color"
                    {...field}
                    disabled={!isEditing}
                    style={{
                      opacity: isEditing ? 1 : 0.5,
                      cursor: isEditing ? "pointer" : "not-allowed",
                    }}
                  />
                  {field.value && <span>{field.value}</span>}
                </>
              )}
            />
          </div>

          <div className={s.colorPicker}>
            <label>Botão Terciário (BG):</label>
            <Controller
              name="btn_tertiary_bg"
              control={form.control}
              render={({ field }) => (
                <>
                  <input
                    type="color"
                    {...field}
                    disabled={!isEditing}
                    style={{
                      opacity: isEditing ? 1 : 0.5,
                      cursor: isEditing ? "pointer" : "not-allowed",
                    }}
                  />
                  {field.value && <span>{field.value}</span>}
                </>
              )}
            />
          </div>

          <div className={s.colorPicker}>
            <label>Botão Terciário (Texto):</label>
            <Controller
              name="btn_tertiary_text"
              control={form.control}
              render={({ field }) => (
                <>
                  <input
                    type="color"
                    {...field}
                    disabled={!isEditing}
                    style={{
                      opacity: isEditing ? 1 : 0.5,
                      cursor: isEditing ? "pointer" : "not-allowed",
                    }}
                  />
                  {field.value && <span>{field.value}</span>}
                </>
              )}
            />
          </div>

          <div className={s.colorPicker}>
            <label>Botão Quaternário (BG):</label>
            <Controller
              name="btn_quaternary_bg"
              control={form.control}
              render={({ field }) => (
                <>
                  <input
                    type="color"
                    {...field}
                    disabled={!isEditing}
                    style={{
                      opacity: isEditing ? 1 : 0.5,
                      cursor: isEditing ? "pointer" : "not-allowed",
                    }}
                  />
                  {field.value && <span>{field.value}</span>}
                </>
              )}
            />
          </div>

          <div className={s.colorPicker}>
            <label>Botão Quaternário (Texto):</label>
            <Controller
              name="btn_quaternary_text"
              control={form.control}
              render={({ field }) => (
                <>
                  <input
                    type="color"
                    {...field}
                    disabled={!isEditing}
                    style={{
                      opacity: isEditing ? 1 : 0.5,
                      cursor: isEditing ? "pointer" : "not-allowed",
                    }}
                  />
                  {field.value && <span>{field.value}</span>}
                </>
              )}
            />
          </div>
        </div>

        {/* Textos */}
        <h4
          style={{
            marginTop: "24px",
            marginBottom: "16px",
            fontSize: "16px",
            fontWeight: 600,
          }}
        >
          Textos
        </h4>
        <div className={s.formGridSection}>
          <div className={s.colorPicker}>
            <label>Cor de Título:</label>
            <Controller
              name="heading_color"
              control={form.control}
              render={({ field }) => (
                <>
                  <input
                    type="color"
                    {...field}
                    disabled={!isEditing}
                    style={{
                      opacity: isEditing ? 1 : 0.5,
                      cursor: isEditing ? "pointer" : "not-allowed",
                    }}
                  />
                  {field.value && <span>{field.value}</span>}
                </>
              )}
            />
          </div>

          <div className={s.colorPicker}>
            <label>Cor de Subtítulo:</label>
            <Controller
              name="subheading_color"
              control={form.control}
              render={({ field }) => (
                <>
                  <input
                    type="color"
                    {...field}
                    disabled={!isEditing}
                    style={{
                      opacity: isEditing ? 1 : 0.5,
                      cursor: isEditing ? "pointer" : "not-allowed",
                    }}
                  />
                  {field.value && <span>{field.value}</span>}
                </>
              )}
            />
          </div>

          <div className={s.colorPicker}>
            <label>Texto Padrão:</label>
            <Controller
              name="text_default"
              control={form.control}
              render={({ field }) => (
                <>
                  <input
                    type="color"
                    {...field}
                    disabled={!isEditing}
                    style={{
                      opacity: isEditing ? 1 : 0.5,
                      cursor: isEditing ? "pointer" : "not-allowed",
                    }}
                  />
                  {field.value && <span>{field.value}</span>}
                </>
              )}
            />
          </div>

          <div className={s.colorPicker}>
            <label>Texto Muted:</label>
            <Controller
              name="text_muted"
              control={form.control}
              render={({ field }) => (
                <>
                  <input
                    type="color"
                    {...field}
                    disabled={!isEditing}
                    style={{
                      opacity: isEditing ? 1 : 0.5,
                      cursor: isEditing ? "pointer" : "not-allowed",
                    }}
                  />
                  {field.value && <span>{field.value}</span>}
                </>
              )}
            />
          </div>

          <div className={s.colorPicker}>
            <label>Cor de Link:</label>
            <Controller
              name="link_color"
              control={form.control}
              render={({ field }) => (
                <>
                  <input
                    type="color"
                    {...field}
                    disabled={!isEditing}
                    style={{
                      opacity: isEditing ? 1 : 0.5,
                      cursor: isEditing ? "pointer" : "not-allowed",
                    }}
                  />
                  {field.value && <span>{field.value}</span>}
                </>
              )}
            />
          </div>

          <div className={s.colorPicker}>
            <label>Cor de Link (Hover):</label>
            <Controller
              name="link_hover_color"
              control={form.control}
              render={({ field }) => (
                <>
                  <input
                    type="color"
                    {...field}
                    disabled={!isEditing}
                    style={{
                      opacity: isEditing ? 1 : 0.5,
                      cursor: isEditing ? "pointer" : "not-allowed",
                    }}
                  />
                  {field.value && <span>{field.value}</span>}
                </>
              )}
            />
          </div>
        </div>

        {/* Inputs */}
        <h4
          style={{
            marginTop: "24px",
            marginBottom: "16px",
            fontSize: "16px",
            fontWeight: 600,
          }}
        >
          Inputs
        </h4>
        <div className={s.formGridSection}>
          <div className={s.colorPicker}>
            <label>Input (BG):</label>
            <Controller
              name="input_bg"
              control={form.control}
              render={({ field }) => (
                <>
                  <input
                    type="color"
                    {...field}
                    disabled={!isEditing}
                    style={{
                      opacity: isEditing ? 1 : 0.5,
                      cursor: isEditing ? "pointer" : "not-allowed",
                    }}
                  />
                  {field.value && <span>{field.value}</span>}
                </>
              )}
            />
          </div>

          <div className={s.colorPicker}>
            <label>Input (Texto):</label>
            <Controller
              name="input_text"
              control={form.control}
              render={({ field }) => (
                <>
                  <input
                    type="color"
                    {...field}
                    disabled={!isEditing}
                    style={{
                      opacity: isEditing ? 1 : 0.5,
                      cursor: isEditing ? "pointer" : "not-allowed",
                    }}
                  />
                  {field.value && <span>{field.value}</span>}
                </>
              )}
            />
          </div>

          <div className={s.colorPicker}>
            <label>Input (Borda):</label>
            <Controller
              name="input_border"
              control={form.control}
              render={({ field }) => (
                <>
                  <input
                    type="color"
                    {...field}
                    disabled={!isEditing}
                    style={{
                      opacity: isEditing ? 1 : 0.5,
                      cursor: isEditing ? "pointer" : "not-allowed",
                    }}
                  />
                  {field.value && <span>{field.value}</span>}
                </>
              )}
            />
          </div>

          <div className={s.colorPicker}>
            <label>Input (Placeholder):</label>
            <Controller
              name="input_placeholder"
              control={form.control}
              render={({ field }) => (
                <>
                  <input
                    type="color"
                    {...field}
                    disabled={!isEditing}
                    style={{
                      opacity: isEditing ? 1 : 0.5,
                      cursor: isEditing ? "pointer" : "not-allowed",
                    }}
                  />
                  {field.value && <span>{field.value}</span>}
                </>
              )}
            />
          </div>

          <div className={s.colorPicker}>
            <label>Input (Focus Borda):</label>
            <Controller
              name="input_focus_border"
              control={form.control}
              render={({ field }) => (
                <>
                  <input
                    type="color"
                    {...field}
                    disabled={!isEditing}
                    style={{
                      opacity: isEditing ? 1 : 0.5,
                      cursor: isEditing ? "pointer" : "not-allowed",
                    }}
                  />
                  {field.value && <span>{field.value}</span>}
                </>
              )}
            />
          </div>
        </div>

        {/* Containers */}
        <h4
          style={{
            marginTop: "24px",
            marginBottom: "16px",
            fontSize: "16px",
            fontWeight: 600,
          }}
        >
          Containers
        </h4>
        <div className={s.formGridSection}>
          <div className={s.colorPicker}>
            <label>App Background:</label>
            <Controller
              name="app_background"
              control={form.control}
              render={({ field }) => (
                <>
                  <input
                    type="color"
                    {...field}
                    disabled={!isEditing}
                    style={{
                      opacity: isEditing ? 1 : 0.5,
                      cursor: isEditing ? "pointer" : "not-allowed",
                    }}
                  />
                  {field.value && <span>{field.value}</span>}
                </>
              )}
            />
          </div>

          <div className={s.colorPicker}>
            <label>Card Background:</label>
            <Controller
              name="card_background"
              control={form.control}
              render={({ field }) => (
                <>
                  <input
                    type="color"
                    {...field}
                    disabled={!isEditing}
                    style={{
                      opacity: isEditing ? 1 : 0.5,
                      cursor: isEditing ? "pointer" : "not-allowed",
                    }}
                  />
                  {field.value && <span>{field.value}</span>}
                </>
              )}
            />
          </div>

          <div className={s.colorPicker}>
            <label>Card Borda:</label>
            <Controller
              name="card_border"
              control={form.control}
              render={({ field }) => (
                <>
                  <input
                    type="color"
                    {...field}
                    disabled={!isEditing}
                    style={{
                      opacity: isEditing ? 1 : 0.5,
                      cursor: isEditing ? "pointer" : "not-allowed",
                    }}
                  />
                  {field.value && <span>{field.value}</span>}
                </>
              )}
            />
          </div>

          <div className={s.colorPicker}>
            <label>Card Sombra:</label>
            <Controller
              name="card_shadow"
              control={form.control}
              render={({ field }) => (
                <>
                  <input
                    type="text"
                    className={classNames(
                      s.formInput,
                      !isEditing && s.inputDisabled
                    )}
                    placeholder="Ex: 0 2px 8px rgba(0,0,0,0.1)"
                    {...field}
                    disabled={!isEditing}
                  />
                </>
              )}
            />
          </div>
        </div>

        {/* Drawer/Sidebar */}
        <h4
          style={{
            marginTop: "24px",
            marginBottom: "16px",
            fontSize: "16px",
            fontWeight: 600,
          }}
        >
          Drawer/Sidebar
        </h4>
        <div className={s.formGridSection}>
          <div className={s.colorPicker}>
            <label>Drawer (BG):</label>
            <Controller
              name="drawer_bg"
              control={form.control}
              render={({ field }) => (
                <>
                  <input
                    type="color"
                    {...field}
                    disabled={!isEditing}
                    style={{
                      opacity: isEditing ? 1 : 0.5,
                      cursor: isEditing ? "pointer" : "not-allowed",
                    }}
                  />
                  {field.value && <span>{field.value}</span>}
                </>
              )}
            />
          </div>

          <div className={s.colorPicker}>
            <label>Drawer (Texto):</label>
            <Controller
              name="drawer_text"
              control={form.control}
              render={({ field }) => (
                <>
                  <input
                    type="color"
                    {...field}
                    disabled={!isEditing}
                    style={{
                      opacity: isEditing ? 1 : 0.5,
                      cursor: isEditing ? "pointer" : "not-allowed",
                    }}
                  />
                  {field.value && <span>{field.value}</span>}
                </>
              )}
            />
          </div>

          <div className={s.colorPicker}>
            <label>Drawer (Borda):</label>
            <Controller
              name="drawer_border"
              control={form.control}
              render={({ field }) => (
                <>
                  <input
                    type="color"
                    {...field}
                    disabled={!isEditing}
                    style={{
                      opacity: isEditing ? 1 : 0.5,
                      cursor: isEditing ? "pointer" : "not-allowed",
                    }}
                  />
                  {field.value && <span>{field.value}</span>}
                </>
              )}
            />
          </div>

          <div className={s.colorPicker}>
            <label>Drawer (Hover BG):</label>
            <Controller
              name="drawer_hover_bg"
              control={form.control}
              render={({ field }) => (
                <>
                  <input
                    type="color"
                    {...field}
                    disabled={!isEditing}
                    style={{
                      opacity: isEditing ? 1 : 0.5,
                      cursor: isEditing ? "pointer" : "not-allowed",
                    }}
                  />
                  {field.value && <span>{field.value}</span>}
                </>
              )}
            />
          </div>

          <div className={s.colorPicker}>
            <label>Drawer (Active BG):</label>
            <Controller
              name="drawer_active_bg"
              control={form.control}
              render={({ field }) => (
                <>
                  <input
                    type="color"
                    {...field}
                    disabled={!isEditing}
                    style={{
                      opacity: isEditing ? 1 : 0.5,
                      cursor: isEditing ? "pointer" : "not-allowed",
                    }}
                  />
                  {field.value && <span>{field.value}</span>}
                </>
              )}
            />
          </div>
        </div>

        {isEditing && (
          <div className={s.formButtons}>
            <button
              type="button"
              className={classNames(s.formButton, s.secondary)}
              onClick={handleCancel}
              disabled={isPending}
            >
              <FaTimes /> Cancelar
            </button>
            <button
              type="submit"
              className={classNames(s.formButton, s.primary)}
              disabled={isPending}
            >
              <FaSave /> {isPending ? "Salvando..." : "Salvar"}
            </button>
          </div>
        )}
      </FormProvider>
    </div>
  );
}
