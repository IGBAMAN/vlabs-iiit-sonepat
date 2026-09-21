import { type SceneProcedureStep } from '@/labs/experiments/types';
export const step: SceneProcedureStep = {
  label: 'Build the bridge rectifier (no filter).',
  body: 'Arrange four 1N4007 diodes in a bridge. Label corners: AC1, AC2 (transformer inputs), DC+ (cathodes of D1,D2 meeting), DC− (anodes of D3,D4 meeting). Connect transformer secondary across AC1/AC2. Connect $R_L = 1\\,\\text{k}\\Omega$ between DC+ and DC−. No filter capacitor yet.',
  show: ['bb', 'd1', 'd2', 'd3', 'd4', 'r_load'],
};
