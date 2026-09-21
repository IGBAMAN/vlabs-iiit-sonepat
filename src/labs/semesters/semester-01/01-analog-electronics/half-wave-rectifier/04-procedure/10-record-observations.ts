import { type SceneProcedureStep } from '@/labs/experiments/types';
export const step: SceneProcedureStep = {
  label: 'Record observations and verify against theoretical values.',
  body: 'Measure $V_m$ (peak input) with the CRO. Calculate theoretical $V_{avg} = (V_m - 0.7)/\\pi$. Compare with DMM reading. Calculate ripple factor from CRO waveform. Repeat with filter capacitor and note ripple reduction.',
  show: ['bb', 'diode', 'r_load', 'w_vcc_diode', 'w_diode_rload', 'w_rload_gnd', 'w_vm_pos', 'w_vm_neg'],
};
