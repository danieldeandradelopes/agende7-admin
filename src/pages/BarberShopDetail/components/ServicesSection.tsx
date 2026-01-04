import { useGetServices } from "@/hooks/integration/services/queries";
import {
  useCreateService,
  useDeleteService,
} from "@/hooks/integration/services/mutations";
import useFormatter from "@/hooks/utils/use-formatter";
import { App } from "antd";
import classNames from "classnames";
import { useState } from "react";
import { FaSave, FaTimes, FaPlus, FaTrash } from "react-icons/fa";
import s from "../styles.module.scss";

export default function ServicesSection({
  barbershopId,
}: {
  barbershopId: number;
}) {
  const { modal } = App.useApp();
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

  const handleDeleteService = (id: number) => {
    modal.confirm({
      title: "Confirmar exclusão",
      content: "Tem certeza que deseja remover este serviço?",
      okText: "Sim, remover",
      cancelText: "Cancelar",
      okButtonProps: { danger: true },
      onOk: () => {
        deleteService(id);
      },
    });
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
                  onClick={() => handleDeleteService(service.id)}
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
