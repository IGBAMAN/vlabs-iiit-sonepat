export type ExploreExperiment = {
  id: string;
  title: string;
  description: string;
  circuitId: string;
  labRoute?: string;
  tags: readonly string[];
};

export type ExploreSubject = {
  id: string;
  title: string;
  description: string;
  circuitId: string;
  experiments: ExploreExperiment[];
};

export type ExploreSemester = {
  id: string;
  label: string;
  subjects: ExploreSubject[];
};
