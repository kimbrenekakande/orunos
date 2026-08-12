import { create } from "zustand";

type PlateText = {
	content: string;
	setContent: (content: string) => void;
};

export const usePlateText = create<PlateText>()((set) => ({
	content: "kkkkk",
	setContent: (content: string) => set({ content }),
}));

type DocType = {
	Doctype: string;
	setDoctype: (Doctype: string) => void;
};

export const useDocType = create<DocType>()((set) => ({
	Doctype: "",
	setDoctype: (Doctype: string) => set({ Doctype }),
}));

type Questions = {
	questions: string;
	setQuestions: (questions: string) => void;
};

export const useQuestions = create<Questions>()((set) => ({
	questions: "",
	setQuestions: (questions: string) => set({ questions }),
}));

//Editor Content
type Content = {
	content: string;
	setContent: (questions: string) => void;
};

export const useContent = create<Content>()((set) => ({
	content: "",
	setContent: (content: string) => set({ content }),
}));

// Selected text from the Plate editor — updated automatically on selection change
type SelectedText = {
	selectedText: string;
	setSelectedText: (text: string) => void;
};

export const useSelectedText = create<SelectedText>()((set) => ({
	selectedText: "",
	setSelectedText: (text: string) => set({ selectedText: text }),
}));
