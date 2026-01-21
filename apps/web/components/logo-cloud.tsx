import { InfiniteSlider } from "@/components/tiptapui/infinite-slider";

export default function LogoCloud() {
	return (
		<div className="mask-[linear-gradient(to_right,transparent,black,transparent)] overflow-hidden py-4">
			<InfiniteSlider gap={42} reverse speed={80} speedOnHover={25}>
				{logos.map((logo) => (
					<img
						alt={logo.alt}
						className="pointer-events-none h-4 select-none md:h-5 dark:brightness-0 dark:invert"
						height="auto"
						key={`logo-${logo.alt}`}
						loading="lazy"
						src={logo.src}
						width="auto"
					/>
				))}
			</InfiniteSlider>
		</div>
	);
}

const logos = [
	{
		src: "brand/logo_black.png",
		alt: "Nvidia Logo",
	},
	{
		src: "brand/logo_black.png",
		alt: "Supabase Logo",
	},
	{
		src: "brand/logo_black.png",
		alt: "OpenAI Logo",
	},
	{
		src: "brand/logo_black.png",
		alt: "Turso Logo",
	},
	{
		src: "brand/logo_black.png",
		alt: "Vercel Logo",
	},
	{
		src: "brand/logo_black.png",
		alt: "GitHub Logo",
	},
	{
		src: "brand/logo_black.png",
		alt: "Claude AI Logo",
	},
	{
		src: "brand/logo_black.png",
		alt: "Clerk Logo",
	},
];
