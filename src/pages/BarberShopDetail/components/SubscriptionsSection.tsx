import Wrapper from "@/components/Wrapper";
import Option from "@/components/design/Option";
import Select from "@/components/design/Select";
import { useGetSubscriptions } from "@/hooks/integration/subscriptions/queries";
import {
  useCreateSubscription,
  useDeleteSubscription,
} from "@/hooks/integration/subscriptions/mutations";
import { useGetPlanPrices } from "@/hooks/integration/plans/queries";
import useFormatter from "@/hooks/utils/use-formatter";
import { FormProvider } from "@/libs/form/FormProvider";
import { useZodForm } from "@/libs/form/useZodForm";
import { App } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import classNames from "classnames";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { FaSave, FaTimes, FaPlus, FaTrash } from "react-icons/fa";
import { createSubscriptionSchema, CreateSubscriptionType } from "../schema";
import s from "../styles.module.scss";
import { safeFormatDate } from "./utils";

export default function SubscriptionsSection({
  barbershopId,
}: {
  barbershopId: number;
}) {
  const { modal } = App.useApp();
  const { formatMoney } = useFormatter();
  const { data: subscriptions } = useGetSubscriptions(barbershopId);
  const { data: planPrices } = useGetPlanPrices();
  const { mutateAsync: createSubscription } = useCreateSubscription();
  const { mutateAsync: deleteSubscription } = useDeleteSubscription();
  const [showAddForm, setShowAddForm] = useState(false);
  const form = useZodForm({ schema: createSubscriptionSchema });

  const handleAddSubscription = async (data: CreateSubscriptionType) => {
    try {
      await createSubscription({ ...data, barbershop_id: barbershopId });
      setShowAddForm(false);
      form.reset();
    } catch (error) {
      console.error("Erro ao criar subscription:", error);
    }
  };

  const handleDeleteSubscription = (id: number) => {
    modal.confirm({
      title: "Confirmar exclusão",
      icon: (
        <ExclamationCircleOutlined style={{ color: "var(--color-error)" }} />
      ),
      content: (
        <div style={{ marginTop: 16 }}>
          <p style={{ marginBottom: 0, fontSize: 14, lineHeight: 1.5 }}>
            Tem certeza que deseja remover esta assinatura? Esta ação não pode
            ser desfeita.
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
        deleteSubscription(id);
      },
    });
  };

  const cycleLabels: Record<string, string> = {
    monthly: "Mensal",
    semiannual: "Semestral",
    yearly: "Anual",
  };

  return (
    <div className={s.section}>
      <h3>Subscriptions</h3>
      {subscriptions && subscriptions.length === 0 ? (
        <div className={s.emptyMessage}>
          <p>Nenhuma subscription</p>
        </div>
      ) : (
        <ul className={s.sectionList}>
          {subscriptions?.map((sub) => {
            const planPrice = planPrices?.find(
              (pp) => pp.id === sub.plan_price_id
            );
            return (
              <li key={sub.id}>
                <div className={s.sectionItem}>
                  <div>
                    <strong>Subscription #{sub.id}</strong>
                    {planPrice && (
                      <div
                        style={{
                          marginTop: "4px",
                          fontSize: "12px",
                          color: "var(--color-text-secondary)",
                        }}
                      >
                        {formatMoney(planPrice.price / 100)} -{" "}
                        {cycleLabels[planPrice.billing_cycle] ||
                          planPrice.billing_cycle}
                        {sub.start_date &&
                          ` • Início: ${safeFormatDate(sub.start_date)}`}
                        {sub.end_date &&
                          ` • Fim: ${safeFormatDate(sub.end_date)}`}
                      </div>
                    )}
                  </div>
                  <span
                    className={classNames(
                      s.statusBadge,
                      s[sub.status || "past_due"]
                    )}
                  >
                    {sub.status || "past_due"}
                  </span>
                </div>
                <div className={s.sectionActions}>
                  <button
                    className={classNames(s.actionButton, s.delete)}
                    onClick={() => handleDeleteSubscription(sub.id!)}
                    title="Remover subscription"
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
          <FaPlus /> Adicionar Subscription
        </button>
      )}
      {showAddForm && (
        <div className={s.formSection}>
          <FormProvider form={form} onSubmit={handleAddSubscription}>
            <div className={s.formGridSection}>
              <Wrapper<CreateSubscriptionType>
                name="plan_price_id"
                label="Plano/Preço:"
                error={Boolean(form.formState.errors.plan_price_id)}
                errorMessage={
                  form.formState.errors.plan_price_id?.message as
                    | string
                    | undefined
                }
              >
                <Controller
                  name="plan_price_id"
                  control={form.control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      placeholder="Selecione o plano/preço"
                      value={field.value ? String(field.value) : undefined}
                      onChange={(value) =>
                        field.onChange(value ? Number(value) : undefined)
                      }
                    >
                      {planPrices?.map((pp) => (
                        <Option key={pp.id} value={String(pp.id)}>
                          {formatMoney(pp.price / 100)} -{" "}
                          {cycleLabels[pp.billing_cycle] || pp.billing_cycle}
                        </Option>
                      ))}
                    </Select>
                  )}
                />
              </Wrapper>
              <Wrapper<CreateSubscriptionType>
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
              <Wrapper<CreateSubscriptionType>
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
              <Wrapper<CreateSubscriptionType>
                name="status"
                label="Status:"
                error={Boolean(form.formState.errors.status)}
                errorMessage={
                  form.formState.errors.status?.message as string | undefined
                }
              >
                <Controller
                  name="status"
                  control={form.control}
                  render={({ field }) => (
                    <Select {...field} placeholder="Status">
                      <Option value="active">Active</Option>
                      <Option value="past_due">Past Due</Option>
                      <Option value="canceled">Canceled</Option>
                    </Select>
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
                disabled={form.formState.isSubmitting}
              >
                <FaSave />{" "}
                {form.formState.isSubmitting ? "Salvando..." : "Salvar"}
              </button>
            </div>
          </FormProvider>
        </div>
      )}
    </div>
  );
}
