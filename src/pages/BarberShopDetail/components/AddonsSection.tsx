import Wrapper from "@/components/Wrapper";
import Option from "@/components/design/Option";
import Select from "@/components/design/Select";
import { useGetSubscriptions } from "@/hooks/integration/subscriptions/queries";
import { useGetSubscriptionAddonsBySubscriptionId } from "@/hooks/integration/subscription-addons/queries";
import {
  useCreateSubscriptionAddon,
  useDeleteSubscriptionAddon,
} from "@/hooks/integration/subscription-addons/mutations";
import {
  useGetAddons,
  useGetAddonPrices,
} from "@/hooks/integration/addons/queries";
import useFormatter from "@/hooks/utils/use-formatter";
import { FormProvider } from "@/libs/form/FormProvider";
import { useZodForm } from "@/libs/form/useZodForm";
import { App } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import classNames from "classnames";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { FaSave, FaTimes, FaPlus, FaTrash } from "react-icons/fa";
import {
  createSubscriptionAddonSchema,
  CreateSubscriptionAddonType,
} from "../schema";
import s from "../styles.module.scss";
import { safeFormatDate } from "./utils";

export default function AddonsSection({
  barbershopId,
}: {
  barbershopId: number;
}) {
  const { modal } = App.useApp();
  const { formatMoney } = useFormatter();
  const { data: subscriptions } = useGetSubscriptions(barbershopId);
  const { data: addons } = useGetAddons();
  const { data: addonPrices } = useGetAddonPrices();
  const { mutateAsync: createSubscriptionAddon } = useCreateSubscriptionAddon();
  const { mutateAsync: deleteSubscriptionAddon } = useDeleteSubscriptionAddon();
  const [showAddForm, setShowAddForm] = useState(false);
  const form = useZodForm({ schema: createSubscriptionAddonSchema });

  const activeSubscription = subscriptions;
  const { data: subscriptionAddons = [] } =
    useGetSubscriptionAddonsBySubscriptionId(activeSubscription?.id || 0);

  const handleAddAddon = async (data: CreateSubscriptionAddonType) => {
    if (!activeSubscription?.id) return;
    await createSubscriptionAddon({
      ...data,
      subscription_id: activeSubscription.id,
    });
    setShowAddForm(false);
    form.reset();
  };

  const handleDeleteAddon = (id: number, subscriptionId: number) => {
    modal.confirm({
      title: "Confirmar exclusão",
      icon: (
        <ExclamationCircleOutlined style={{ color: "var(--color-error)" }} />
      ),
      content: (
        <div style={{ marginTop: 16 }}>
          <p style={{ marginBottom: 0, fontSize: 14, lineHeight: 1.5 }}>
            Tem certeza que deseja remover este addon? Esta ação não pode ser
            desfeita.
          </p>
        </div>
      ),
      okText: "Sim, remover",
      cancelText: "Cancelar",
      okButtonProps: {
        danger: true,
        style: {
          backgroundColor: "var(--color-error)",
          borderColor: "var(--color-error)",
        },
      },
      cancelButtonProps: {
        style: {
          backgroundColor: "transparent",
          borderColor: "var(--color-border)",
          color: "var(--color-text-primary)",
        },
      },
      width: 480,
      centered: true,
      onOk: () => {
        deleteSubscriptionAddon({ id, subscriptionId });
      },
    });
  };

  return (
    <div className={s.section}>
      <h3>Addons Ativos</h3>
      {subscriptionAddons.length === 0 ? (
        <div className={s.emptyMessage}>
          <p>Nenhum addon ativo</p>
        </div>
      ) : (
        <ul className={s.sectionList}>
          {subscriptionAddons.map((addon) => {
            const addonInfo = addons?.find((a) => a.id === addon.addon_id);
            const addonPrice = addonPrices?.find(
              (ap) => ap.id === addon.addon_price_id
            );
            return (
              <li key={addon.id}>
                <div className={s.sectionItem}>
                  <div>
                    <strong>{addonInfo?.name || "Addon desconhecido"}</strong>
                    {addonPrice && (
                      <div
                        style={{
                          marginTop: "4px",
                          fontSize: "13px",
                          color: "var(--color-text-secondary)",
                        }}
                      >
                        {formatMoney(addonPrice.price / 100)} •{" "}
                        {addonPrice.billing_cycle === "monthly"
                          ? "Mensal"
                          : addonPrice.billing_cycle === "semiannual"
                          ? "Semestral"
                          : "Anual"}
                      </div>
                    )}
                    <div
                      style={{
                        marginTop: "4px",
                        fontSize: "12px",
                        color: "var(--color-text-secondary)",
                      }}
                    >
                      {addon.start_date &&
                        `Início: ${safeFormatDate(addon.start_date)}`}
                      {addon.end_date &&
                        ` • Fim: ${safeFormatDate(addon.end_date)}`}
                    </div>
                  </div>
                  <span
                    className={classNames(
                      s.statusBadge,
                      s[addon.status || "active"]
                    )}
                  >
                    {addon.status || "active"}
                  </span>
                </div>
                <div className={s.sectionActions}>
                  <button
                    className={classNames(s.actionButton, s.delete)}
                    onClick={() =>
                      handleDeleteAddon(addon.id!, addon.subscription_id)
                    }
                    title="Remover addon"
                  >
                    <FaTrash />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      {!showAddForm && (
        <button className={s.addButton} onClick={() => setShowAddForm(true)}>
          <FaPlus /> Adicionar Addon
        </button>
      )}
      {showAddForm && activeSubscription && (
        <div className={s.formSection}>
          <FormProvider form={form} onSubmit={handleAddAddon}>
            <div className={s.formGridSection}>
              <Wrapper<CreateSubscriptionAddonType>
                name="addon_id"
                label="Addon:"
                error={Boolean(form.formState.errors.addon_id)}
                errorMessage={
                  form.formState.errors.addon_id?.message as string | undefined
                }
              >
                <Controller
                  name="addon_id"
                  control={form.control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      placeholder="Selecione o addon"
                      value={field.value ? String(field.value) : undefined}
                      onChange={(value) => {
                        field.onChange(value ? Number(value) : undefined);
                        form.setValue("addon_price_id", undefined);
                      }}
                    >
                      {addons?.map((addon) => (
                        <Option key={addon.id} value={String(addon.id)}>
                          {addon.name}
                        </Option>
                      ))}
                    </Select>
                  )}
                />
              </Wrapper>
              <Wrapper<CreateSubscriptionAddonType>
                name="addon_price_id"
                label="Preço:"
                error={Boolean(form.formState.errors.addon_price_id)}
                errorMessage={
                  form.formState.errors.addon_price_id?.message as
                    | string
                    | undefined
                }
              >
                <Controller
                  name="addon_price_id"
                  control={form.control}
                  render={({ field }) => {
                    const selectedAddonId = form.watch("addon_id");

                    const filteredPrices = selectedAddonId
                      ? addonPrices?.filter((ap) => {
                          const apAddonId =
                            typeof ap.addon_id === "string"
                              ? Number(ap.addon_id)
                              : ap.addon_id;
                          const selectedId = Number(selectedAddonId);
                          return apAddonId === selectedId;
                        }) || []
                      : [];

                    return (
                      <Select
                        {...field}
                        placeholder={
                          !selectedAddonId
                            ? "Selecione um addon primeiro"
                            : filteredPrices.length === 0
                            ? "Nenhum preço disponível"
                            : "Selecione o preço"
                        }
                        value={field.value ? String(field.value) : undefined}
                        onChange={(value) =>
                          field.onChange(value ? Number(value) : undefined)
                        }
                        disabled={
                          !selectedAddonId || filteredPrices.length === 0
                        }
                      >
                        {filteredPrices.map((ap) => (
                          <Option key={ap.id} value={String(ap.id)}>
                            {formatMoney(ap.price / 100)} -{" "}
                            {ap.billing_cycle === "monthly"
                              ? "Mensal"
                              : ap.billing_cycle === "semiannual"
                              ? "Semestral"
                              : "Anual"}
                          </Option>
                        ))}
                      </Select>
                    );
                  }}
                />
              </Wrapper>
              <Wrapper<CreateSubscriptionAddonType>
                name="start_date"
                label="Data de Início:"
                error={Boolean(form.formState.errors.start_date)}
                errorMessage={
                  form.formState.errors.start_date?.message as
                    | string
                    | undefined
                }
              >
                <Controller
                  name="start_date"
                  control={form.control}
                  render={({ field }) => (
                    <input type="date" className={s.formInput} {...field} />
                  )}
                />
              </Wrapper>
              <Wrapper<CreateSubscriptionAddonType>
                name="end_date"
                label="Data de Fim:"
                error={Boolean(form.formState.errors.end_date)}
                errorMessage={
                  form.formState.errors.end_date?.message as string | undefined
                }
              >
                <Controller
                  name="end_date"
                  control={form.control}
                  render={({ field }) => (
                    <input type="date" className={s.formInput} {...field} />
                  )}
                />
              </Wrapper>
            </div>
            <div className={s.formButtons}>
              <button
                type="button"
                className={classNames(s.formButton, s.secondary)}
                onClick={() => {
                  setShowAddForm(false);
                  form.reset();
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
          </FormProvider>
        </div>
      )}
    </div>
  );
}
