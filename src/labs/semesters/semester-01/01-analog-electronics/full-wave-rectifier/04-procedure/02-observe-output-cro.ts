import { type SceneProcedureStep } from '@/labs/experiments/types';
export const step: SceneProcedureStep = {
  label: 'Observe the rectified output on CRO.',
  body: 'CRO Channel 1 across transformer secondary. Channel 2 across $R_L$. Power on. Channel 1 shows full sine wave. Channel 2 shows full-wave rectified output — positive half-sinusoids at 100 Hz. Measure $V_m$ (peak) and $V_{avg}$ (DMM DC mode).',
  show: ['bb', 'd1', 'd2', 'd3', 'd4', 'r_load', 'led_out', 'w_vcc_d1', 'w_vcc_d2', 'w_d1_dcplus', 'w_d3_dcplus', 'w_d2_dcplus', 'w_d4_dcplus', 'w_d3_gnd', 'w_d4_gnd', 'w_dcplus_rload', 'w_rload_led', 'w_led_gnd'],
};
