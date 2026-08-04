"use client";

import { ArrowRight, Paperclip, Trash2, LoaderIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

import { CircleAlertIcon } from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/tiptapui/alert";

import { Textarea } from "@/components/ui/textarea";
import { Field, FieldError } from "@/components/ui/field";
import { useRouter } from "next/navigation";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { ChangeEvent, useState } from "react";

const formSchema = z.object({
  doctype: z.string(),
  qnz: z.string().min(5, "Must be more than 5 characters"),
});

export default function Questionaire({ doctype, canAfford }: { doctype: string; canAfford: boolean }) {
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const allFiles = Array.from(e.target.files ?? [])
      setFiles(currentFiles => [...currentFiles, ...allFiles])
    }
  }

  function removeFile(index: number) {
    setFiles(currentFiles => currentFiles.filter((_, i) => i !== index))
  }

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      doctype: doctype,
      qnz: ""
    },
  });

  async function onSubmit(data: { doctype: string; qnz: string }) {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paperType: data.doctype,
          prompt: data.qnz,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        console.error(err.error);
        return;
      }

      const { docTypeId, docId } = await res.json();
      router.push(`/dashboard/${docTypeId}/editor/${docId}?source=form`);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            src="/brand/logo_black.png"
            alt="Logo"
            height={18}
            width={18}
            className="dark:hidden w-[18px] h-[18px]"
          />
          <Image
            src="/brand/logo_white.png"
            alt="Logo"
            height={18}
            width={18}
            className="hidden dark:block w-[18px] h-[18px]"
          />
          <span className="text-xs text-muted-foreground">Free during BETA</span>
        </div>
        <span className="text-xs font-medium uppercase tracking-wider text-orange-500">
          {doctype}
        </span>
      </div>

      {!canAfford && (
        <Alert variant="error">
          <CircleAlertIcon />
          <AlertTitle>Insufficient balance!</AlertTitle>
          <AlertDescription>
            Your balance is insufficient to proceed. Please top up to continue.
          </AlertDescription>
        </Alert>
      )}

      <div className="rounded border border-border/60 overflow-hidden">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="relative">
            <Controller
              name="qnz"
              control={form.control}
              render={({ field, fieldState }) => (
                <div>
                  <Textarea
                    placeholder={"Describe your document..."}
                    {...field}
                    className={cn(
                      "w-full resize-none border-none bg-transparent px-4 pt-3 placeholder:text-muted-foreground/50 focus-visible:ring-0 text-sm min-h-[250px] rounded-none"
                    )}
                    rows={60}
                  />
                  {fieldState.invalid && (
                    <div className="px-4 pb-2">
                      <FieldError errors={[fieldState.error]} />
                    </div>
                  )}
                </div>
              )}
            />
            
            <div className="flex items-center justify-between px-4 py-3 border-t border-border/40">
              <label className={cn("cursor-pointer p-1.5 rounded-md transition-colors")}>
                <input multiple className="hidden" type="file" onChange={handleFileChange}/>
                <Paperclip className="h-4 w-4 text-muted-foreground" />
              </label>
              
              <button
                aria-label="Generate document"
                className={cn(
                  "flex items-center gap-1.5 rounded bg-foreground px-3 py-1.5 text-background text-xs font-medium cursor-pointer",
                  "hover:bg-orange-500 transition-colors",
                  "disabled:opacity-50 disabled:cursor-not-allowed"
                )}
                disabled={isSubmitting || !canAfford}
                type="submit"
              >
                {isSubmitting ? (
                  <>
                    <LoaderIcon className="h-3.5 w-3.5 animate-spin" />
                    <span>Generating</span>
                  </>
                ) : (
                  <>
                    <span>Generate</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      {files.length > 0 && (
        <div className="relative">
          <div className="max-h-32 overflow-y-auto space-y-2">
            {files.map((f, index) => (
              <div 
                key={f.name} 
                className="flex items-center justify-between px-3 py-2 rounded-lg text-xs"
              >
                <span className="truncate text-muted-foreground">{f.name}</span>
                <button 
                  onClick={() => removeFile(index)}
                  className="p-1 text-muted-foreground/40 hover:text-destructive transition-colors"
                  aria-label="Remove file"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
          <div className="absolute right-0 top-0 bottom-4 w-4 bg-gradient-to-l from-muted/80 to-transparent pointer-events-none" />
        </div>
      )}
    </div>
  );
}
