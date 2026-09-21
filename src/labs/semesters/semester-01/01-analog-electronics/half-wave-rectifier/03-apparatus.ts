import { type ApparatusSection } from '@/labs/lab-content.types';

export const apparatus: ApparatusSection = {
  id: 'apparatus',
  type: 'apparatus',
  title: 'Apparatus Required',
  items: [
    { name: 'Breadboard',                     specification: 'Standard 830-tie-point solderless breadboard', quantity: '1' },
    { name: 'Step-down Transformer',           specification: '230 V / 6 V or 9 V, 500 mA',                 quantity: '1' },
    { name: '1N4148 Silicon Diode',            specification: 'PIV 75 V, $I_F$ 200 mA',                      quantity: '1' },
    { name: 'Load Resistor',                   specification: '1 k$\\Omega$, ¼ W',                            quantity: '1' },
    { name: 'Filter Capacitor',                specification: '47 µF, 25 V electrolytic',                    quantity: '1' },
    { name: 'Green LED',                       specification: '5 mm, $V_f \\approx 2.0\\,\\text{V}$',         quantity: '1' },
    { name: 'Current-Limiting Resistor',       specification: '330 $\\Omega$, ¼ W',                           quantity: '1' },
    { name: 'CRO / Digital Oscilloscope',      specification: '20 MHz, dual channel',                        quantity: '1' },
    { name: 'Digital Multimeter',              specification: 'AC/DC voltage and frequency measurement',      quantity: '1' },
    { name: 'Regulated DC Power Supply',       specification: '0–12 V, 1 A',                                  quantity: '1' },
    { name: 'Connecting Wires',                specification: 'M-M and M-F, assorted colours',               quantity: '1 set' },
  ],
};
