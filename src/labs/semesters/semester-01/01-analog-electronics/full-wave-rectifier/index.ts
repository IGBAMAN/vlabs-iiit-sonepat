import { buildCircuit, buildLabContent } from '@/labs/experiments/build';
import { type ExperimentDefinition } from '@/labs/experiments/types';

import { aim }          from './01-aim';
import { theory }       from './02-theory';
import { apparatus }    from './03-apparatus';
import { observations } from './05-observations';
import { conclusion }   from './06-conclusion';
import { components }   from './components';
import { procedureSteps } from './04-procedure';

export const fullWaveRectifierExperiment: ExperimentDefinition = {
  id: 'full-wave-rectifier',
  title: 'Full-Wave Bridge Rectifier',
  description:
    'A full-wave bridge rectifier using four diodes. '
    + 'Both half-cycles are rectified to produce pulsating DC at 100 Hz. '
    + 'A 1 k$\\Omega$ load and green output LED indicate the rectified output.',
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const FullWaveRectifierCircuit = buildCircuit(fullWaveRectifierExperiment);
export const FullWaveRectifierContent = buildLabContent(fullWaveRectifierExperiment);
