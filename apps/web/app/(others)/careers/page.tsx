"use client";

import { Mail } from "lucide-react";
import Link from "next/link";

export default function CareersPage() {
	return (
		<div className="flex-1 flex items-center justify-center py-16 md:py-24">
			<div className="container px-4 md:px-6">
				<div className="mx-auto max-w-lg text-center">
					{/* Icon */}
					<div className="inline-flex items-center justify-center size-16 rounded-full bg-orange-500/10 mb-10">
						<Mail className="size-7 text-orange-500" />
					</div>

					{/* Heading */}
					<h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4 font-header">
						Join the team
					</h1>
					<p className="text-lg text-muted-foreground leading-relaxed mb-16">
						We&apos;re building tools that help researchers do their best work.
						If that sounds like something you want to be part of, we&apos;d love
						to hear from you.
					</p>

					{/* Open positions — empty state */}
					<div className="border-t pt-12">
						<h2 className="text-xl font-semibold text-foreground mb-3">
							No open positions right now
						</h2>
						<p className="text-muted-foreground leading-relaxed mb-10">
							We don&apos;t have any roles open at the moment, but we&apos;re
							always excited to connect with people who share our mission. Send
							us your CV and tell us what you&apos;d bring to Orunos.
						</p>

						<Link
							href="/contact"
							className="inline-flex items-center gap-2 rounded px-6 py-3 text-sm font-medium bg-orange-500 text-white hover:bg-orange-600 transition-colors"
						>
							<Mail className="size-4" />
							Get in touch
						</Link>
					</div>

					<p className="mt-16 text-xs text-muted-foreground">
						Follow us for updates. New roles announced here.
					</p>
				</div>
			</div>
		</div>
	);
}
