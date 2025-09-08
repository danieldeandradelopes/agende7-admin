import { useEffect, useState } from "react";

function clearAppData() {
  localStorage.clear();
  sessionStorage.clear();

  // limpar caches (service worker / assets)
  if ("caches" in window) {
    caches.keys().then((names) => {
      // eslint-disable-next-line prefer-const
      for (let name of names) caches.delete(name);
    });
  }

  // limpar cookies
  document.cookie.split(";").forEach((c) => {
    document.cookie = c
      .replace(/^ +/, "")
      .replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`);
  });
}

export function useAppUpdater(interval = 60_000) {
  const [updateAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    const checkVersion = async () => {
      try {
        const res = await fetch("/version.json", { cache: "no-store" });
        const data = await res.json();

        const current = localStorage.getItem("app_version");
        if (current && current !== data.version) {
          setUpdateAvailable(true);
        } else {
          localStorage.setItem("app_version", data.version);
        }
      } catch (err) {
        console.error("Erro verificando versão", err);
      }
    };

    checkVersion();
    const id = setInterval(checkVersion, interval);
    return () => clearInterval(id);
  }, [interval]);

  const applyUpdate = () => {
    clearAppData();
    window.location.reload();
  };

  return { updateAvailable, applyUpdate };
}
