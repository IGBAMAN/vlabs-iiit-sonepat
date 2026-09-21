import { type SceneProcedureStep } from '@/labs/experiments/types';
export const step: SceneProcedureStep = {
  label: 'Connect the LED output indicator via a 330 Ω resistor.',
  body: 'Connect a 330 $\\Omega$ resistor in series with a green LED from the load node to GND. The LED glows continuously (with 50 Hz flicker) confirming forward-biased DC output during conduction half-cycles.',
  show: ['bb', 'diode', 'r_load', 'w_vcc_diode', 'w_diode_rload', 'w_rload_gnd'],
};
