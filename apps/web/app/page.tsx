import { cn } from "@udecode/cn";
import Image from "next/image";
import Link from "next/link";

import CardNav from "@/components/react-bits/CardNav";
import LogoCloud from "@/components/logo-cloud";
import HoverArrowButton from "@/components/hover-arrow-button";
import PrecisionCard from "@/components/ruixen/precision-card";
import { items } from "../lib/items_list";
import { features } from "../lib/features";
import { flipper_words } from "@/lib/data/words";
import { FlipWords } from "@/components/ui/flip-words";
import { ElitePlanCard } from "@/components/ruixen/elite-plan-card";
import { BentoGridTwo } from "@/components/ui/bento-grid-2";
import { DisciplinesSection } from "@/components/disciplines-section";
import { AnimatedShinyText } from "@/components/tiptapui/animated-shiny-text";
import { Footer } from "@/components/footer";

const App = () => {
	return (
		<div className="w-full flex flex-col gap-24">
			<CardNav
				items={items}
				menuColor="#000"
				buttonBgColor="#111"
				buttonTextColor="#fff"
				ease="power3.out"
			/>

			<div
				id="hero-section"
				className="min-h-screen w-full bg-orange-500 relative flex flex-col justify-between"
				style={{
					backgroundImage: "url(/images/tree.jpg)",
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
			>
				<div className="h-[25%]"></div>
				<div
					id="call-to-action"
					className="flex flex-col gap-6 items-center mt-[20%]"
				>
					<div
						className={cn(
							"group rounded border border-black/5 bg-neutral-100 text-base text-white transition-all ease-out hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800",
						)}
					>
						<AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400 border border-gray-700 dark:border-gray-700">
							<Image
								src="/yc_logo.svg"
								alt="Logo"
								width={20}
								height={20}
								className="mr-2"
							/>
							<span className="text-sm sm:text-base">
								Not Backed by Y Combinator
							</span>
						</AnimatedShinyText>
					</div>
					<div className="flex flex-col items-center justify-center text-center">
						<h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-header text-white !leading-[1.05] !tracking-[-0.02em]">
							{" "}
							Your Academic Copilot{" "}
						</h1>
					</div>
					<p className="sm:max-w-[50%] text-white text-center text-base sm:text-lg mx-2">
						Built for graduate researchers, PhD candidates, and scholars who
						need precision. Generate citations across 10,000+ sources,
						synthesize literature, and write academic documents with rigor.
					</p>
					<Link href="/dashboard">
						<HoverArrowButton
							text="Start Writing"
							duration={0.3}
							iconSize={20}
							className="bg-white text-black"
						/>
					</Link>
				</div>

				<div className=" mt-16 items-end">
					<section className="relative mx-auto max-w-3xl">
						<h2 className="mb-5 text-center font-medium text-foreground text-xl tracking-tight">
							<span className="text-muted-foreground">
								Trusted by scholars and researchers from leading universities
								around the world.
							</span>
							<br />
						</h2>
						<div className="h-30">
							<LogoCloud />
						</div>
					</section>
				</div>
			</div>

			<div id="feature-section" className="flex flex-col mx-2 sm:mx-8">
				<div className="flex flex-col gap-5">
					<h2 className="text-2xl md:text-4xl lg:text-5xl font-header">
						Create your <FlipWords words={flipper_words} /> <br /> easily with
						the best research and citations.
					</h2>
					<p className="text-muted-foreground text-base">
						With Orunos, you can easily create citations and references for your
						research papers, articles, and other academic work. <br /> Our
						citation generator is designed to help you save time and ensure
						accuracy in your citations.
					</p>
				</div>
				<div className="grid grid-rows-4 sm:grid-rows-2 sm:grid-cols-2 lg:grid-rows-1 lg:grid-cols-4 place-items-center gap-2 py-16">
					{features.map((ft) => (
						<ElitePlanCard
							key={ft.id}
							imageUrl={ft.imageUrl}
							title={ft.title}
							subtitle=""
							description={ft.description}
							url={ft.url}
							className="w-full"
						/>
					))}
				</div>
			</div>

			<DisciplinesSection />

			<div className="h-full flex items-center sm:mx-8">
				<PrecisionCard
					leftSubtitle="Why Academic Rigor Matters"
					leftTitle="Don't Replace Learning, Accelerate It"
					leftDescription="Academic writing demands precision, proper citations, and scholarly integrity. Orunos ensures every document meets the highest standards — from literature synthesis to properly formatted references."
					tags={[
						"Sciences",
						"Law",
						"Engineering",
						"Social Sciences",
						"Humanities",
					]}
					leftButton="Get Started"
					rightTitle="Scholarly Excellence, Simplified."
					rightDescription="Focus on your research while Orunos handles citations, references, and document structure — all powered by AI trained on academic standards."
					rightItems={[
						"10,000+ Sources",
						"Citation Accuracy",
						"Plagiarism-Free",
						"Export Ready",
					]}
					certificationText="Trusted by Researchers Worldwide"
					rightButton="Start Writing →"
				/>
			</div>

			<BentoGridTwo />

			<Footer />
		</div>
	);
};

export default App;
