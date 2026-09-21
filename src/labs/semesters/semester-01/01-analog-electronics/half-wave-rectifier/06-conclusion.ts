import { type ConclusionSection } from '@/labs/lab-content.types';

export const conclusion: ConclusionSection = {
  id: 'conclusion',
  type: 'conclusion',
  title: 'Conclusion',
  paragraphs: [
    'The half-wave rectifier experiment demonstrated conversion of AC to pulsating DC using a single 1N4148 diode. '
      + 'Only positive half-cycles appeared across the load, confirming reverse-blocking behaviour.',

    'The measured average output agreed closely with the theoretical value $V_{avg} = (V_m - 0.7)/\\pi$. '
      + 'The ripple factor of ~1.21 confirms the low efficiency of half-wave rectification.',

    'Adding a 47 µF filter capacitor significantly reduced output ripple. '
      + 'This experiment validates the rectifier model and demonstrates the role of filter components in power supply design.',
  ],
};
