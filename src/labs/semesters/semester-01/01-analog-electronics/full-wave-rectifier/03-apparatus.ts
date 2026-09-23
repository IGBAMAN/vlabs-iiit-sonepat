import { type LabSection } from '@/labs/lab-content.types';

export const apparatus: LabSection = {
  id: 'apparatus',
  type: 'apparatus',
  title: 'Apparatus Required',
  items: [
    { name: 'Step-down transformer', specification: '230 V / 12 V-0-12 V or 12 V secondary', quantity: '1' },
    { name: 'Diodes', specification: '1N4007 (or similar signal diode)', quantity: '4' },
    { name: 'Breadboard', specification: '830 tie-points', quantity: '1' },
    { name: 'Resistor (load)', specification: '1 kΩ', quantity: '1' },
    { name: 'Capacitor (filter)', specification: '100 µF electrolytic', quantity: '1' },
    { name: 'Digital multimeter', quantity: '1' },
    { name: 'Connecting wires', quantity: 'As required' },
  ],
};
