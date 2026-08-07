"use client";

import { BookOpen, Sparkles, Shield, Users } from "lucide-react";

const values = [
	{
		icon: Sparkles,
		title: "Precision",
		description:
			"Academic work demands accuracy. Every citation, every source, every sentence matters. We build tools that respect that standard.",
	},
	{
		icon: BookOpen,
		title: "Learning first",
		description:
			"Technology should accelerate your research, not replace it. We design Orunos to enhance your thinking, not do it for you.",
	},
	{
		icon: Shield,
		title: "Trust",
		description:
			"Your research is yours. We never train on your data, never share your work, and never compromise on privacy.",
	},
	{
		icon: Users,
		title: "Community",
		description:
			"We're built for scholars, by scholars. Every feature comes from listening to researchers and understanding their workflow.",
	},
];

export default function AboutPage() {
	return (
		<div className="flex-1 py-16 md:py-24">
			<div className="container px-4 md:px-6">
				<div className="mx-auto max-w-3xl">
					{/* Hero */}
					<div className="mb-20">
						<h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6 font-header">
							Your academic copilot
						</h1>
						<p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
							Orunos was built for graduate researchers, PhD candidates, and
							scholars who demand precision. We generate citations across
							10,000+ sources, synthesize literature, and produce rigorous
							academic documents so you can focus on your ideas, not the
							formatting.
						</p>
					</div>

					{/* Mission */}
					<div className="mb-20">
						<h2 className="text-sm font-semibold text-orange-500 uppercase tracking-wider mb-4">
							Our mission
						</h2>
						<p className="text-xl font-semibold text-foreground leading-relaxed font-header">
							Accelerate your academic journey without replacing the learning
							process. Technology should empower your research, giving you more
							time to focus on what truly matters: your ideas.
						</p>
					</div>

					{/* Letter */}
					<div className="border-t pt-16 mb-20">
						<p className="text-sm font-semibold text-orange-500 uppercase tracking-wider mb-6">
							A note from the team
						</p>
						<div className="text-muted-foreground leading-relaxed space-y-4">
							<p>
								We built Orunos because we understand the grind. The late nights
								chasing citations. The formatting that takes hours. The anxiety
								of wondering whether your references are right.
							</p>
							<p>
								We wanted something different. A tool that treats academic work
								with the seriousness it deserves. One that doesn&apos;t cut
								corners or generate sloppy output. One that researchers can
								actually trust.
							</p>
							<p>
								Whether you&apos;re drafting your first paper or completing a
								dissertation, Orunos is here to help you write with confidence.
							</p>
							<p className="font-medium text-foreground">The Orunos Team</p>
						</div>
					</div>

					{/* Values */}
					<div className="border-t pt-16">
						<h2 className="text-sm font-semibold text-orange-500 uppercase tracking-wider mb-10">
							What we stand for
						</h2>
						<div className="grid gap-8 sm:grid-cols-2">
							{values.map((v) => (
								<div key={v.title}>
									<div className="flex items-center gap-3 mb-3">
										<div className="flex items-center justify-center size-8 rounded bg-black text-white dark:bg-white dark:text-black shrink-0">
											<v.icon className="size-4" />
										</div>
										<h3 className="font-semibold text-foreground">{v.title}</h3>
									</div>
									<p className="text-sm text-muted-foreground leading-relaxed">
										{v.description}
									</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
