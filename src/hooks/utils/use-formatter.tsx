function useFormatter() {
  const formatMoney = (valor: number): string => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor);
  };

  return {
    formatMoney,
  };
}

export default useFormatter;
