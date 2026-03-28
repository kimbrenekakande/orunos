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
					className={`w-full aspect-3/4 rounded-lg bg-muted border border-border overflow-hidden relative ${!template.ready ? "bg-blend-soft-light border border-white " : ""}`}
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
						<div className="absolute inset-0 bg-black/50 flex justify-center items-center rounded-lg">
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
		<div className="sm:my-16 sm:mx-8">
			<div className="text-2xl text-center sm:text-left">Start a new paper</div>

			<Carousel className="my-8 mx-10 relative">
				<div className="absolute left-0 top-0 bottom-0 w-4 bg-linear-to-r from-background/80 to-transparent z-10 pointer-events-none"></div>
				<CarouselPrevious />
				<CarouselContent>
					{templates.map((template) => (
						<CarouselItem
							key={template.name}
							className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 2xl:basis-1/5"
						>
							<TemplateCard template={template} />
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselNext />
				<div className="absolute right-0 top-0 bottom-0 w-4 bg-linear-to-l from-background/80 to-transparent z-10 pointer-events-none"></div>
			</Carousel>
		</div>
	);
}

export default TemplatesGallery;
