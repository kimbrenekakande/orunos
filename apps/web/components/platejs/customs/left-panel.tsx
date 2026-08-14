"use client";

import { useTocElement, useTocElementState } from "@platejs/toc/react";

export function TocPane() {
	const state = useTocElementState();
	const { props } = useTocElement(state);

	return (
		<nav aria-label="Table of contents">
			<p className="mb-3 font-semibold">Contents</p>

			<ul className="space-y-1">
				{state.headingList.map((heading) => (
					<li key={heading.id}>
						<button
							type="button"
							className="w-full text-left text-sm hover:underline"
							style={{
								paddingLeft: `${(heading.depth - 1) * 12}px`,
							}}
							onClick={(e) => props.onClick(e, heading, "smooth")}
						>
							{heading.title}
						</button>
					</li>
				))}
			</ul>
		</nav>
	);
}
