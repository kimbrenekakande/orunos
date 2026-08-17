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
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { AIChatPlugin } from "@platejs/ai/react";
import { useEditorRef } from "platejs/react";
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
	const { messages, status, sendMessage, setMessages } = useChat({
		transport: new DefaultChatTransport({
			api: "/api/ai/chat",
		}),
	});
	const [text, setText] = useState<string>("");
	const { selectedText, resetSelectedText } = useSelectedText();

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
			setMessages((prev) => [
				...prev,
				{
					id: crypto.randomUUID(),
					role: "user" as const,
					parts: [{ type: "text" as const, text: prompt }],
				},
				{
					id: crypto.randomUUID(),
					role: "assistant" as const,
					parts: [
						{
							type: "text" as const,
							text:
								"Applied the edit — review and accept or discard it in the editor.",
						},
					],
				},
			]);

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
