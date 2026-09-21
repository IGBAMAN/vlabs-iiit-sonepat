import { type SceneProcedureStep } from '@/labs/experiments/types';
export const step: SceneProcedureStep = {
  label: 'Verify output frequency is 100 Hz.',
  body: 'Set timebase to 2 ms/div. Count the rectified output period: with 50 Hz input the period = 10 ms / 2 = **5 ms**, confirming $f_{out} = 100\\,\\text{Hz}$. Compare with Channel 1 (50 Hz, period = 20 ms).',
  show: ['bb', 'd1', 'd2', 'd3', 'd4', 'r_load', 'led_out', 'w_vcc_d1', 'w_vcc_d2', 'w_d1_dcplus', 'w_d3_dcplus', 'w_d2_dcplus', 'w_d4_dcplus', 'w_d3_gnd', 'w_d4_gnd', 'w_dcplus_rload', 'w_rload_led', 'w_led_gnd'],
};
