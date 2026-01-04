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
import { FormProvider } from "@/libs/form/FormProvider";
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
    <div>
      <h3>Addons Ativos</h3>
      {subscriptionAddons.length === 0 ? (
        <p>Nenhum addon ativo</p>
      ) : (
        <ul>
          {subscriptionAddons.map((addon) => {
            const addonInfo = addons?.find((a) => a.id === addon.addon_id);
            return (
              <li key={addon.id}>
                {addonInfo?.name} - Status: {addon.status}
                <button
                  onClick={() =>
                    deleteSubscriptionAddon({
                      id: addon.id!,
                      subscriptionId: addon.subscription_id,
                    })
                  }
                >
                  <FaTrash />
                </button>
              </li>
            );
          })}
        </ul>
      )}
      {!showAddForm && (
        <button
          className="btn btn--primary"
          onClick={() => setShowAddForm(true)}
        >
          <FaPlus /> Adicionar Addon
        </button>
      )}
      {showAddForm && activeSubscription && (
        <FormProvider form={form} onSubmit={handleAddAddon}>
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
          <Controller
            name="addon_price_id"
            control={form.control}
            render={({ field }) => (
              <Select {...field} placeholder="Selecione o preço">
                {addonPrices
                  ?.filter((ap) => ap.addon_id === form.watch("addon_id"))
                  .map((ap) => (
                    <Option key={ap.id} value={ap.id}>
                      {ap.price} - {ap.billing_cycle}
                    </Option>
                  ))}
              </Select>
            )}
          />
          <Controller
            name="start_date"
            control={form.control}
            render={({ field }) => <input type="date" {...field} />}
          />
          <Controller
            name="end_date"
            control={form.control}
            render={({ field }) => <input type="date" {...field} />}
          />
          <button type="submit">Salvar</button>
          <button type="button" onClick={() => setShowAddForm(false)}>
            Cancelar
          </button>
        </FormProvider>
      )}
    </div>
  );
}

function CurrentPlanSection({ barbershopId }: { barbershopId: number }) {
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
    return <p>Nenhuma subscription ativa</p>;
  }

  return (
    <div>
      <h3>Plano Atual</h3>
      <p>
        <strong>Plano:</strong> {plan?.name}
      </p>
      <p>
        <strong>Preço:</strong> R$ {planPrice?.price}
      </p>
      <p>
        <strong>Ciclo:</strong> {planPrice?.billing_cycle}
      </p>
      <p>
        <strong>Status:</strong> {activeSubscription.status}
      </p>
      <p>
        <strong>Início:</strong>{" "}
        {new Date(activeSubscription.start_date).toLocaleDateString()}
      </p>
      {activeSubscription.end_date && (
        <p>
          <strong>Fim:</strong>{" "}
          {new Date(activeSubscription.end_date).toLocaleDateString()}
        </p>
      )}
    </div>
  );
}

