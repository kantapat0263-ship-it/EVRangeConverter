'use server';
/**
 * @fileOverview This file provides an AI-powered explanation of various EV range standards.
 *
 * - explainRangeStandards - A function that fetches explanations for specified EV range standards.
 * - ExplainRangeStandardsInput - The input type for the explainRangeStandards function.
 * - ExplainRangeStandardsOutput - The return type for the explainRangeStandards function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ExplainRangeStandardsInputSchema = z.object({
  standards: z.array(z.enum(['CLTC', 'WLTP', 'EPA', 'NEDC'])).describe('An array of EV range standard names to explain.'),
});
export type ExplainRangeStandardsInput = z.infer<typeof ExplainRangeStandardsInputSchema>;

const ExplainRangeStandardsOutputSchema = z.record(
  z.enum(['CLTC', 'WLTP', 'EPA', 'NEDC']),
  z.string().describe('A concise explanation of the EV range standard, including its practical differences and real-world relevance.')
).describe('A map of EV range standard names to their detailed explanations.');
export type ExplainRangeStandardsOutput = z.infer<typeof ExplainRangeStandardsOutputSchema>;

export async function explainRangeStandards(input: ExplainRangeStandardsInput): Promise<ExplainRangeStandardsOutput> {
  return explainRangeStandardsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainRangeStandardsPrompt',
  input: { schema: ExplainRangeStandardsInputSchema },
  output: { schema: ExplainRangeStandardsOutputSchema },
  prompt: `You are an expert in electric vehicle technology and range standards.
The user wants explanations for the following EV range standards:
{{#each standards}}
- {{this}}
{{/each}}

For each standard listed above, provide a concise explanation that covers:
1.  **Meaning**: What does the acronym stand for?
2.  **Measurement Method**: Briefly describe how the range is measured under this standard (e.g., lab tests, specific driving cycles, speeds, temperatures).
3.  **Practical Implications**: What does this standard typically mean for real-world driving range? (e.g., optimistic, realistic, conservative).
4.  **Regional Relevance**: Where is this standard primarily used (e.g., China, Europe, North America)?
5.  **Comparison**: How does it generally compare to other standards (e.g., higher or lower range figures)?

Present the output in JSON format, where the keys are the standard names (e.g., "CLTC", "WLTP") and the values are their respective explanations.
Ensure the explanations are user-friendly and highlight the real-world relevance for an EV owner.
`
});

const explainRangeStandardsFlow = ai.defineFlow(
  {
    name: 'explainRangeStandardsFlow',
    inputSchema: ExplainRangeStandardsInputSchema,
    outputSchema: ExplainRangeStandardsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
