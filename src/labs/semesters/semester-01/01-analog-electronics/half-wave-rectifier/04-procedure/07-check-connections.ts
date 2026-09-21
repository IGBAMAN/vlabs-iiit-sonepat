import { type SceneProcedureStep } from '@/labs/experiments/types';
export const step: SceneProcedureStep = {
  label: 'Double-check all connections before powering on.',
  body: 'Trace each connection: AC source → diode anode → cathode → load resistor → GND. Verify capacitor polarity if installed. Check no wire bridges across the centre gap accidentally.',
  show: ['bb', 'diode', 'r_load', 'w_vcc_diode', 'w_diode_rload', 'w_rload_gnd', 'w_vm_pos', 'w_vm_neg'],
};
