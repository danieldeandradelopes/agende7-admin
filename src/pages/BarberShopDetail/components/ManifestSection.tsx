import Wrapper from "@/components/Wrapper";
import { useGetManifest } from "@/hooks/integration/manifest/queries";
import { useUpdateManifest } from "@/hooks/integration/manifest/mutations";
import { FormProvider } from "@/libs/form/FormProvider";
import { useZodForm } from "@/libs/form/useZodForm";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";
import { updateManifestSchema, UpdateManifestType } from "../schema";
import s from "../styles.module.scss";

export default function ManifestSection({
  barbershopId,
}: {
  barbershopId: number;
}) {
  const { data: manifest } = useGetManifest(barbershopId);
  const { mutateAsync: updateManifest } = useUpdateManifest();
  const [isEditing, setIsEditing] = useState(false);
  const form = useZodForm({ schema: updateManifestSchema });

  useEffect(() => {
    if (manifest) {
      form.reset({
        name: manifest.name,
        short_name: manifest.short_name,
        theme_color: manifest.theme_color,
        background_color: manifest.background_color,
      });
    }
  }, [manifest, form]);

  const handleSubmit = async (data: UpdateManifestType) => {
    await updateManifest({ barbershopId, data });
    setIsEditing(false);
  };

  if (!manifest)
    return (
      <div className={s.section}>
        <p>Carregando manifest...</p>
      </div>
    );

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
        <h3 style={{ margin: 0 }}>Manifest</h3>
        {!isEditing && (
          <button className={s.editButton} onClick={() => setIsEditing(true)}>
            <FaEdit /> Editar
          </button>
        )}
      </div>
      <FormProvider form={form} onSubmit={handleSubmit}>
        <div className={s.formGridSection}>
          <Wrapper<UpdateManifestType>
            name="name"
            label="Nome:"
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
                  placeholder="Nome"
                  {...field}
                  disabled={!isEditing}
                />
              )}
            />
          </Wrapper>
          <Wrapper<UpdateManifestType>
            name="short_name"
            label="Nome Curto:"
            error={Boolean(form.formState.errors.short_name)}
            errorMessage={
              form.formState.errors.short_name?.message as string | undefined
            }
          >
            <Controller
              name="short_name"
              control={form.control}
              render={({ field }) => (
                <input
                  type="text"
                  className={classNames(
                    s.formInput,
                    !isEditing && s.inputDisabled
                  )}
                  placeholder="Nome curto"
                  {...field}
                  disabled={!isEditing}
                />
              )}
            />
          </Wrapper>
        </div>
        <div className={s.formGridSection}>
          <div className={s.colorPicker}>
            <label>Cor do Tema:</label>
            <Controller
              name="theme_color"
              control={form.control}
              render={({ field }) => (
                <input
                  type="color"
                  {...field}
                  disabled={!isEditing}
                  style={{
                    opacity: isEditing ? 1 : 0.5,
                    cursor: isEditing ? "pointer" : "not-allowed",
                  }}
                />
              )}
            />
            {manifest.theme_color && (
              <span
                style={{
                  fontSize: "14px",
                  color: "var(--color-text-secondary)",
                }}
              >
                {manifest.theme_color}
              </span>
            )}
          </div>
          <div className={s.colorPicker}>
            <label>Cor de Fundo:</label>
            <Controller
              name="background_color"
              control={form.control}
              render={({ field }) => (
                <input
                  type="color"
                  {...field}
                  disabled={!isEditing}
                  style={{
                    opacity: isEditing ? 1 : 0.5,
                    cursor: isEditing ? "pointer" : "not-allowed",
                  }}
                />
              )}
            />
            {manifest.background_color && (
              <span
                style={{
                  fontSize: "14px",
                  color: "var(--color-text-secondary)",
                }}
              >
                {manifest.background_color}
              </span>
            )}
          </div>
        </div>
        {isEditing && (
          <div className={s.formButtons}>
            <button
              type="button"
              className={classNames(s.formButton, s.secondary)}
              onClick={() => {
                setIsEditing(false);
                if (manifest) {
                  form.reset({
                    name: manifest.name,
                    short_name: manifest.short_name,
                    theme_color: manifest.theme_color,
                    background_color: manifest.background_color,
                  });
                }
              }}
            >
              <FaTimes /> Cancelar
            </button>
            <button
              type="submit"
              className={classNames(s.formButton, s.primary)}
            >
              <FaSave /> Salvar
            </button>
          </div>
        )}
      </FormProvider>
    </div>
  );
}
