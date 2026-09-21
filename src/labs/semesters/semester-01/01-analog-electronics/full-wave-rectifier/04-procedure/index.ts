import { type SceneProcedureStep } from '@/labs/experiments/types';
import { step as s01 } from './01-build-bridge-no-filter';
import { step as s02 } from './02-observe-output-cro';
import { step as s03 } from './03-verify-output-frequency';
import { step as s04 } from './04-add-filter-capacitor';
import { step as s05 } from './05-compare-half-full-wave';

export const procedureSteps: SceneProcedureStep[] = [s01, s02, s03, s04, s05];
