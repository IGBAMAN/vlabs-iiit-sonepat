import { type ConclusionSection } from '@/labs/lab-content.types';

export const conclusion: ConclusionSection = {
  id: 'conclusion',
  type: 'conclusion',
  title: 'Conclusion',
  paragraphs: [
    'The full-wave bridge rectifier successfully converted both half-cycles of 50 Hz AC into pulsating DC at 100 Hz. '
      + 'Measured average output voltage agreed closely with the theoretical value.',

    'Adding a 47 µF filter capacitor reduced the ripple factor from 0.48 to ~0.08, demonstrating effective smoothing. '
      + 'The full-wave configuration produced higher average output and lower ripple than the half-wave rectifier.',

    'The bridge configuration — requiring no centre-tapped transformer — is the industry standard for mains-frequency rectification in virtually all electronic equipment.',
  ],
};
