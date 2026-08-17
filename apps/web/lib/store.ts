import { create } from "zustand";
import type { TRange, Value } from "platejs";

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

// Selected content from the Plate editor — captured as the full editor state
// (document value + selection range), not just the stripped plain text.
// Keeping the raw `children` + `selection` lets us pass them straight to
// /api/ai/command, which expects `ctx = { children, selection, toolName }`.
export type EditorSelection = {
	/** Plain-text fallback of the selection (for prefill / display). */
	text: string;
	/** Full Slate document value — preserves formatting, marks, and MDX nodes. */
	children: Value | null;
	/** Current Slate selection range, or null when collapsed/cleared. */
	selection: TRange | null;
	/** Start character offset of the selection within the full document. */
	from: number;
	/** End character offset of the selection within the full document. */
	to: number;
};

type SelectedText = {
	selectedText: EditorSelection;
	setSelectedText: (selection: EditorSelection) => void;
	resetSelectedText: () => void;
};

const EMPTY_SELECTION: EditorSelection = {
	text: "",
	children: null,
	selection: null,
	from: 0,
	to: 0,
};

export const useSelectedText = create<SelectedText>()((set) => ({
	selectedText: EMPTY_SELECTION,
	setSelectedText: (selection) => set({ selectedText: selection }),
	resetSelectedText: () => set({ selectedText: EMPTY_SELECTION }),
}));
