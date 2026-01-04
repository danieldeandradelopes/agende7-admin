import BarberShop from "@/@backend-types/BarberShop";
import HeaderPage from "@/components/HeaderPage";
import Wrapper from "@/components/Wrapper";
import Option from "@/components/design/Option";
import Select from "@/components/design/Select";
import { useUpdateBarberShop } from "@/hooks/integration/barbershops/mutations";
import { useGetBarbershopById } from "@/hooks/integration/barbershops/queries";
import { useGetSubscriptions } from "@/hooks/integration/subscriptions/queries";
import {
  useCreateSubscription,
  useDeleteSubscription,
} from "@/hooks/integration/subscriptions/mutations";
import { useGetSubscriptionAddonsBySubscriptionId } from "@/hooks/integration/subscription-addons/queries";
import {
  useCreateSubscriptionAddon,
  useDeleteSubscriptionAddon,
} from "@/hooks/integration/subscription-addons/mutations";
import {
  useGetAddons,
  useGetAddonPrices,
} from "@/hooks/integration/addons/queries";
import {
  useGetPlans,
  useGetPlanPrices,
} from "@/hooks/integration/plans/queries";
import { useGetServices } from "@/hooks/integration/services/queries";
import {
  useCreateService,
  useDeleteService,
} from "@/hooks/integration/services/mutations";
import { useGetWorkingHours } from "@/hooks/integration/working-hours/queries";
import {
  useCreateWorkingHours,
  useDeleteWorkingHours,
} from "@/hooks/integration/working-hours/mutations";
import { useGetBranding } from "@/hooks/integration/branding/queries";
import { useGetManifest } from "@/hooks/integration/manifest/queries";
import { useUpdateManifest } from "@/hooks/integration/manifest/mutations";
import useFormatter from "@/hooks/utils/use-formatter";
import { formatDate } from "@/utils/date";
import { FormProvider } from "@/libs/form/FormProvider";

// Função auxiliar para formatar datas com segurança
const safeFormatDate = (date: string | undefined | null): string => {
  if (!date) return "N/A";
  try {
    return formatDate(date);
  } catch {
    try {
      return new Date(date).toLocaleDateString("pt-BR");
    } catch {
      return date;
    }
  }
};
import { useZodForm } from "@/libs/form/useZodForm";
import { Collapse } from "antd";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import { FaEdit, FaSave, FaTimes, FaPlus, FaTrash } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import {
  updateBarberShopSchema,
  UpdateBarberShopType,
  createSubscriptionSchema,
  CreateSubscriptionType,
  createSubscriptionAddonSchema,
  CreateSubscriptionAddonType,
  updateManifestSchema,
  UpdateManifestType,
} from "./schema";
import s from "./styles.module.scss";

