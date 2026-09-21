import { type LabSection } from '@/labs/lab-content.types';

export const aim: LabSection = {
  id: 'aim',
  type: 'text',
  title: 'Aim',
  paragraphs: [
    'To study the working of a half-wave rectifier circuit using a p-n junction diode, and to observe how a filter capacitor reduces ripple in the rectified output.',
    'To measure and compare the DC output voltage $V_{dc}$ across the load resistor with and without a filter capacitor.',
  ],
};
