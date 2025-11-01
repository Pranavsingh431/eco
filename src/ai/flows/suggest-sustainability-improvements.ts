'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating actionable suggestions to improve the sustainability of a proposed project.
 *
 * - suggestSustainabilityImprovements - A function that triggers the sustainability improvement suggestion flow.
 * - SuggestSustainabilityImprovementsInput - The input type for the suggestSustainabilityImprovements function.
 * - SuggestSustainabilityImprovementsOutput - The return type for the suggestSustainabilityImprovements function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestSustainabilityImprovementsInputSchema = z.object({
  projectTitle: z.string().describe('The title of the project.'),
  projectType: z.string().describe('The type of the project (e.g., Dam, Power Plant, Highway).'),
  location: z.string().describe('The location of the project.'),
  projectDescription: z.string().describe('A detailed description of the project and its objectives.'),
});
export type SuggestSustainabilityImprovementsInput = z.infer<
  typeof SuggestSustainabilityImprovementsInputSchema
>;

const SuggestSustainabilityImprovementsOutputSchema = z.object({
  recommendations: z
    .array(z.string())
    .describe('An array of actionable suggestions to improve the project sustainability.'),
});
export type SuggestSustainabilityImprovementsOutput = z.infer<
  typeof SuggestSustainabilityImprovementsOutputSchema
>;

export async function suggestSustainabilityImprovements(
  input: SuggestSustainabilityImprovementsInput
): Promise<SuggestSustainabilityImprovementsOutput> {
  return suggestSustainabilityImprovementsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestSustainabilityImprovementsPrompt',
  input: {schema: SuggestSustainabilityImprovementsInputSchema},
  output: {schema: SuggestSustainabilityImprovementsOutputSchema},
  prompt: `You are a sustainability expert AI. Given a proposed project with details (type, location, description), generate 2-3 actionable suggestions to improve its sustainability, offering alternative approaches or modifications.

Project Title: {{{projectTitle}}}
Project Type: {{{projectType}}}
Location: {{{location}}}
Project Description: {{{projectDescription}}}

Return the suggestions in an array.

{
  "recommendations": ["suggestion 1", "suggestion 2", "suggestion 3"]
}`,
});

const suggestSustainabilityImprovementsFlow = ai.defineFlow(
  {
    name: 'suggestSustainabilityImprovementsFlow',
    inputSchema: SuggestSustainabilityImprovementsInputSchema,
    outputSchema: SuggestSustainabilityImprovementsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
