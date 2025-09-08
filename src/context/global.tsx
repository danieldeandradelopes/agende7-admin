import constate from "constate";

function useGlobal() {
  return {
    teste: "",
  };
}

export const [GlobalProvider, useGlobalContext] = constate(useGlobal);
