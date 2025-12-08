'use client'

import { Textarea } from "@/components/ui/textarea"
import {Button} from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field"

import { startCreation } from "@/lib/actions/creator";

import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, useForm, Controller } from "react-hook-form";
import { toast } from "sonner";

const formSchema = z.object({
  doctype : z
    .string(),

  qn : z
    .string()
    .min(10, "Your questions must me more than 10 characters")
})


export function Qner({ doctype }: { doctype: string }) {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver : zodResolver(formSchema),
    defaultValues : {
      doctype : doctype,
      qn : ''
    }
  })
  
  return (
    <>
      <h1 className="mb-5">Start {doctype}</h1>
      <form action={startCreation} className="w-[70%] flex flex-col gap-4 items-center">
          <FieldGroup >
            <fieldset className="flex flex-col items-center gap-5">
              <input type="text" value={doctype} name="doctype" id="doctype" className="hidden"  readOnly/>
              <Field>
                <Textarea id="qns" name="qns" placeholder="Type your questions here." className="h-[200px]"/>
              </Field> 
              <Button type="submit" className="w-40 cursor-pointer">Submit</Button>
            </fieldset>
          </FieldGroup>
      </form>
    </>
  )
}