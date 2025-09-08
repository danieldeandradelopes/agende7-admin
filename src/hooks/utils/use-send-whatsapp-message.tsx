import { useCallback } from "react";

function useSendWhatsappMessage() {
  const handleSendWhatsappMessage = useCallback(
    (phone: string, message: string) => {
      const encodedMessage = encodeURIComponent(message);

      const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;

      window.open(whatsappUrl, "_blank");
    },
    []
  );

  const handleFollowMyScheduleInWhatsapp = (
    date: Date,
    time: string,
    user: string,
    services: string | undefined,
    phone: string
  ) => {
    const formatDate = (date: Date) =>
      `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}/${date.getFullYear()}`;

    const formattedDate = formatDate(new Date(date));
    const userName = user.trim();

    const getSubdomain = () => {
      const hostname = window.location.hostname;
      const parts = hostname.split(".");

      if (hostname === "localhost" || hostname.includes("127.0.0.1")) {
        return import.meta.env.VITE_DEFAULT_DOMAIN;
      }

      return parts[0];
    };

    const subdomain = getSubdomain();
    const appLink = `https://${subdomain}.agende7.com/schedules`;

    const message = `*Cliente:* ${userName}\n*Data:* ${formattedDate}\n*Hora:* ${time}\n*Serviço:* ${services}\n\n*Ver agendamento:* ${appLink}`;

    handleSendWhatsappMessage(phone, message);
  };

  const handleNotifyCancelMyScheduleInWhatsappCustomer = (
    date: Date,
    time: string,
    user: string,
    services: string | undefined,
    phone: string,
    reason: string
  ) => {
    const formatDate = (date: Date) =>
      `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}/${date.getFullYear()}`;

    const formattedDate = formatDate(new Date(date));
    const userName = user.trim();

    const message = `*Agendamento cancelado*\n\n\n*Motivo do cancelamento:* ${reason}\n*Cliente:* ${userName}\n*Data:* ${formattedDate}\n*Hora:* ${time}\n*Serviço:* ${services}\n\n`;

    handleSendWhatsappMessage(phone, message);
  };

  const handleNotifyCancelMyScheduleInWhatsappBarber = (
    date: Date,
    time: string,
    services: string | undefined,
    phone: string,
    reason: string
  ) => {
    const formatDate = (date: Date) =>
      `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}/${date.getFullYear()}`;

    const formattedDate = formatDate(new Date(date));

    const message = `*Seu agendamento foi cancelado*\n\n\n*Motivo do cancelamento:* ${reason}\n\n*Data:* ${formattedDate}\n*Hora:* ${time}\n*Serviço:* ${services}\n\n`;

    handleSendWhatsappMessage(phone, message);
  };

  return {
    handleSendWhatsappMessage,
    handleFollowMyScheduleInWhatsapp,
    handleNotifyCancelMyScheduleInWhatsappCustomer,
    handleNotifyCancelMyScheduleInWhatsappBarber,
  };
}

export default useSendWhatsappMessage;
