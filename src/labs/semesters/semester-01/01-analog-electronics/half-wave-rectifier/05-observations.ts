import { type ObservationSection } from '@/labs/lab-content.types';

export const observations: ObservationSection = {
  id: 'observations',
  type: 'observation',
  title: 'Observations',
  paragraphs: [
    'Input AC supply frequency: 50 Hz. Secondary transformer voltage (RMS): 6 V AC.',
    'Peak input voltage $V_m = \\sqrt{2} \\times V_{rms} \\approx 8.49\\,\\text{V}$. Diode forward drop $\\approx 0.7\\,\\text{V}$.',
    'Theoretical average DC output (no filter): $V_{avg} = (V_m - 0.7)/\\pi \\approx 2.48\\,\\text{V}$.',
    'Ripple factor (no filter): $\\gamma \\approx 1.21$.',
  ],
  table: {
    headers: ['Parameter', 'Theoretical', 'Measured (No Filter)', 'Measured (With 47 µF Filter)'],
    rows: [
      ['Peak Input Voltage $V_m$ (V)',    '8.49', '—', '—'],
      ['Average DC Output $V_{avg}$ (V)', '2.48', '—', '—'],
      ['RMS Ripple Voltage $V_r$ (V)',    '3.00', '—', '—'],
      ['Ripple Factor $\\gamma$',         '1.21', '—', '—'],
      ['Rectifier Efficiency $\\eta$ (%)', '40.6', '—', '—'],
    ],
  },
};
