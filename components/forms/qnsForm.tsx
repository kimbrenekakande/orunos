"use client";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldLegend,
	FieldSeparator,
	FieldSet,
} from "@/components/ui/field";

import { startCreation } from "@/server/creator";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import { useDocType, useQnz } from "@/lib/store";

const formSchema = z.object({
	doctype: z.string(),

	qnz: z.string().min(5, "Your questions must me more than 5 characters"),
});

export function DocumentQns({ doctype }: { doctype: string }) {
	const { Doctype, setDoctype } = useDocType();
	const { questions, setQuestions } = useQnz();
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			doctype: doctype,
			qnz: "",
		},
	});

	function getQuestions(formValues: { doctype: string; qnz: string }) {
		setDoctype(formValues.doctype);
		setQuestions(formValues.qnz);

		console.log("Doctype:", Doctype);
		console.log("Questions:", questions);
	}

	return (
		<>
			<h1 className="mb-5">Start {doctype}</h1>
			<form
				onSubmit={form.handleSubmit(getQuestions)}
				className="w-[70%] flex flex-col gap-4 items-center"
			>
				<FieldGroup>
					<Controller
						name="qnz"
						control={form.control}
						render={({ field, fieldState }) => (
							<Field>
								<Textarea
									placeholder="Type your questions here."
									{...field}
									aria-invalid={fieldState.invalid}
									className="h-[200px]"
								/>
								<div className="h-5">
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</div>
							</Field>
						)}
					/>
					<Button type="submit" className="w-40 cursor-pointer">
						Submit
					</Button>
				</FieldGroup>
			</form>
		</>
	);
}
