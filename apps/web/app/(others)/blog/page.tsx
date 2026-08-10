"use client";

import { Newspaper } from "lucide-react";

export default function BlogPage() {
	return (
		<div className="flex-1 flex items-center justify-center py-16 md:py-24">
			<div className="container px-4 md:px-6">
				<div className="mx-auto max-w-lg text-center">
					<div className="inline-flex items-center justify-center size-16 rounded-full bg-orange-500/10 mb-10">
						<Newspaper className="size-7 text-orange-500" />
					</div>

					<h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4 font-header">
						Blog
					</h1>
					<p className="text-lg text-muted-foreground leading-relaxed mb-16">
						Insights, guides, and stories from the Orunos team on academic
						research, writing, and the future of AI-powered scholarship.
					</p>

					<div className="border-t pt-12">
						<h2 className="text-xl font-semibold text-foreground mb-3">
							No posts yet
						</h2>
						<p className="text-muted-foreground leading-relaxed">
							We&apos;re working on our first articles. Check back soon for
							research tips, citation guides, and product updates.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
