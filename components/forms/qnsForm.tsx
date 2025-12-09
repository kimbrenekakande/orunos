"use client";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
// import { toast } from "sonner";
import { startCreation } from "@/server/creator";

const formSchema = z.object({
	doctype: z.string(),
	qnz: z.string().min(5, "Your questions must me more than 5 characters"),
});

export function DocumentQns({ doctype }: { doctype: string }) {
  
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			doctype: doctype,
			qnz: "",
		},
	});

	return (
		<>
			<h1 className="mb-5">Start {doctype}</h1>
			<form onSubmit={form.handleSubmit(startCreation)} className="w-[70%] flex flex-col gap-4 items-center">
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
