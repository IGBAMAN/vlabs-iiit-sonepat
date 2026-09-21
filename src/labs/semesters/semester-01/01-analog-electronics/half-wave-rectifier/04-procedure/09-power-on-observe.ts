import { type SceneProcedureStep } from '@/labs/experiments/types';
export const step: SceneProcedureStep = {
  label: 'Power on and observe the waveforms.',
  body: 'Plug in the transformer. Channel 1 should show a full sine wave (~6 V peak). Channel 2 should show only positive half-sinusoids. The LED should glow. Use DMM on DC mode to measure average output across the load.',
  show: ['bb', 'diode', 'r_load', 'w_vcc_diode', 'w_diode_rload', 'w_rload_gnd', 'w_vm_pos', 'w_vm_neg'],
};