function SubscriptionsSection({ barbershopId }: { barbershopId: number }) {
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

  return (
    <div>
      <h3>Subscriptions</h3>
      {subscriptions && subscriptions.length === 0 ? (
        <p>Nenhuma subscription</p>
      ) : (
        subscriptions?.map((sub) => (
          <div key={sub.id}>
            <p>
              Subscription #{sub.id} - Status: {sub.status}
            </p>
            <button onClick={() => deleteSubscription(sub.id!)}>
              <FaTrash />
            </button>
          </div>
        ))
      )}
      {!showAddForm && (
        <button
          className="btn btn--primary"
          onClick={() => setShowAddForm(true)}
        >
          <FaPlus /> Adicionar Subscription
        </button>
      )}
      {showAddForm && (
        <FormProvider form={form} onSubmit={handleAddSubscription}>
          <Controller
            name="plan_price_id"
            control={form.control}
            render={({ field }) => (
              <Select {...field} placeholder="Selecione o plano/preço">
                {planPrices?.map((pp) => (
                  <Option key={pp.id} value={pp.id}>
                    {pp.price} - {pp.billing_cycle}
                  </Option>
                ))}
              </Select>
            )}
          />
          <Controller
            name="start_date"
            control={form.control}
            render={({ field }) => <input type="date" {...field} />}
          />
          <Controller
            name="end_date"
            control={form.control}
            render={({ field }) => <input type="date" {...field} />}
          />
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
          <button type="submit">Salvar</button>
          <button type="button" onClick={() => setShowAddForm(false)}>
            Cancelar
          </button>
        </FormProvider>
      )}
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function ServicesSection(_props: { barbershopId: number }) {
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
    <div>
      <h3>Serviços</h3>
      {services && services.length === 0 ? (
        <p>Nenhum serviço cadastrado</p>
      ) : (
        <ul>
          {services?.map((service) => (
            <li key={service.id}>
              {service.title} - R$ {service.price} ({service.duration}min)
              <button onClick={() => deleteService(service.id)}>
                <FaTrash />
              </button>
            </li>
          ))}
        </ul>
      )}
      {!showAddForm && (
        <button
          className="btn btn--primary"
          onClick={() => setShowAddForm(true)}
        >
          <FaPlus /> Adicionar Serviço
        </button>
      )}
      {showAddForm && (
        <div>
          <input
            type="text"
            placeholder="Título"
            value={newService.title}
            onChange={(e) =>
              setNewService({ ...newService, title: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Descrição"
            value={newService.description}
            onChange={(e) =>
              setNewService({ ...newService, description: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Preço"
            value={newService.price}
            onChange={(e) =>
              setNewService({
                ...newService,
                price: parseFloat(e.target.value),
              })
            }
          />
          <input
            type="number"
            placeholder="Duração (min)"
            value={newService.duration}
            onChange={(e) =>
              setNewService({
                ...newService,
                duration: parseInt(e.target.value),
              })
            }
          />
          <button onClick={handleAddService}>Salvar</button>
          <button onClick={() => setShowAddForm(false)}>Cancelar</button>
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

  return (
    <div>
      <h3>Horários de Funcionamento</h3>
      {workingHours && workingHours.length === 0 ? (
        <p>Nenhum horário cadastrado</p>
      ) : (
        <ul>
          {workingHours?.map((wh) => (
            <li key={wh.id}>
              {wh.week_day}: {wh.is_open ? wh.time_slots.join(", ") : "Fechado"}
              <button onClick={() => {}}>
                <FaEdit />
              </button>
              <button onClick={() => deleteWorkingHours(wh.id)}>
                <FaTrash />
              </button>
            </li>
          ))}
        </ul>
      )}
      <button
        className="btn btn--primary"
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
    <div>
      <h3>Branding</h3>
      {branding && branding.length > 0 ? (
        <p>Branding configurado: {branding[0].name}</p>
      ) : (
        <p>Nenhum branding configurado</p>
      )}
      <p>Edição de branding será implementada na próxima versão</p>
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

  if (!manifest) return <p>Carregando manifest...</p>;

  return (
    <div>
      <h3>Manifest</h3>
      {!isEditing && (
        <button className="btn btn--primary" onClick={() => setIsEditing(true)}>
          <FaEdit /> Editar
        </button>
      )}
      <FormProvider form={form} onSubmit={handleSubmit}>
        <Controller
          name="name"
          control={form.control}
          render={({ field }) => (
            <input
              type="text"
              placeholder="Nome"
              {...field}
              disabled={!isEditing}
            />
          )}
        />
        <Controller
          name="short_name"
          control={form.control}
          render={({ field }) => (
            <input
              type="text"
              placeholder="Nome curto"
              {...field}
              disabled={!isEditing}
            />
          )}
        />
        <Controller
          name="theme_color"
          control={form.control}
          render={({ field }) => (
            <input type="color" {...field} disabled={!isEditing} />
          )}
        />
        <Controller
          name="background_color"
          control={form.control}
          render={({ field }) => (
            <input type="color" {...field} disabled={!isEditing} />
          )}
        />
        {isEditing && (
          <div>
            <button type="submit">Salvar</button>
            <button type="button" onClick={() => setIsEditing(false)}>
              Cancelar
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
