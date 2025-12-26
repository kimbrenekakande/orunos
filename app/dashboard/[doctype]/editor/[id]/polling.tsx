"use client";

import { Toaster } from "sonner";
import { PlateEditor } from "@/components/editor/plate-editor";
import useSWR from "swr";
import baseUrl from "@/lib/base-url";

export function DocPoller({ id } : {id : string}) {
  const fetcher = (url : string ) => fetch(url).then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    `${baseUrl}/api/papers/fetch?id=${id}`, fetcher,
    { refreshInterval: (data) => {
      return (!data || data.status === "GENERATING")? 2000 : 0;
    } }
  )

  if (error) return <div>Error Fetching Document</div>;

  if (isLoading || (data && data.status === "GENERATING")) {
    return (
      <div className="h-full w-full flex flex-col justify-center items-center">
        <h1>Generating in Progress</h1>
      </div>
    )
  }

  const Document = {
    //aligns with Mdprops schema in plate-editor
    id: data.id,
    data: data.answer,
  };

  return (
    <div className="h-full w-full">
      <PlateEditor md={Document} />
      <Toaster />
    </div>
  );
}
