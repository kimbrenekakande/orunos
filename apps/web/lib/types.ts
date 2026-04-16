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

export interface SectionLog {
  title: string;
  success: boolean;
}

export const outlineSchema = z.object({
  id : z.string().describe("The unique identifier for the document"),
  title : z.string().describe("The title of the document based on its content"),
  sections : z.array(z.object({
    title : z.string().describe("The title of the section"),
    content : z.string().describe("A prompt for the next agent in the chain to generate the content for this section")
  })).describe("An outline sections that make up the document"),
  references: z.array(z.string()).describe("Any references or citations for the document"),
});


