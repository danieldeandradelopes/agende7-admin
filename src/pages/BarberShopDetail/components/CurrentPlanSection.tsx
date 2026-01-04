import { useGetSubscriptions } from "@/hooks/integration/subscriptions/queries";
import {
  useGetPlans,
  useGetPlanPrices,
} from "@/hooks/integration/plans/queries";
import useFormatter from "@/hooks/utils/use-formatter";
import classNames from "classnames";
import s from "../styles.module.scss";
import { safeFormatDate } from "./utils";

export default function CurrentPlanSection({
  barbershopId,
}: {
  barbershopId: number;
}) {
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
