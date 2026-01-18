"use client";

import { Toaster } from "sonner";
import { PlateEditor } from "@/components/editor/plate-editor";
import useSWR from "swr";
import baseUrl from "@/lib/base-url";
import Image from "next/image";

type props = {
  id    : string,
  from  : string,
}

export function DocPoller({ id, from } : props) {

  const fetcher = (url : string ) => fetch(url).then((res) => res.json());
  
  //Polling using nextjs swr
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
        <div className="h-full w-full flex flex-col justify-center items-center gap-4">
          <Image 
            src = "/images/robot.png"
            height={100}
            width={300}
            alt="A robot"
          />
          <h1 className="text-orange-600">Generating in Progress</h1>
        </div>
      )
    } else {
      return (
        <div className="h-full w-full flex flex-col justify-center items-center">
          <Image 
            src = "/images/growth.png"
            height={400}
            width={800}
            alt="girl sitting with an open book"
          />
          <h1 className="text-orange-600">Opening Document</h1>
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
