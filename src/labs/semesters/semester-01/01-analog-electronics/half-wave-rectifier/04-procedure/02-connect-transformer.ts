import { type SceneProcedureStep } from '@/labs/experiments/types';
export const step: SceneProcedureStep = {
  label: 'Set up the step-down transformer connections.',
  body: 'Connect the secondary output (6 V AC) to the breadboard power rails. AC input has no polarity — either terminal can go to either rail. Do **NOT** connect the primary (mains) side yet.',
  show: ['bb'],
};
