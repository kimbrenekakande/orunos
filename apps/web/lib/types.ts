import { z } from 'zod';
import { ReactNode } from 'react';

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
  react : ReactNode
}

export interface InstituteType {
  id       :  number    
  name     :  string
  country  :  string
  address  :  string
  logo     :  string
}

export const outlineSchema = z.object({
  title : z.string().describe("The main title of the document or outline"),
  summary : z.string().describe("A very detailed summary of the academic document based on the outline"),
  sections : z.array(z.object({
    title : z.string().describe("The title of this specific section"),
    content : z.string().describe("A prompt for the next agent in the chain to generate the content for this section")
  })).describe("An array of sections that make up the document"),
  conclusion : z.string().describe("The very detailed summary of the academic document based on the outline")
});
