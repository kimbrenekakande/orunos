import { GridPattern } from "@/components/tiptapui/grid-pattern";
import { cn } from "@/lib/utils";
import {
	Cpu,
	Fingerprint,
	Trees,
	User,
  ShieldCheck,
  Scale,
} from "lucide-react";
import type React from "react";

type FeatureType = {
	title: string;
	icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
	description: string;
};

export function DisciplinesSection() {
	return (
		<div className="w-full space-y-8 px-8">
			<div className="mx-auto max-w-3xl text-center">
				<h2 className="text-balance font-medium text-2xl md:text-4xl lg:text-5xl">
					Write. Cite. Learn.
				</h2>
				<p className="mt-4 text-balance text-muted-foreground md:text-base">
					Expand your knowledge with domain specific tools across disciplines, designed to empower and enhance your understanding.
				</p>
			</div>

			<div className="overflow-hidden rounded border">
				<div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 md:grid-cols-3">
					{features.map((feature) => (
						<FeatureCard feature={feature} key={feature.title} />
					))}
				</div>
			</div>
		</div>
	);
}

export function FeatureCard({
	feature,
	className,
	...props
}: React.ComponentProps<"div"> & {
	feature: FeatureType;
}) {
	return (
		<div
			className={cn("relative overflow-hidden bg-background p-6", className)}
			{...props}
		>
			<div className="-mt-2 -ml-20 mask-[radial-gradient(farthest-side_at_top,white,transparent)] pointer-events-none absolute top-0 left-1/2 size-full">
				<GridPattern
					className="absolute inset-0 size-full stroke-foreground/20"
					height={40}
					width={40}
					x={5}
				/>
			</div>
			<feature.icon
				aria-hidden
				className="size-12  text-orange-500"
				strokeWidth={1}
			/>
			<h3 className="mt-10 text-lg font-bold">{feature.title}</h3>
			<p className="relative z-20 mt-2 font-light text-muted-foreground text-sm">
				{feature.description}
			</p>
		</div>
	);
}

const features: FeatureType[] = [
	{
		title: "Humanities",
		icon: User,
		description: "Citations for archival materials, manuscripts, oral histories, and foreign language sources that break standard tools.",
	},
	{
		title: "Social Sciences",
		icon: Fingerprint, //Cpu
		description: "Qualitative research support with interview citations, ethnographic notes, and mixed-methods documentation.",
	},
	{
		title: "Natural Sciences",
		icon: Trees,
		description: "Mathematical notation, lab protocols, experimental datasets, and research outputs across physics, chemistry, and biology.",
	},
	{
		title: "Law",
		icon: Scale,
		description: "Legal citations, case law, and legal research support for statutes, and legal scholarship across multiple jurisdictions.",
	},
	{
		title: "Engineering",
		icon: Cpu, //Settings2
		description: "Technical standards, patents, conference proceedings, and specifications in IEEE, ACM, and society formats.",
	},
	{
		title: "Medicine & Health",
		icon: ShieldCheck,
		description: "Clinical trial citations, case studies, and medical literature with precise journal formatting requirements.",
	},
];
