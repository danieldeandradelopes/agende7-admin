import Wrapper from "@/components/Wrapper";
import { useGetPlans } from "@/hooks/integration/plans/queries";
import { Payment, initMercadoPago } from "@mercadopago/sdk-react";
import type { IPaymentBrickCustomization } from "@mercadopago/sdk-react/esm/bricks/payment/type";
import { Select } from "antd";
import { useState } from "react";
import s from "./payment.module.scss";
import { useCreatePreference } from "@/hooks/integration/payment/mutations";

const { Option } = Select;

function PaymentTest() {
  const { data: plans } = useGetPlans();
  const [planId, setPlanId] = useState<number | null>(null);
  const { mutateAsync: createPreference } = useCreatePreference();

  initMercadoPago(import.meta.env.VITE_MERCADO_PAGO_PUBLIC_KEY || "", {
    locale: "pt-BR",
  });

  const [initialization, setInitialization] = useState({
    amount: 0,
    preferenceId: "",
  });

  const handleCreatePreference = async () => {
    if (!planId) return;

    const data = await createPreference({ planId });

    if (!data) return;

    setInitialization({
      amount: data.payment.amount,
      preferenceId: data.preferenceId,
    });
  };

  const customization: IPaymentBrickCustomization = {
    paymentMethods: {
      ticket: "all",
      bankTransfer: "all",
      creditCard: "all",
      prepaidCard: "all",
      debitCard: "all",
      mercadoPago: "all",
    },
  };

  const onSubmit = async () => {
    return Promise.resolve();
  };

  return (
    <div className={s.container}>
      <div className={s.content}>
        <Wrapper<{ plan_price_id: number }>
          errorMessage={""}
          error={false}
          name="plan_price_id"
          label="Plano:"
          className={s.select}
        >
          <Select
            placeholder="Selecione o plano"
            onChange={(event) => setPlanId(Number(event))}
            value={planId?.toString() || ""}
          >
            {plans?.map((plan) => (
              <Option key={plan.id} value={plan.id?.toString() || ""}>
                {plan.name}
              </Option>
            ))}
          </Select>
          <button className="btn btn--primary" onClick={handleCreatePreference}>
            Escolher plano
          </button>
        </Wrapper>

        {initialization.preferenceId ? (
          <Payment
            initialization={initialization}
            customization={customization}
            onSubmit={onSubmit}
            onReady={() => console.log("Brick pronto")}
            onError={(err) => console.error(err)}
          />
        ) : (
          <p>Carregando checkout...</p>
        )}
      </div>
    </div>
  );
}

export default PaymentTest;
