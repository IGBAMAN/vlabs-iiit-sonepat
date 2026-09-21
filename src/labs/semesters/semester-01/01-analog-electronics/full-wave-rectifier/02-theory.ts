import { type TheorySection } from '@/labs/lab-content.types';

export const theory: TheorySection = {
  id: 'theory',
  type: 'text',
  title: 'Theory',
  paragraphs: [
    'A **full-wave rectifier** converts both half-cycles of AC into pulsating DC, '
      + 'doubling the output frequency ($f_{out} = 2 f_{in} = 100\\,\\text{Hz}$ for 50 Hz mains).',

    'In the **bridge configuration**, four diodes (D1–D4) are arranged so that during the positive '
      + 'half-cycle D1 and D3 conduct; during the negative half-cycle D2 and D4 conduct. '
      + 'Current always flows in the same direction through the load.',

    'Average output: $V_{avg} = (2V_m - 1.4) / \\pi$ (two diode drops). '
      + 'Ripple factor $\\gamma \\approx 0.482$ — far better than the half-wave value of 1.21.',

    'A **filter capacitor** reduces ripple: $\\gamma_C \\approx 1/(2\\sqrt{3} f R_L C)$. '
      + 'Larger capacitance lowers ripple but increases peak diode current during charging bursts.',
  ],
};
