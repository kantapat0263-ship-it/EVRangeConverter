// Curated list of popular EVs in the Thailand market.
//
// Values are APPROXIMATE manufacturer figures used only to pre-fill the
// calculator — the user can edit every field afterwards. `range` is quoted in
// the `standard` listed for that model (Chinese brands usually quote NEDC/CLTC,
// Tesla/MG usually WLTP). Shipped as a static module = zero API/runtime cost.

export type RangeStandard = 'NEDC' | 'WLTP' | 'EPA' | 'CLTC';

export type EVCar = {
  id: string;
  brand: string;
  model: string;
  batteryKwh: number;
  range: number;
  standard: RangeStandard;
};

export const EV_CARS: EVCar[] = [
  // BYD
  { id: 'byd-atto3', brand: 'BYD', model: 'Atto 3 (Extended)', batteryKwh: 60.48, range: 480, standard: 'NEDC' },
  { id: 'byd-dolphin', brand: 'BYD', model: 'Dolphin (Extended)', batteryKwh: 60.48, range: 490, standard: 'NEDC' },
  { id: 'byd-seal-rwd', brand: 'BYD', model: 'Seal (RWD)', batteryKwh: 82.56, range: 650, standard: 'NEDC' },
  { id: 'byd-seal-awd', brand: 'BYD', model: 'Seal (AWD Performance)', batteryKwh: 82.56, range: 580, standard: 'NEDC' },
  { id: 'byd-sealion7', brand: 'BYD', model: 'Sealion 7 (RWD)', batteryKwh: 82.56, range: 567, standard: 'NEDC' },

  // Tesla
  { id: 'tesla-m3-rwd', brand: 'Tesla', model: 'Model 3 (RWD)', batteryKwh: 60, range: 513, standard: 'WLTP' },
  { id: 'tesla-m3-lr', brand: 'Tesla', model: 'Model 3 (Long Range)', batteryKwh: 79, range: 629, standard: 'WLTP' },
  { id: 'tesla-my-rwd', brand: 'Tesla', model: 'Model Y (RWD)', batteryKwh: 60, range: 455, standard: 'WLTP' },
  { id: 'tesla-my-lr', brand: 'Tesla', model: 'Model Y (Long Range)', batteryKwh: 78.1, range: 533, standard: 'WLTP' },

  // MG
  { id: 'mg4-64', brand: 'MG', model: 'MG4 Electric (64 kWh)', batteryKwh: 64, range: 450, standard: 'WLTP' },
  { id: 'mg-zs-ev', brand: 'MG', model: 'ZS EV', batteryKwh: 50.3, range: 320, standard: 'WLTP' },
  { id: 'mg-ep', brand: 'MG', model: 'MG EP (Wagon)', batteryKwh: 50.3, range: 380, standard: 'NEDC' },

  // Neta
  { id: 'neta-v', brand: 'Neta', model: 'Neta V', batteryKwh: 38.5, range: 384, standard: 'NEDC' },
  { id: 'neta-x', brand: 'Neta', model: 'Neta X', batteryKwh: 56.18, range: 480, standard: 'CLTC' },

  // Deepal
  { id: 'deepal-s07', brand: 'Deepal', model: 'S07', batteryKwh: 79.97, range: 580, standard: 'CLTC' },
  { id: 'deepal-l07', brand: 'Deepal', model: 'L07', batteryKwh: 79.97, range: 580, standard: 'CLTC' },

  // GWM / Ora
  { id: 'ora-goodcat-400', brand: 'Ora', model: 'Good Cat (400 Tech)', batteryKwh: 47.8, range: 400, standard: 'NEDC' },
  { id: 'ora-goodcat-500', brand: 'Ora', model: 'Good Cat (500 Ultra)', batteryKwh: 63.1, range: 500, standard: 'NEDC' },

  // AION
  { id: 'aion-y-plus', brand: 'AION', model: 'Y Plus', batteryKwh: 63.2, range: 490, standard: 'NEDC' },
  { id: 'aion-es', brand: 'AION', model: 'ES', batteryKwh: 55.6, range: 442, standard: 'CLTC' },
];

export function getCarById(id: string | null | undefined): EVCar | undefined {
  if (!id) return undefined;
  return EV_CARS.find((c) => c.id === id);
}

// Convert an advertised range under any standard into an EPA-equivalent (the
// closest proxy for real-world), using the same ratios as the main converter.
// Useful for fairly comparing models quoted under different standards.
export function toEpaKm(value: number, standard: RangeStandard): number {
  let cltc = 0;
  if (standard === 'CLTC') cltc = value;
  else if (standard === 'WLTP') cltc = value / 0.82;
  else if (standard === 'EPA') cltc = (value * 1.168) / 0.82;
  else if (standard === 'NEDC') cltc = (value * 0.85) / 0.82;
  return (cltc * 0.82) / 1.168;
}
