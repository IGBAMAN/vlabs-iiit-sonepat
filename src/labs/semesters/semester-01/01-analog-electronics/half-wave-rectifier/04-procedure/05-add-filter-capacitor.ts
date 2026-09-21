import { type SceneProcedureStep } from '@/labs/experiments/types';
export const step: SceneProcedureStep = {
  label: 'Add the filter capacitor across the load (Part B).',
  body: 'Connect a 47 µF electrolytic capacitor in parallel with $R_L$. Positive lead to diode cathode side, negative lead to GND. The capacitor charges during conduction and discharges slowly through the load, reducing ripple.',
  show: ['bb', 'diode', 'r_load', 'w_vcc_diode', 'w_diode_rload', 'w_rload_gnd'],
};
