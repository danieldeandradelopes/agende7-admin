function useFormatter() {
  const formatMoney = (valor: number): string => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor);
  };

  const formatPhoneNumber = (phone: string): string => {
    return phone.replace(/\D/g, "");
  };

  const formatCpf = (cpf: string): string => {
    const digits = cpf.replace(/\D/g, "");

    return digits.replace(
      /(\d{3})(\d{3})(\d{3})(\d{0,2})/,
      (_, p1, p2, p3, p4) => {
        return `${p1}.${p2}.${p3}${p4 ? "-" + p4 : ""}`;
      }
    );
  };

  const formatCnpj = (cnpj: string): string => {
    const digits = cnpj.replace(/\D/g, "");

    return digits.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{0,2})/,
      (_, p1, p2, p3, p4, p5) => `${p1}.${p2}.${p3}/${p4}${p5 ? "-" + p5 : ""}`
    );
  };

  return {
    formatMoney,
    formatPhoneNumber,
    formatCpf,
    formatCnpj,
  };
}

export default useFormatter;
