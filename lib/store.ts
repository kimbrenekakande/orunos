import {create} from 'zustand'

type PlateText = {
  content: string
  setContent: (content: string) => void
}

export const usePlateText = create<PlateText>()((set) => ({
  content: 'kkkkk',
  setContent: (content: string) => set({ content }),
}))





type paperID = {
  id: string
  setId : (id : string) => void
}

export const usePaperID= create<paperID>()((set) => ({
  id: '',
  setId: (id: string) => set({ id }),
}))