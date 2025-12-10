import {create} from 'zustand'

type PlateText = {
  content: string
  setContent: (content: string) => void
}

export const usePlateText = create<PlateText>()((set) => ({
  content: 'kkkkk',
  setContent: (content: string) => set({ content }),
}))





type DocType = {
  Doctype: string
  setDoctype : (Doctype : string) => void
}

export const useDocType = create<DocType>()((set) => ({
  Doctype: '',
  setDoctype: (Doctype: string) => set({ Doctype}),
}))




type Questions = {
  questions: string
  setQuestions : (questions : string) => void
}

export const useQuestions = create<Questions>()((set) => ({
  questions: '',
  setQuestions: (questions: string) => set({ questions }),
}))