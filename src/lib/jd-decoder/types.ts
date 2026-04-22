export interface Skill {
  name: string;
  required: boolean;
  shortTermLearnable: boolean;
}

export interface CareerPath {
  year1: string;
  year3: string;
  year5: string;
}

export interface JDAnalysisResult {
  summary: string;
  hardSkills: Skill[];
  softSkills: string[];
  careerPath: CareerPath;
  hiddenRequirements: string[];
  fresherFriendly: 1 | 2 | 3;
}
