import { type TheorySection } from '@/labs/lab-content.types';

export const theory: TheorySection = {
  id: 'theory',
  type: 'text',
  title: 'Theory',
  paragraphs: [
    'A rectifier converts AC to DC. The **half-wave rectifier** uses a single diode to allow current '
      + 'during one half of the AC cycle and block the other, producing a pulsating DC output '
      + 'at the same frequency as the AC input.',

    'During the **positive half-cycle** the diode is forward-biased and conducts; '
      + 'the output follows the input. During the **negative half-cycle** the diode blocks, '
      + 'giving zero output. The peak inverse voltage (PIV) rating must exceed the supply peak.',

    'Average output: $V_{avg} = (V_m - 0.7) / \\pi$, where $V_m$ is the peak AC voltage and '
      + '0.7 V is the silicon diode forward drop. '
      + 'Ripple factor $\\gamma \\approx 1.21$ — the ratio of RMS ripple to DC output.',

    'A **filter capacitor** in parallel with the load charges to the peak during conduction '
      + 'and slowly discharges through the load, reducing ripple and raising $V_{avg}$.',
  ],
};
