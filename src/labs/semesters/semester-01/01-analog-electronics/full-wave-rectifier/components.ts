import { type ComponentInstance } from '@/labs/types';

export const components: ComponentInstance[] = [
  { id: 'bb',      type: 'breadboard' },

  // Bridge diodes
  { id: 'd1', type: 'led', color: 'yellow', mountedAt: { board: 'bb', col: 5,  row: 'c' } },
  { id: 'd2', type: 'led', color: 'yellow', mountedAt: { board: 'bb', col: 5,  row: 'h' } },
  { id: 'd3', type: 'led', color: 'yellow', mountedAt: { board: 'bb', col: 10, row: 'c' } },
  { id: 'd4', type: 'led', color: 'yellow', mountedAt: { board: 'bb', col: 10, row: 'h' } },

  { id: 'r_load',  type: 'resistor', ohms: 1000, mountedAt: { board: 'bb', col: 15, row: 'c' } },
  { id: 'led_out', type: 'led',      color: 'green', mountedAt: { board: 'bb', col: 20, row: 'c' } },

  { id: 'w_vcc_d1',    type: 'wire', color: 'red',
    from: { board: 'bb', rail: 'vcc_top', col: 5 }, to: { led: 'd1', end: 'anode' } },
  { id: 'w_d1_dcplus', type: 'wire', color: 'orange',
    from: { led: 'd1', end: 'cathode' }, to: { board: 'bb', col: 8, row: 'b' } },
  { id: 'w_d3_dcplus', type: 'wire', color: 'orange',
    from: { led: 'd3', end: 'anode' },  to: { board: 'bb', col: 8, row: 'c' } },
  { id: 'w_d3_gnd',    type: 'wire', color: 'black',
    from: { led: 'd3', end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 11 } },
  { id: 'w_vcc_d2',    type: 'wire', color: 'red',
    from: { board: 'bb', rail: 'vcc_top', col: 3 }, to: { led: 'd2', end: 'anode' } },
  { id: 'w_d2_dcplus', type: 'wire', color: 'orange',
    from: { led: 'd2', end: 'cathode' }, to: { board: 'bb', col: 8, row: 'i' } },
  { id: 'w_d4_dcplus', type: 'wire', color: 'orange',
    from: { led: 'd4', end: 'anode' },  to: { board: 'bb', col: 8, row: 'h' } },
  { id: 'w_d4_gnd',    type: 'wire', color: 'black',
    from: { led: 'd4', end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 13 } },
  { id: 'w_dcplus_rload', type: 'wire', color: 'green',
    from: { board: 'bb', col: 8, row: 'a' }, to: { component: 'r_load', end: 'p1' } },
  { id: 'w_rload_led', type: 'wire', color: 'green',
    from: { component: 'r_load', end: 'p2' }, to: { led: 'led_out', end: 'anode' } },
  { id: 'w_led_gnd',   type: 'wire', color: 'black',
    from: { led: 'led_out', end: 'cathode' }, to: { board: 'bb', rail: 'gnd_top', col: 21 } },
];
