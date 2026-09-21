import { type SceneProcedureStep } from '@/labs/experiments/types';
import { step as s01 } from './01-inspect-components';
import { step as s02 } from './02-connect-transformer';
import { step as s03 } from './03-place-diode';
import { step as s04 } from './04-connect-load-resistor';
import { step as s05 } from './05-add-filter-capacitor';
import { step as s06 } from './06-connect-led-indicator';
import { step as s07 } from './07-check-connections';
import { step as s08 } from './08-connect-cro';
import { step as s09 } from './09-power-on-observe';
import { step as s10 } from './10-record-observations';

export const procedureSteps: SceneProcedureStep[] = [s01, s02, s03, s04, s05, s06, s07, s08, s09, s10];
