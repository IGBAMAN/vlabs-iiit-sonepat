import { type SceneProcedureStep } from '@/labs/experiments/types';
export const step: SceneProcedureStep = {
  label: 'Add filter capacitor and observe smoothing.',
  body: 'Connect 47 µF electrolytic capacitor in parallel with $R_L$ (positive lead to DC+). Observe Channel 2 — waveform smooths significantly. Residual ripple rides on the DC level. Measure $V_{avg}$ and $V_{ripple,pp}$ and calculate ripple factor.',
  show: ['bb', 'd1', 'd2', 'd3', 'd4', 'r_load', 'led_out', 'w_vcc_d1', 'w_vcc_d2', 'w_d1_dcplus', 'w_d3_dcplus', 'w_d2_dcplus', 'w_d4_dcplus', 'w_d3_gnd', 'w_d4_gnd', 'w_dcplus_rload', 'w_rload_led', 'w_led_gnd'],
};
