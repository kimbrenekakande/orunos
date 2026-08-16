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
	PromptInputButton,
	PromptInputHeader,
	type PromptInputMessage,
	PromptInputSelect,
	PromptInputSelectContent,
	PromptInputSelectItem,
	PromptInputSelectTrigger,
	PromptInputSelectValue,
	PromptInputSubmit,
	PromptInputTextarea,
	PromptInputFooter,
	PromptInputTools,
	usePromptInputAttachments,
} from "@/components/ai-elements/prompt-input";
import { GlobeIcon } from "lucide-react";
import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
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

const ChatInput = () => {
	const [text, setText] = useState<string>("");
	const [useWebSearch, setUseWebSearch] = useState<boolean>(false);
	const { selectedText, setSelectedText } = useSelectedText();

	const { messages, status, sendMessage } = useChat({
		transport: new DefaultChatTransport({
			api: "/api/ai/chat",
		}),
	});

	// Prefill the input when text is selected in the editor (adjust state during render)
	const [prevSelectedText, setPrevSelectedText] = useState(selectedText.text);
	if (selectedText.text !== prevSelectedText) {
		setPrevSelectedText(selectedText.text);
		if (selectedText.text) {
			setText((prev) =>
				prev ? `${prev} ${selectedText.text}` : selectedText.text,
			);
		}
	}

	const handleSubmit = (message: PromptInputMessage) => {
		const hasText = Boolean(message.text);
		const hasAttachments = Boolean(message.files?.length);

		if (!(hasText || hasAttachments)) {
			return;
		}

		sendMessage(
			{
				text: message.text || "Sent with attachments",
				files: message.files,
			},
			{
				body: {
					webSearch: useWebSearch,
					ctx: {
						children: selectedText.children,
						selection: selectedText.selection,
					},
				},
			},
		);
		setText("");
		setSelectedText({ text: "", children: null, selection: null });
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
						<PromptInputButton
							onClick={() => setUseWebSearch(!useWebSearch)}
							tooltip={{ content: "Search the web", shortcut: "⌘K" }}
							variant={useWebSearch ? "default" : "ghost"}
						>
							<GlobeIcon size={16} />
							<span>Search</span>
						</PromptInputButton>

						{/*llm model selector*/}
						{/*<PromptInputSelect onValueChange={(value) => setModel(value)} value={model}>
                <PromptInputSelectTrigger>
                  <PromptInputSelectValue />
                </PromptInputSelectTrigger>
                <PromptInputSelectContent>
                  {models.map((model) => (
                    <PromptInputSelectItem key={model.id} value={model.id}>
                      {model.name}
                    </PromptInputSelectItem>
                  ))}
                </PromptInputSelectContent>
              </PromptInputSelect>*/}
					</PromptInputTools>
					<PromptInputSubmit disabled={!text} status={status} />
				</PromptInputFooter>
			</PromptInput>
		</div>
	);
};

export default ChatInput;