// Componentes de seção
function AddonsSection({ barbershopId }: { barbershopId: number }) {
  const { formatMoney } = useFormatter();
  const { data: subscriptions } = useGetSubscriptions(barbershopId);
  const { data: addons } = useGetAddons();
  const { data: addonPrices } = useGetAddonPrices();
  const { mutateAsync: createSubscriptionAddon } = useCreateSubscriptionAddon();
  const { mutateAsync: deleteSubscriptionAddon } = useDeleteSubscriptionAddon();
  const [showAddForm, setShowAddForm] = useState(false);
  const form = useZodForm({ schema: createSubscriptionAddonSchema });

  const activeSubscription = subscriptions?.[0];
  const { data: subscriptionAddons = [] } =
    useGetSubscriptionAddonsBySubscriptionId(activeSubscription?.id || 0);

  const handleAddAddon = async (data: CreateSubscriptionAddonType) => {
    if (!activeSubscription) return;
    await createSubscriptionAddon({
      ...data,
      subscription_id: activeSubscription.id!,
    });
    setShowAddForm(false);
    form.reset();
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
                      deleteSubscriptionAddon({
                        id: addon.id!,
                        subscriptionId: addon.subscription_id,
                      })
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
                    <Select {...field} placeholder="Selecione o addon">
                      {addons?.map((addon) => (
                        <Option key={addon.id} value={addon.id}>
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
                  render={({ field }) => (
                    <Select {...field} placeholder="Selecione o preço">
                      {addonPrices
                        ?.filter((ap) => ap.addon_id === form.watch("addon_id"))
                        .map((ap) => (
                          <Option key={ap.id} value={ap.id}>
                            {formatMoney(ap.price / 100)} - {ap.billing_cycle}
                          </Option>
                        ))}
                    </Select>
                  )}
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

function CurrentPlanSection({ barbershopId }: { barbershopId: number }) {
  const { formatMoney } = useFormatter();
  const { data: subscriptions } = useGetSubscriptions(barbershopId);
  const { data: planPrices } = useGetPlanPrices();
  const { data: plans } = useGetPlans();

  const activeSubscription = subscriptions?.[0];
  const planPrice = activeSubscription
    ? planPrices?.find((pp) => pp.id === activeSubscription.plan_price_id)
    : null;
  const plan = planPrice
    ? plans?.find((p) => p.id === planPrice.plan_id)
    : null;

  if (!activeSubscription) {
    return (
      <div className={s.section}>
        <div className={s.emptyMessage}>
          <p>Nenhuma subscription ativa</p>
        </div>
      </div>
    );
  }

  const cycleLabels: Record<string, string> = {
    monthly: "Mensal",
    semiannual: "Semestral",
    yearly: "Anual",
  };

  return (
    <div className={s.section}>
      <h3>Plano Atual</h3>
      <div className={s.infoGrid}>
        <div className={s.infoItem}>
          <strong>Plano</strong>
          <span>{plan?.name || "N/A"}</span>
        </div>
        <div className={s.infoItem}>
          <strong>Preço</strong>
          <span>{planPrice ? formatMoney(planPrice.price / 100) : "N/A"}</span>
        </div>
        <div className={s.infoItem}>
          <strong>Ciclo</strong>
          <span>
            {planPrice?.billing_cycle
              ? cycleLabels[planPrice.billing_cycle] || planPrice.billing_cycle
              : "N/A"}
          </span>
        </div>
        <div className={s.infoItem}>
          <strong>Status</strong>
          <span>
            <span
              className={classNames(
                s.statusBadge,
                s[activeSubscription.status || "past_due"]
              )}
            >
              {activeSubscription.status || "past_due"}
            </span>
          </span>
        </div>
        <div className={s.infoItem}>
          <strong>Início</strong>
          <span>{safeFormatDate(activeSubscription.start_date)}</span>
        </div>
        {activeSubscription.end_date && (
          <div className={s.infoItem}>
            <strong>Fim</strong>
            <span>{safeFormatDate(activeSubscription.end_date)}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function SubscriptionsSection({ barbershopId }: { barbershopId: number }) {
  const { formatMoney } = useFormatter();
  const { data: subscriptions } = useGetSubscriptions(barbershopId);
  const { data: planPrices } = useGetPlanPrices();
  const { mutateAsync: createSubscription } = useCreateSubscription();
  const { mutateAsync: deleteSubscription } = useDeleteSubscription();
  const [showAddForm, setShowAddForm] = useState(false);
  const form = useZodForm({ schema: createSubscriptionSchema });

  const handleAddSubscription = async (data: CreateSubscriptionType) => {
    await createSubscription({ ...data, barbershop_id: barbershopId });
    setShowAddForm(false);
    form.reset();
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
                    onClick={() => deleteSubscription(sub.id!)}
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
                    <Select {...field} placeholder="Selecione o plano/preço">
                      {planPrices?.map((pp) => (
                        <Option key={pp.id} value={pp.id}>
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function ServicesSection(_props: { barbershopId: number }) {
  const { formatMoney } = useFormatter();
  const { data: services } = useGetServices();
  const { mutateAsync: createService } = useCreateService();
  const { mutateAsync: deleteService } = useDeleteService();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newService, setNewService] = useState({
    title: "",
    description: "",
    price: 0,
    duration: 0,
  });

  const handleAddService = async () => {
    await createService(newService);
    setShowAddForm(false);
    setNewService({ title: "", description: "", price: 0, duration: 0 });
  };

  return (
    <div className={s.section}>
      <h3>Serviços</h3>
      {services && services.length === 0 ? (
        <div className={s.emptyMessage}>
          <p>Nenhum serviço cadastrado</p>
        </div>
      ) : (
        <ul className={s.sectionList}>
          {services?.map((service) => (
            <li key={service.id}>
              <div className={s.sectionItem}>
                <div>
                  <strong>{service.title}</strong>
                  {service.description && (
                    <div className={s.serviceDescription}>
                      {service.description}
                    </div>
                  )}
                  <div className={s.servicePrice}>
                    {formatMoney(service.price / 100)} • {service.duration}min
                  </div>
                </div>
              </div>
              <div className={s.sectionActions}>
                <button
                  className={classNames(s.actionButton, s.delete)}
                  onClick={() => deleteService(service.id)}
                  title="Remover serviço"
                >
                  <FaTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {!showAddForm && (
        <button className={s.addButton} onClick={() => setShowAddForm(true)}>
          <FaPlus /> Adicionar Serviço
        </button>
      )}
      {showAddForm && (
        <div className={s.formSection}>
          <div className={s.formGridSection}>
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: 500,
                }}
              >
                Título:
              </label>
              <input
                type="text"
                className={s.formInput}
                placeholder="Título do serviço"
                value={newService.title}
                onChange={(e) =>
                  setNewService({ ...newService, title: e.target.value })
                }
              />
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: 500,
                }}
              >
                Descrição:
              </label>
              <input
                type="text"
                className={s.formInput}
                placeholder="Descrição do serviço"
                value={newService.description}
                onChange={(e) =>
                  setNewService({ ...newService, description: e.target.value })
                }
              />
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: 500,
                }}
              >
                Preço (em centavos):
              </label>
              <input
                type="number"
                className={s.formInput}
                placeholder="Ex: 2500 (R$ 25,00)"
                value={newService.price || ""}
                onChange={(e) =>
                  setNewService({
                    ...newService,
                    price: parseFloat(e.target.value) || 0,
                  })
                }
              />
              {newService.price > 0 && (
                <div
                  style={{
                    marginTop: "4px",
                    fontSize: "12px",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  {formatMoney(newService.price / 100)}
                </div>
              )}
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: 500,
                }}
              >
                Duração (minutos):
              </label>
              <input
                type="number"
                className={s.formInput}
                placeholder="Duração em minutos"
                value={newService.duration || ""}
                onChange={(e) =>
                  setNewService({
                    ...newService,
                    duration: parseInt(e.target.value) || 0,
                  })
                }
              />
            </div>
          </div>
          <div className={s.formButtons}>
            <button
              className={classNames(s.formButton, s.secondary)}
              onClick={() => {
                setShowAddForm(false);
                setNewService({
                  title: "",
                  description: "",
                  price: 0,
                  duration: 0,
                });
              }}
            >
              <FaTimes /> Cancelar
            </button>
            <button
              className={classNames(s.formButton, s.primary)}
              onClick={handleAddService}
              disabled={
                !newService.title || !newService.price || !newService.duration
              }
            >
              <FaSave /> Salvar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function WorkingHoursSection({ barbershopId }: { barbershopId: number }) {
  const { data: workingHours } = useGetWorkingHours(barbershopId);
  const { mutateAsync: createWorkingHours } = useCreateWorkingHours();
  const { mutateAsync: deleteWorkingHours } = useDeleteWorkingHours();

  const daysOfWeek = [
    "domingo",
    "segunda",
    "terça",
    "quarta",
    "quinta",
    "sexta",
    "sábado",
  ];

  const dayLabels: Record<string, string> = {
    domingo: "Domingo",
    segunda: "Segunda-feira",
    terça: "Terça-feira",
    quarta: "Quarta-feira",
    quinta: "Quinta-feira",
    sexta: "Sexta-feira",
    sábado: "Sábado",
  };

  const formatTimeSlot = (time: string) => {
    try {
      const [hours, minutes] = time.split(":");
      return `${hours}:${minutes}`;
    } catch {
      return time;
    }
  };

  return (
    <div className={s.section}>
      <h3>Horários de Funcionamento</h3>
      {workingHours && workingHours.length === 0 ? (
        <div className={s.emptyMessage}>
          <p>Nenhum horário cadastrado</p>
        </div>
      ) : (
        <ul className={s.sectionList}>
          {workingHours?.map((wh) => (
            <li key={wh.id}>
              <div className={s.sectionItem}>
                <div>
                  <strong>{dayLabels[wh.week_day] || wh.week_day}</strong>
                  <div style={{ marginTop: "8px" }}>
                    {wh.is_open ? (
                      wh.time_slots.length > 0 ? (
                        <div className={s.timeSlots}>
                          {wh.time_slots.map((slot, idx) => (
                            <span key={idx} className={s.timeSlot}>
                              {formatTimeSlot(slot)}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span
                          style={{
                            color: "var(--color-success, #28a745)",
                            fontSize: "14px",
                          }}
                        >
                          Aberto (sem horários específicos)
                        </span>
                      )
                    ) : (
                      <span className={s.closedBadge}>Fechado</span>
                    )}
                  </div>
                </div>
              </div>
              <div className={s.sectionActions}>
                <button
                  className={classNames(s.actionButton, s.edit)}
                  onClick={() => {}}
                  title="Editar horários"
                >
                  <FaEdit />
                </button>
                <button
                  className={classNames(s.actionButton, s.delete)}
                  onClick={() => deleteWorkingHours(wh.id)}
                  title="Remover horário"
                >
                  <FaTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <button
        className={s.addButton}
        onClick={() => {
          const days = daysOfWeek.map((day) => ({
            week_day: day,
            time_slots: [],
            is_open: false,
          }));
          createWorkingHours({ days });
        }}
      >
        <FaPlus /> Adicionar Horários
      </button>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function BrandingSection(_props: { barbershopId: number }) {
  const { data: branding } = useGetBranding();

  return (
    <div className={s.section}>
      <h3>Branding</h3>
      {branding && branding.length > 0 ? (
        <div className={s.infoGrid}>
          <div className={s.infoItem}>
            <strong>Nome do Tema</strong>
            <span>{branding[0].name}</span>
          </div>
        </div>
      ) : (
        <div className={s.emptyMessage}>
          <p>Nenhum branding configurado</p>
        </div>
      )}
      <p
        style={{
          marginTop: "20px",
          fontSize: "14px",
          color: "var(--color-text-secondary)",
          fontStyle: "italic",
        }}
      >
        Edição de branding será implementada na próxima versão
      </p>
    </div>
  );
}

function ManifestSection({ barbershopId }: { barbershopId: number }) {
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
          <button className={s.addButton} onClick={() => setIsEditing(true)}>
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
    label: "Addons que possui",
    children: <AddonsSection barbershopId={barbershop.id} />,
  },
  {
    key: "3",
    label: "Plano atual",
    children: <CurrentPlanSection barbershopId={barbershop.id} />,
  },
  {
    key: "4",
    label: "Subscriptions e Subscription Addons",
    children: <SubscriptionsSection barbershopId={barbershop.id} />,
  },
  {
    key: "5",
    label: "Serviços",
    children: <ServicesSection barbershopId={barbershop.id} />,
  },
  {
    key: "6",
    label: "Horários de funcionamento",
    children: <WorkingHoursSection barbershopId={barbershop.id} />,
  },
  {
    key: "7",
    label: "Branding",
    children: <BrandingSection barbershopId={barbershop.id} />,
  },
  {
    key: "8",
    label: "Manifest",
    children: <ManifestSection barbershopId={barbershop.id} />,
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
