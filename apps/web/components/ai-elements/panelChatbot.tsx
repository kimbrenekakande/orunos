"use client";

import {
	Attachment,
	AttachmentPreview,
	AttachmentRemove,
	Attachments,
} from "@/components/ai-elements/attachments";
import {
	PromptInput,
	PromptInputActionAddAttachments,
	PromptInputActionAddScreenshot,
	PromptInputActionMenu,
	PromptInputActionMenuContent,
	PromptInputActionMenuTrigger,
	PromptInputBody,
	PromptInputHeader,
	type PromptInputMessage,
	PromptInputSubmit,
	PromptInputTextarea,
	PromptInputFooter,
	PromptInputTools,
	usePromptInputAttachments,
} from "@/components/ai-elements/prompt-input";
import { TextSelect } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useParams } from "next/navigation";
import { AIChatPlugin } from "@platejs/ai/react";
import { useEditorRef, usePluginOption } from "platejs/react";
import {
	Conversation,
	ConversationContent,
	ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
	Message,
	MessageContent,
	MessageResponse,
} from "@/components/ai-elements/message";
import { useSelectedText } from "@/lib/store";

const CHAT_STORAGE_PREFIX = "orunos-chat:";

function loadChat(documentId: string): UIMessage[] {
	if (typeof window === "undefined") return [];
	try {
		const raw = localStorage.getItem(`${CHAT_STORAGE_PREFIX}${documentId}`);
		return raw ? (JSON.parse(raw) as UIMessage[]) : [];
	} catch {
		return [];
	}
}

function saveChat(documentId: string, messages: UIMessage[]) {
	if (typeof window === "undefined") return;
	try {
		localStorage.setItem(
			`${CHAT_STORAGE_PREFIX}${documentId}`,
			JSON.stringify(messages),
		);
	} catch {
		// Ignore write failures (e.g. storage full / private mode).
	}
}

function editStatusText(status: string | undefined): string {
	if (status === "error") return "The edit failed — please try again.";
	if (status === "ready")
		return "Applied the edit — review and accept or discard it in the editor.";
	return "Applying the edit…";
}

const PromptInputAttachmentsDisplay = () => {
	const attachments = usePromptInputAttachments();

	if (attachments.files.length === 0) {
		return null;
	}

	return (
		<Attachments variant="inline">
			{attachments.files.map((attachment) => (
				<Attachment
					data={attachment}
					key={attachment.id}
					onRemove={() => attachments.remove(attachment.id)}
				>
					<AttachmentPreview />
					<AttachmentRemove />
				</Attachment>
			))}
		</Attachments>
	);
};

const SelectionBadge = () => {
	const { selectedText } = useSelectedText();
	const { text, from, to } = selectedText;

	if (!text.trim()) {
		return null;
	}

	return (
		<div
			className="flex w-full items-center justify-between gap-1.5 rounded-md border border-orange-500/40 bg-orange-500/10 px-2 py-1 text-xs text-orange-500"
			title={`Selection: characters ${from} → ${to}`}
		>
			<span className="flex items-center gap-1.5 font-medium">
				<TextSelect className="size-3.5 shrink-0" />
				Selected
			</span>
			<span className="rounded bg-orange-500/15 px-1.5 py-px font-mono text-[11px] tabular-nums">
				{from} → {to}
			</span>
		</div>
	);
};

const classify = (
	message: string,
	hasSelection: boolean,
): "edit" | "generate" | "comment" => {
	// Nothing selected → nothing to edit; answer in chat.
	if (!hasSelection) return "generate";

	// Strip polite prefixes so "can you make this shorter" reads as "make this shorter".
	const m = message
		.trim()
		.replace(
			/^(please|pls|can you|could you|would you|will you|can u|could u|would u)\s*/i,
			"",
		);

	// Explicit comment / review requests → attach a comment to the selection.
	if (/\b(review|comment|feedback|annotat|critique)\b/i.test(m))
		return "comment";

	// Questions and explanations are conversation → answer in chat, leave the
	// document untouched.
	if (
		/^(what|whats|what's|why|how|when|where|who|which|is|are|does|do|did|explain|describe|define|tell me|summarize|elaborate|clarify|analyze|evaluate|discuss|compare)\b/i.test(
			m,
		) ||
		/\b(meaning|means|mean by|explanation|definition)\b/i.test(m)
	) {
		return "generate";
	}

	// Any other instruction ("change this", "make it shorter", "translate this",
	// "write it in Mandarin", etc.) is an action → apply it to the selection.
	return "edit";
};

