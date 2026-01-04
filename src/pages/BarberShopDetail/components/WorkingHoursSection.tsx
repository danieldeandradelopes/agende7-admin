import { useGetWorkingHours } from "@/hooks/integration/working-hours/queries";
import {
  useCreateWorkingHours,
  useDeleteWorkingHours,
} from "@/hooks/integration/working-hours/mutations";
import classNames from "classnames";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import s from "../styles.module.scss";

export default function WorkingHoursSection({
  barbershopId,
}: {
  barbershopId: number;
}) {
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
