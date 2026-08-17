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
import { useState } from "react";
import { AIChatPlugin, AIPlugin } from "@platejs/ai/react";
import { useEditorRef, usePluginOption } from "platejs/react";
import { Button } from "@/components/tiptapui/button";
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
	const chat = usePluginOption(AIChatPlugin, "chat");
	const { messages, status } = chat;
	const toolName = usePluginOption(AIChatPlugin, "toolName");
	const mode = usePluginOption(AIChatPlugin, "mode");
	const [text, setText] = useState<string>("");
	const [editResolved, setEditResolved] = useState(true);
	const { selectedText, resetSelectedText } = useSelectedText();

	const pendingEdit =
		status === "ready" && toolName === "edit" && mode === "chat" && !editResolved;

	const handleSubmit = (message: PromptInputMessage) => {
		const hasText = Boolean(message.text);
		const hasAttachments = Boolean(message.files?.length);

		if (!(hasText || hasAttachments)) {
			return;
		}

		const prompt = message.text || "Sent with attachments";
		const hasSelection = Boolean(selectedText.text.trim());
		const toolName = classify(prompt, hasSelection);

		setEditResolved(false);

		// Delegate to the editor's AI chat (AIChatPlugin). It builds `ctx` from the
		// live editor state and applies edits back to the document. We resolve the
		// toolName here because the command route's auto-classification uses
		// `generateObject`, which Groq's llama-3.3-70b-versatile does not support
		// (it requires `response_format: json_schema`).
		editor.getApi(AIChatPlugin).aiChat.submit(prompt, {
			mode: "chat",
			toolName,
		});

		setText("");
		resetSelectedText();
	};

	const handleAccept = () => {
		editor.getTransforms(AIChatPlugin).aiChat.accept();
		setEditResolved(true);
	};

	const handleDiscard = () => {
		editor.getTransforms(AIPlugin).ai.undo();
		setEditResolved(true);
	};

	return (
		<div className="flex min-h-0 w-full flex-1 flex-col">
			<Conversation>
				<ConversationContent>
					{messages.map((message) => (
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

			{pendingEdit && (
				<div className="flex items-center gap-2 border-t px-4 py-2">
					<span className="text-xs text-muted-foreground">AI suggestion</span>
					<Button size="sm" onClick={handleAccept}>
						Accept
					</Button>
					<Button size="sm" variant="outline" onClick={handleDiscard}>
						Discard
					</Button>
				</div>
			)}

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
