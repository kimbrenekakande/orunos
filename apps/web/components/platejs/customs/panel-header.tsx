export function PanelHeader({ tabTitle }: { tabTitle: string }) {
	return (
		<header className="border-b h-[61px] w-full">
			<div className="flex w-full ">
				<p className="pt-6 pl-2">{tabTitle}</p>
			</div>
		</header>
	);
}
