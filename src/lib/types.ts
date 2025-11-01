import type { EvaluateProjectSustainabilityInput, EvaluateProjectSustainabilityOutput } from "@/ai/flows/evaluate-project-sustainability";

export type Project = EvaluateProjectSustainabilityInput;

export type EvaluationResult = EvaluateProjectSustainabilityOutput;

export type ProjectHistoryItem = {
  id: string;
  project: Project;
  result: EvaluationResult;
  timestamp: Date;
}
