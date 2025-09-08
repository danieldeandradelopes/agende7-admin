import { useAppUpdater } from "@/hooks/utils/use-app-updater";
import React from "react";
import s from "./styles.module.scss";

const AppWithUpdater: React.FC = () => {
  const { updateAvailable, applyUpdate } = useAppUpdater();

  return (
    <>
      {updateAvailable && (
        <div className={s.container}>
          <p>Nova atualização disponível 🚀</p>
          <button onClick={applyUpdate} className="btn btn--secondary__outline">
            Atualizar agora
          </button>
        </div>
      )}
    </>
  );
};

export default AppWithUpdater;
