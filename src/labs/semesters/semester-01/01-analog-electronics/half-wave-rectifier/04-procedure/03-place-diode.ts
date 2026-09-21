import { type SceneProcedureStep } from '@/labs/experiments/types';
export const step: SceneProcedureStep = {
  label: 'Place the 1N4148 diode on the breadboard.',
  body: 'Insert the 1N4148 diode so that the anode (end without the band) faces the AC input rail and the cathode (band) points toward the load side.',
  show: ['bb', 'diode'],
  highlight: 'diode',
};
