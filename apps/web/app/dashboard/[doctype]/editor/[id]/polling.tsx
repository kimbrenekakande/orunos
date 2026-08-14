"use client";

import { Toaster } from "sonner";
import { PlateEditor } from "@/components/editor/plate-editor";
import useSWR from "swr";
import baseUrl from "@/lib/base-urls";
import { LoaderIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThinkingOrb } from "thinking-orbs";

type props = {
	id: string;
	from: string;
};

export function DocPoller({ id, from }: props) {
	const fetcher = (url: string) => fetch(url).then((res) => res.json());

	//Polling using nextjs swr
	const { data, error, isLoading } = useSWR(
		`${baseUrl}/api/documents/${id}`,
		fetcher,
		{
			refreshInterval: (data) => {
				return !data || data.status === "GENERATING" ? 5000 : 0;
			},
			revalidateOnFocus: true,
			revalidateIfStale: true,
			revalidateOnMount: true,
		},
	);

	if (error) return <div>Error Fetching Document</div>;

	if (isLoading || data?.status === "GENERATING") {
		if (from === "form") {
			return (
				<div className="h-screen w-full flex flex-col justify-center items-center gap-4">
					<ThinkingOrb state="working" size={64} speed={3.0} theme="auto" />
				</div>
			);
		} else {
			return (
				<div className="h-screen w-full flex flex-col justify-center items-center">
					<LoaderIcon
						role="status"
						aria-label="Loading"
						className={cn("size-12 animate-spin text-orange-500")}
						// {...props}
					/>
				</div>
			);
		}
	}

	const Document = {
		//aligns with Mdprops schema in plate-editor
		id: data.id,
		title: data.title,
		content: data.answer,
	};

	return (
		<div className="h-screen w-full scrollbar-thumb-transparent">
			<PlateEditor key={`${data.id}-${data.updatedAt}`} md={Document} />
			<Toaster />
		</div>
	);
}
