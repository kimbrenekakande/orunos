"use client";

import { Toaster } from "sonner";
import { PlateEditor } from "@/components/editor/plate-editor";
import useSWR from "swr";
import baseUrl from "@/lib/base-url";

type props = {
  id    : string,
  from  : string,
}

export function DocPoller({ id, from } : props) {

  const fetcher = (url : string ) => fetch(url).then((res) => res.json());
  console.log(`this shit is from ${from} client side mfk`)
  const { data, error, isLoading } = useSWR(
    `${baseUrl}/api/papers/fetch?id=${id}`, fetcher,
    { refreshInterval: (data) => {
      return (!data || data.status === "GENERATING")? 2000 : 0;
    } }
  )

  if (error) return <div>Error Fetching Document</div>;
  
  if (isLoading || data.status === "GENERATING"){
    if (from === "form"){
      return (
        <div className="h-full w-full flex flex-col justify-center items-center">
          <h1>Generating in Progress</h1>
        </div>
      )
    } else {
      return (
        <div className="h-full w-full flex flex-col justify-center items-center">
          <h1>Opening Document</h1>
        </div>
      )
    }
  }

  const Document = {
    //aligns with Mdprops schema in plate-editor
    id: data.id,
    title: data.title,
    content: data.answer,
  };

  return (
    <div className="h-full w-full">
      <PlateEditor md={Document} />
      <Toaster />
    </div>
  );
}
