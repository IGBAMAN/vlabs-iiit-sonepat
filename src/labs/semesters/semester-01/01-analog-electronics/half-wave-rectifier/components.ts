import { type ComponentInstance } from '@/labs/types';

export const components: ComponentInstance[] = [
  { id: 'bb',     type: 'breadboard' },
  { id: 'diode',  type: 'led',      color: 'yellow', mountedAt: { board: 'bb', col: 8,  row: 'c' } },
  { id: 'r_load', type: 'resistor', ohms: 1000,      mountedAt: { board: 'bb', col: 12, row: 'c' } },

  { id: 'w_vcc_diode',  type: 'wire', color: 'red',
    from: { board: 'bb', rail: 'vcc_top', col: 8 },
    to:   { led: 'diode', end: 'anode' } },
  { id: 'w_diode_rload', type: 'wire', color: 'orange',
    from: { led: 'diode', end: 'cathode' },
    to:   { component: 'r_load', end: 'p1' } },
  { id: 'w_rload_gnd',  type: 'wire', color: 'black',
    from: { component: 'r_load', end: 'p2' },
    to:   { board: 'bb', rail: 'gnd_top', col: 15 } },

  // Voltmeter probes across load
  { id: 'w_vm_pos', type: 'wire', color: 'blue',
    from: { component: 'r_load', end: 'p1' },
    to:   { board: 'bb', col: 12, row: 'a' } },
  { id: 'w_vm_neg', type: 'wire', color: 'blue',
    from: { component: 'r_load', end: 'p2' },
    to:   { board: 'bb', col: 15, row: 'a' } },
];
