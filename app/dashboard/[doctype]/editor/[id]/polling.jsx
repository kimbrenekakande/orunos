"use client";
import { Toaster } from "sonner";
import { PlateEditor } from "@/components/editor/plate-editor";
import baseUrl from "@/lib/base-url";
import { useState, useEffect } from "react";

export function DocPoller({id}) {
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(true)

  async function fetcher(){
    fetch(`${baseUrl}/api/papers/fetch?id=${id}`);
    const paper = await response.json();
    const answer = await`${paper.answer}`;
  }
  
  // const response = await fetch(`${baseUrl}/api/papers/fetch?id=${id}`);
  // 

	const obj = {
		//aligns with Mdprops schema in plate-editor
		id: id,
		data: answer,
	};

	return (
		<div className="h-full w-full">
			<PlateEditor md={obj} />
			<Toaster />
		</div>
	);
}
