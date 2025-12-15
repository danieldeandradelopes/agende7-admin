import constate from "constate";
import { useEffect, useState } from "react";

class LoadingManager {
  private count = 0;
  private listeners: Set<(isLoading: boolean) => void> = new Set();

  start() {
    this.count++;
    this.notifyListeners();
  }

  stop() {
    this.count = Math.max(0, this.count - 1);
    this.notifyListeners();
  }

  subscribe(listener: (isLoading: boolean) => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notifyListeners() {
    const isLoading = this.count > 0;
    this.listeners.forEach((listener) => listener(isLoading));
  }
}

export const loadingManager = new LoadingManager();

function useLoading() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = loadingManager.subscribe(setIsLoading);
    return unsubscribe;
  }, []);

  return {
    isLoading,
  };
}

export const [LoadingProvider, useLoadingContext] = constate(useLoading);
