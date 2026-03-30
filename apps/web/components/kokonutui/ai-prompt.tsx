"use client";

import { ArrowRight,Paperclip , DeleteIcon, LoaderIcon} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

import { Textarea } from "@/components/ui/textarea";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { startCreation } from "@/server/creator";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { ChangeEvent, useState } from "react";

const formSchema = z.object({
	doctype: z.string(),
  qnz: z.string().min(5, "Your questions must me more than 5 characters"),
});


export default function Questionaire({ doctype }: { doctype: string }) {
  const [files, SetFiles] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const allFiles = Array.from(e.target.files ?? [])
      SetFiles(currentFiles => [...currentFiles, ...allFiles])
       console.log(files)
    }
  }

  const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			doctype: doctype,
      qnz: ""
		},
	});

  // Wrapper that injects files into the data before calling startCreation
  async function onSubmit(data: { doctype: string; qnz: string }) {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("doctype", data.doctype);
      formData.append("qnz", data.qnz);

      files.forEach((file) => {
        formData.append("files", file);
      });

      await startCreation(formData);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full sm:w-4/6 py-4">
      <div className="rounded bg-black/5 p-1.5 pt-4 dark:bg-white/5">
        <div id="form header" className="mx-2 mb-2.5 flex items-center gap-2">
          <div className="flex flex-1 items-center gap-2">
            <Image
              src="/brand/logo_white.png"
              alt="#"
              height={15}
              width={15}
              className="text-black"
            />

            <h3 className="text-black text-sm tracking-tighter dark:text-white/90">
              Free during BETA
            </h3>
          </div>
          <p className="text-black text-sm tracking-tighter dark:text-white/90">
            {doctype.toLocaleUpperCase()}
          </p>
        </div>
        <form onSubmit={form.handleSubmit(onSubmit)} className="relative">
          <div className="relative flex flex-col">
            <div className="overflow-y-auto" style={{ maxHeight: "400px" }}>
              <FieldGroup>
                <Controller
      						name="qnz"
      						control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <Textarea
                        placeholder={"Please enter what the document is about?"}
                        {...field}
                        className={cn(
                          "w-full  hover: resize-none rounded rounded-b-none border-none bg-transparent px-4 py-3 placeholder:text-black/70 focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-transparent dark:text-white dark:placeholder:text-white/70",
                          "min-h-30"
                        )}
                        id="ai-input-15"
                        rows={60}
                      />
                      <div className="h-5">
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </div>
                    </Field>
      						)}
                />

                <div className="absolute right-3 bottom-3 left-3 flex w-[calc(100%-24px)] items-center justify-between">
                  <div className="flex items-center gap-2">
                    <label aria-label="Attach file" className={cn( "cursor-pointer")}>
                      <input multiple className="hidden" type="file" onChange={handleFileChange}/>
                      <Paperclip className="h-6 w-6 transition-colors hover:text-orange-500" />
                    </label>
                  </div>
                  <button
                    aria-label="Send message"
                    className={cn(
                      "rounded bg-black/5 p-2 dark:bg-grey-500 cursor-pointer border border-white hover:border-transparent",
                      "hover:bg-black/10 focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:ring-offset-0 dark:hover:bg-orange-500"
                    )}
                    disabled={isSubmitting}
                    type="submit"
                  >
                    {isSubmitting ? (
                      <LoaderIcon
                        role="status"
                        aria-label="Loading"
                        className={cn("size-4 animate-spin text-orange-500")}
                      />
                    ) : (
                      <ArrowRight
                        className={cn(
                          "h-4 w-4 transition-opacity duration-200 dark:text-white ",
                        )}
                      />
                    )}
                  </button>
                </div>
              </FieldGroup>
            </div>
          </div>
        </form>
      </div>
      <div className="pt-8">
        {
          files?.map((f) => {
            return (
              <div key={f.name} className="w-full flex justify-between">
                <p className="h-4">{f.name}</p>
                <DeleteIcon/>
              </div>
            )

          })
        }
      </div>
    </div>
  );
}
