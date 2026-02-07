import { z } from 'zod';

export interface Mdprops {
  id : string
  title : string
  content : string
}

export interface MyDocProps {
  title : string;
  content: string;
}

export interface agentProps {
  doctype: string;
  questionnaire: string;
}

export interface emailValues {
  to: string,
  subject: string,
  react : React.ReactNode
}

export const outlineSchema = z.object({
  title : z.string().describe("The main title of the document or outline"),
  summary : z.string().describe("A brief summary of the document's purpose and content"),
  sections : z.array(z.object({
    title : z.string().describe("The title of this specific section"),
    content : z.string().describe("A prompt for the next agent in the chain to generate the content for this section")
  })).describe("An array of sections that make up the document"),
  conclusion : z.string().describe("The concluding remarks or summary of the document")
});
