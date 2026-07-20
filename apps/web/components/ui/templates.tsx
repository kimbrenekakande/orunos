"use client";

import {
	Carousel,
	CarouselContent,
	CarouselPrevious,
	CarouselNext,
	CarouselItem,
} from "@/components/ui/carousel";
import { templates } from "@/lib/templates";
import Link from "next/link";
import { LockIcon, LoaderIcon } from "lucide-react"
import { cn } from "@/lib/utils";
import { useState } from "react";

function TemplateCard({ template }: { template: { name: string; type: string; image: string; ready: boolean } }) {
	const [isLoading, setIsLoading] = useState(false);

	function handleClick() {
		setIsLoading(true);
	}

	return (
		<div className="p-4 relative">
			<Link
				href={`dashboard/${template.type}`}
				className={`cursor-pointer ${!template.ready ? "pointer-events-none" : ""}`}
				onClick={() => handleClick()}
			>
				<div
					className={`w-full aspect-3/4 rounded bg-muted border border-border overflow-hidden relative ${!template.ready ? "bg-blend-soft-light border border-white " : ""}`}
					style={{
						backgroundImage: `url(${template.image})`,
						backgroundSize: "cover",
						backgroundPosition: "center",
					}}
				>
					{!template.ready && (
						<div className="h-full w-full flex justify-center items-center">
							<LockIcon height={30} width={30} />
						</div>
					)}
					{isLoading && (
						<div className="absolute inset-0 bg-black/50 flex justify-center items-center rounded">
							<LoaderIcon
								role="status"
								aria-label="Loading"
								className={cn("size-12 animate-spin text-orange-500")}
							/>
						</div>
					)}
				</div>
			</Link>
			<div className="mt-3 text-center">
				<div className="text-sm text-muted-foreground">
					{template.type}
				</div>
			</div>
		</div>
	);
}

function TemplatesGallery() {
	return (
		<div className="relative">
			<div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-background to-transparent" />
			<div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-background to-transparent" />
			<Carousel className="relative">
				<CarouselPrevious className="left-2 z-20" />
				<CarouselNext className="right-2 z-20" />
				<CarouselContent className="px-10">
					{templates.map((template) => (
						<CarouselItem
							key={template.name}
							className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 2xl:basis-1/5"
						>
							<TemplateCard template={template} />
						</CarouselItem>
					))}
				</CarouselContent>
			</Carousel>
		</div>
	);
}

export default TemplatesGallery;
