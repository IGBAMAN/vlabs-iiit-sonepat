import { type SceneProcedureStep } from '@/labs/experiments/types';
export const step: SceneProcedureStep = {
  label: 'Bring in apparatus and inspect all components.',
  body: 'Collect all components. Inspect each for visible damage. Verify diode polarity (cathode = band). Check capacitor polarity (longer lead = positive). Set up breadboard on a clear, dry surface.',
  show: ['bb'],
};
