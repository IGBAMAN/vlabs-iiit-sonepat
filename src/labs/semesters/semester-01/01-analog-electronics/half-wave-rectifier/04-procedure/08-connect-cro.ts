import { type SceneProcedureStep } from '@/labs/experiments/types';
export const step: SceneProcedureStep = {
  label: 'Connect the CRO probes to measure input and output.',
  body: 'CRO Channel 1 across AC input (transformer secondary). Channel 2 across $R_L$. Timebase: 5 ms/div, voltage: 2 V/div. Use **DC coupling** on Channel 2 to correctly display the DC component.',
  show: ['bb', 'diode', 'r_load', 'w_vcc_diode', 'w_diode_rload', 'w_rload_gnd', 'w_vm_pos', 'w_vm_neg'],
};
