import { InfiniteSlider } from "@/components/tiptapui/infinite-slider";
import Image from "next/image";

export default function LogoCloud() {
	return (
		<div className="mask-[linear-gradient(to_right,transparent,black,transparent)] overflow-hidden py-4">
			<InfiniteSlider gap={42} speed={40} speedOnHover={25}> 
				{logos.map((logo) => (
					<img
						alt={logo.alt}
						className="pointer-events-none h-8 select-none md:h-10 " //dark:brightness-0, dark:invert
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
		src: "/universities/uni_3.png",
		alt: "Nvidia Logo",
	},
	{
		src: "/universities/uni_6.png",
		alt: "Supabase Logo",
	},
	{
		src: "/universities/uni_12.png",
		alt: "OpenAI Logo",
	},
	{
		src: "/universities/uni_6.png",
		alt: "GitHub Logo",
	},
	{
		src: "/universities/uni_8.png",
		alt: "Clerk Logo",
  },
  {
		src: "/universities/uni_10.png",
		alt: "Clerkz Logo",
  },
  {
		src: "/universities/uni_11.png",
		alt: "Clerkx Logo",
  },
  {
		src: "/universities/uni_12.png",
		alt: "Clerky Logo",
	},
];
