"use client"

import React, { createContext, useContext, useEffect, useState } from 'react';
import { EVCar, getCarById } from '@/lib/ev-cars';

interface CarContextType {
  selectedCarId: string | null;
  selectedCar: EVCar | undefined;
  setSelectedCarId: (id: string | null) => void;
}

const CarContext = createContext<CarContextType | undefined>(undefined);

const STORAGE_KEY = 'selectedCarId';

export function CarProvider({ children }: { children: React.ReactNode }) {
  const [selectedCarId, setSelectedCarIdState] = useState<string | null>(null);

  // Restore the user's saved car on load (zero-cost, client-side only).
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && getCarById(saved)) {
      setSelectedCarIdState(saved);
    }
  }, []);

  const setSelectedCarId = (id: string | null) => {
    setSelectedCarIdState(id);
    if (id) localStorage.setItem(STORAGE_KEY, id);
    else localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <CarContext.Provider
      value={{
        selectedCarId,
        selectedCar: getCarById(selectedCarId),
        setSelectedCarId,
      }}
    >
      {children}
    </CarContext.Provider>
  );
}

export function useCar() {
  const context = useContext(CarContext);
  if (!context) throw new Error('useCar must be used within a CarProvider');
  return context;
}
