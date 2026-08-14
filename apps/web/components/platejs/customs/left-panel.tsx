"use client";

import { useTocElement, useTocElementState } from "@platejs/toc/react";
import { cn } from "@/lib/utils";
import { PanelHeader } from "./panel-header";

const headingDepthPadding: Record<number, string> = {
	1: "pl-4",
	2: "pl-8",
	3: "pl-12",
	4: "pl-16",
	5: "pl-20",
	6: "pl-20",
};

export function TocPane() {
	const state = useTocElementState();
	const { props } = useTocElement(state);

	return (
		<div className="h-full w-full overflow-hidden">
			<div className="flex h-full min-h-0 flex-col">
				<PanelHeader tabTitle="Table of contents" />

				<nav
					aria-label="Table of contents"
					className="min-h-0 flex-1 overflow-y-auto py-2"
				>
					{state.headingList.length === 0 ? (
						<p className="px-3 py-2 text-sm text-muted-foreground">
							No headings yet
						</p>
					) : (
						<ul className="flex flex-col">
							{state.headingList.map((heading) => (
								<li key={heading.id}>
									<button
										type="button"
										className={cn(
											"block w-full break-words py-1.5 pr-3 text-left text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
											headingDepthPadding[heading.depth] ?? "pl-4",
										)}
										onClick={(e) => props.onClick(e, heading, "smooth")}
									>
										{heading.title}
									</button>
								</li>
							))}
						</ul>
					)}
				</nav>
			</div>
		</div>
	);
}
