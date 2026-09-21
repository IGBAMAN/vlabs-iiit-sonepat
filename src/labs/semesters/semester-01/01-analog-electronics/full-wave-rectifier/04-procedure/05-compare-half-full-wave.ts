import { type SceneProcedureStep } from '@/labs/experiments/types';
export const step: SceneProcedureStep = {
  label: 'Compare half-wave and full-wave rectification.',
  body: 'Remove two adjacent diodes to convert to half-wave. Observe — only every other half-cycle appears, ripple doubles. Record $V_{avg}$ and ripple for the half-wave configuration and tabulate the comparison. Restore all four diodes when done.',
  show: ['bb', 'd1', 'd2', 'd3', 'd4', 'r_load', 'led_out', 'w_vcc_d1', 'w_vcc_d2', 'w_d1_dcplus', 'w_d3_dcplus', 'w_d2_dcplus', 'w_d4_dcplus', 'w_d3_gnd', 'w_d4_gnd', 'w_dcplus_rload', 'w_rload_led', 'w_led_gnd'],
};
