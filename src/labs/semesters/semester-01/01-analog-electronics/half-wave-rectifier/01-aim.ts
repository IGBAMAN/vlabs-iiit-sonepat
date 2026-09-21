import { type TheorySection } from '@/labs/lab-content.types';

export const aim: TheorySection = {
  id: 'aim',
  type: 'text',
  title: 'Aim',
  paragraphs: [
    'To study the operation of a half-wave rectifier using a single diode, observe the pulsating DC output '
      + 'on an oscilloscope, measure the average output voltage, and compare with the theoretical value '
      + '$V_{avg} = (V_m - 0.7) / \\pi$.',
  ],
};
