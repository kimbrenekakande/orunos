import {create} from 'zustand'

type PlateText = {
  content: string
  setContent: (content: string) => void
}

export const usePlateText = create<PlateText>()((set) => ({
  content: 'kkkkk',
  setContent: (content: string) => set({ content }),
}))
