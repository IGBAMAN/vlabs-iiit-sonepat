import { type SceneProcedureStep } from '@/labs/experiments/types';

export const step: SceneProcedureStep = {
  label: 'Place the breadboard and connect the AC source',
  body: 'Place the 830-point breadboard. The AC source models the transformer secondary — connect its two terminals to tie points a1 and a2, which will feed the diode bridge.',
  show: ['bb', 'ac_src'],
  supplyVoltage: 12,
};
