'use server';
/**
 * @fileOverview This file defines a Genkit flow for evaluating the sustainability of a proposed project.
 *
 * The flow takes project details as input and returns a sustainability analysis, classification, and recommendations.
 *
 * @fileOverview
 * - `evaluateProjectSustainability`: A function that evaluates the sustainability of a proposed project.
 * - `EvaluateProjectSustainabilityInput`: The input type for the `evaluateProjectSustainability` function.
 * - `EvaluateProjectSustainabilityOutput`: The return type for the `evaluateProjectSustainability` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EvaluateProjectSustainabilityInputSchema = z.object({
  title: z.string().describe('The title of the project.'),
  type: z.string().describe('The type of the project (e.g., Dam, Power Plant, Highway).'),
  location: z.string().describe('The location of the project.'),
  description: z.string().describe('A detailed description of the project and its objectives.'),
});
export type EvaluateProjectSustainabilityInput = z.infer<typeof EvaluateProjectSustainabilityInputSchema>;

const EvaluateProjectSustainabilityOutputSchema = z.object({
  sustainability_score: z.number().describe('A score from 0-100 representing the project\'s sustainability.'),
  rating: z.enum(['Sustainable', 'Moderate', 'Unsustainable']).describe('The overall sustainability rating of the project.'),
  key_factors: z.array(z.string()).describe('Key factors influencing the sustainability rating.'),
  recommendations: z.array(z.string()).describe('Actionable suggestions to improve the project\'s sustainability.'),
  detailed_report: z.string().describe('A detailed report summarizing the sustainability analysis.'),
});
export type EvaluateProjectSustainabilityOutput = z.infer<typeof EvaluateProjectSustainabilityOutputSchema>;

export async function evaluateProjectSustainability(input: EvaluateProjectSustainabilityInput): Promise<EvaluateProjectSustainabilityOutput> {
  return evaluateProjectSustainabilityFlow(input);
}

const evaluateProjectSustainabilityPrompt = ai.definePrompt({
  name: 'evaluateProjectSustainabilityPrompt',
  input: {schema: EvaluateProjectSustainabilityInputSchema},
  output: {schema: EvaluateProjectSustainabilityOutputSchema},
  prompt: `You are a sustainability expert AI.\nGiven a proposed project with details (type, location, description), evaluate its sustainability based on environmental impact, energy efficiency, ecological footprint, and long-term viability. Return a clear structured JSON with:\n{
  "sustainability_score": 0-100,
  "rating": "Sustainable" | "Moderate" | "Unsustainable",
  "key_factors": ["..."],
  "recommendations": ["..."],
  "detailed_report": "..."
}\n\nProject Title: {{{title}}}\nProject Type: {{{type}}}\nProject Location: {{{location}}}\nProject Description: {{{description}}}`,
});

const evaluateProjectSustainabilityFlow = ai.defineFlow(
  {
    name: 'evaluateProjectSustainabilityFlow',
    inputSchema: EvaluateProjectSustainabilityInputSchema,
    outputSchema: EvaluateProjectSustainabilityOutputSchema,
  },
  async input => {
    const {output} = await evaluateProjectSustainabilityPrompt(input);
    return output!;
  }
);
