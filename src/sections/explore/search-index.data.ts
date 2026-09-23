import { ALL_EXPERIMENTS } from './explore.data';
import { ALL_CONTENTS } from '@/labs/content';
import { buildSearchIndex } from './search-index.build';
import { type SearchIndexEntry } from './search-index.types';
import { type TheorySection, type ProcedureSection, type ApparatusSection } from '@/labs/lab-content.types';

export const SEARCH_INDEX: SearchIndexEntry[] = buildSearchIndex(
  ALL_EXPERIMENTS,
  (circuitId) => {
    const content = ALL_CONTENTS[circuitId];
    if (!content) return undefined;

    const theory = (content.sections.filter((s) => s.type === 'text') as TheorySection[])
      .flatMap((s) => s.paragraphs);
    
    const procedure = (content.sections.filter((s) => s.type === 'procedure') as ProcedureSection[])
      .flatMap((s) => s.steps.map((step) => step.body));

    const apparatus = (content.sections.filter((s) => s.type === 'apparatus') as ApparatusSection[])
      .flatMap((s) => s.items.map((item) => item.name));

    return { theory, procedure, apparatus };
  }
);