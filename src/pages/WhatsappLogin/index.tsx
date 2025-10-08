import HeaderPage from "@/components/HeaderPage";
import { useLoginWhatsapp } from "@/hooks/integration/whatsapp/mutations";
import s from "./whatsapp-login.module.scss";

function WhatsappLogin() {
  const { mutateAsync: loginWhatsappMutateAsync, isPending } =
    useLoginWhatsapp();

  return (
    <div className={s.container}>
      <HeaderPage title="Whatsapp Login" />

      <div className={s.content}>
        <button
          className="btn btn--primary"
          onClick={() => loginWhatsappMutateAsync()}
          disabled={isPending}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default WhatsappLogin;
