import { type SceneProcedureStep } from '@/labs/experiments/types';
export const step: SceneProcedureStep = {
  label: 'Connect the load resistor (1 kΩ).',
  body: 'Insert the 1 k$\\Omega$ load resistor between the diode cathode and the GND rail. This represents the load consuming the rectified power.',
  show: ['bb', 'diode', 'r_load', 'w_vcc_diode', 'w_diode_rload'],
  highlight: 'r_load',
};
