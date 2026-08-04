import { z } from 'zod';
import { ReactNode } from 'react';
import type { TPlateEditor } from 'platejs/react';


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
  title: z.string().describe("The title of the document based on its content"),
  hasRefs: z.boolean().describe("Does the document have any references or citations?"),
  sections : z.array(z.object({
    title : z.string().describe("The title of the section"),
    content : z.string().describe("A prompt for the next agent in the chain to generate the content for this section")
  })).describe("An outline sections that make up the document"),
  references: z.array(z.string()).describe("Any references or citations for the document"),
});


export type DocProps = {
  documentId: string;
  questions: string;
  cachedName?: string;
}


export type Transaction = {
  id: string
  transactionId: string
  amount: number
  type: "DEPOSIT" | "WITHDRAWAL"
  status: string
  currency: string
  phoneNumber: string
  description: string
  balanceAfter: number
  createdAt: string
}

export type Doc = {
  id: string
  docTypeId: string
  title: string
  question: string
  answer: string | null
  status: string
  cost: number
  userId: string
  createdAt: Date
  updatedAt: Date
}


// custom interface to extend TPlateEditor with custom fields
export interface EditorTypeWithCustomFields extends TPlateEditor {
  documentData: {
    documentId: string;
    documentTitle: string;
  }
}

