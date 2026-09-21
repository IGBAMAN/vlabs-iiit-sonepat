import { type ObservationSection } from '@/labs/lab-content.types';

export const observations: ObservationSection = {
  id: 'observations',
  type: 'observation',
  title: 'Observations',
  paragraphs: [
    'Transformer secondary: 9 V RMS, 50 Hz. $V_m = \\sqrt{2} \\times 9 \\approx 12.73\\,\\text{V}$.',
    'Theoretical $V_{avg}$ (full-wave, two drops) $= (2 \\times 12.73 - 1.4)/\\pi \\approx 7.65\\,\\text{V}$.',
    'Full-wave output frequency: 100 Hz (period = 5 ms).',
    'Ripple factor without filter (full-wave): 0.482.',
  ],
  table: {
    headers: ['Configuration', '$V_{avg}$ (V)', 'Ripple Factor $\\gamma$', 'Output Frequency'],
    rows: [
      ['Half-wave, no filter',   '3.8', '1.21', '50 Hz'],
      ['Full-wave, no filter',   '7.6', '0.48', '100 Hz'],
      ['Full-wave, 47 µF filter','8.2', '0.08', '100 Hz'],
    ],
  },
};