const ChatInput = () => {
	const editor = useEditorRef();
	const params = useParams<{ id: string }>();
	const documentId = params?.id ?? "default";

	const initialMessages = useMemo(() => loadChat(documentId), [documentId]);

	const { messages, status, sendMessage, setMessages } = useChat({
		id: `${CHAT_STORAGE_PREFIX}${documentId}`,
		messages: initialMessages,
		transport: new DefaultChatTransport({
			api: "/api/ai/chat",
		}),
	});
	const [text, setText] = useState<string>("");
	const { selectedText, resetSelectedText } = useSelectedText();

	// Track the editor's own AI chat status so we can report edit progress
	// accurately ("Applying…" → "Applied…") instead of a static message.
	const editorChat = usePluginOption(AIChatPlugin, "chat");
	const editorStatus = editorChat.status;
	const [pendingEditId, setPendingEditId] = useState<string | null>(null);

	// Derive the pending edit message's text from the live editor status.
	const displayMessages = useMemo(() => {
		if (!pendingEditId) return messages;
		const statusText = editStatusText(editorStatus);
		return messages.map((m) =>
			m.id === pendingEditId
				? { ...m, parts: [{ type: "text" as const, text: statusText }] }
				: m,
		);
	}, [messages, pendingEditId, editorStatus]);

	// Persist the conversation so it survives tab switches and page reloads.
	useEffect(() => {
		saveChat(documentId, displayMessages);
	}, [documentId, displayMessages]);

	const handleSubmit = (message: PromptInputMessage) => {
		const hasText = Boolean(message.text);
		const hasAttachments = Boolean(message.files?.length);

		if (!(hasText || hasAttachments)) {
			return;
		}

		const prompt = message.text || "Sent with attachments";
		const hasSelection = Boolean(selectedText.text.trim());
		const toolName = classify(prompt, hasSelection);

		if (toolName === "generate") {
			// Conversation → answer in the panel chat. Send the selection as
			// context so the model knows what we're talking about.
			sendMessage(
				{ text: prompt },
				{ body: { ctx: { text: selectedText.text } } },
			);
		} else {
			// Action (edit/comment) → keep the message visible in the panel, then
			// drive the editor's AI chat so the edit is applied and the editor's
			// own floating toolbar shows the Accept / Discard popup. We resolve the
			// toolName here because the command route's auto-classification uses
			// `generateObject`, which Groq's llama-3.3-70b-versatile does not
			// support.
			const applyingId = crypto.randomUUID();
			setMessages((prev) => {
				// Commit the previous pending edit's final text so it doesn't revert
				// back to "Applying…" once we track the new message.
				const committed = pendingEditId
					? prev.map((m) =>
							m.id === pendingEditId
								? {
										...m,
										parts: [
											{
												type: "text" as const,
												text: editStatusText(editorStatus),
											},
										],
									}
								: m,
						)
					: prev;
				return [
					...committed,
					{
						id: crypto.randomUUID(),
						role: "user" as const,
						parts: [{ type: "text" as const, text: prompt }],
					},
					{
						id: applyingId,
						role: "assistant" as const,
						parts: [{ type: "text" as const, text: "Applying the edit…" }],
					},
				];
			});
			setPendingEditId(applyingId);

			editor.getApi(AIChatPlugin).aiChat.show();
			editor.getApi(AIChatPlugin).aiChat.submit(prompt, {
				mode: "chat",
				toolName,
			});
			editor.tf.focus();
		}

		setText("");
		resetSelectedText();
	};

	return (
		<div className="flex min-h-0 w-full flex-1 flex-col">
			<Conversation>
				<ConversationContent>
					{displayMessages.map((message) => (
						<Message from={message.role} key={message.id}>
							<MessageContent>
								{message.parts.map((part, i) => {
									switch (part.type) {
										case "text":
											return (
												<MessageResponse key={`${message.id}-${i}`}>
													{part.text}
												</MessageResponse>
											);
										default:
											return null;
									}
								})}
							</MessageContent>
						</Message>
					))}
				</ConversationContent>
				<ConversationScrollButton />
			</Conversation>

			<PromptInput
				onSubmit={handleSubmit}
				className="mt-4 border-t"
				globalDrop
				multiple
			>
				<PromptInputHeader>
					<SelectionBadge />
					<PromptInputAttachmentsDisplay />
				</PromptInputHeader>
				<PromptInputBody>
					<PromptInputTextarea
						onChange={(e) => setText(e.target.value)}
						value={text}
					/>
				</PromptInputBody>

				{/*The footer of the chat input area for things like model choosing and tools*/}
				<PromptInputFooter>
					<PromptInputTools>
						<PromptInputActionMenu>
							<PromptInputActionMenuTrigger />
							<PromptInputActionMenuContent>
								<PromptInputActionAddAttachments />
								<PromptInputActionAddScreenshot />
							</PromptInputActionMenuContent>
						</PromptInputActionMenu>
					</PromptInputTools>
					<PromptInputSubmit disabled={!text} status={status} />
				</PromptInputFooter>
			</PromptInput>
		</div>
	);
};

export default ChatInput;
