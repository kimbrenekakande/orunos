"use client";

import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Link from "next/link";

const socialLinks = [
	{ icon: Home, href: "#" },
	{ icon: Home, href: "#" },
	{ icon: Home, href: "#" },
	{ icon: Home, href: "#" },
];

const footerLinks = [
	{
		title: "Company",
		links: [
			{ href: "/about", label: "About" },
			{ href: "/blog", label: "Blog" },
			{ href: "/careers", label: "Careers" },
			{ href: "/pricing", label: "Pricing" },
		],
	},
	{
		title: "Support",
		links: [
			{ href: "/contact", label: "Contact Us" },
			{ href: "/login", label: "Log In" },
			{ href: "/signup", label: "Sign Up" },
		],
	},
	{
		title: "Legal",
		links: [
			{ href: "/terms", label: "Terms & Conditions" },
			{ href: "/policy", label: "Privacy Policy" },
		],
	},
];

export function Footer() {
	return (
		<footer className="border-t">
			<div className="">
				{/* Grid container with headings and links */}
				<div className="flex justify-between gap-8 py-8 mx-8">
					{footerLinks.map((item, idx) => (
						<div
							key={item.title}
							className={idx === footerLinks.length - 1 ? "text-right" : ""}
						>
							<h3 className="mb-4 text-lg font-bold font-header">
								{item.title}
							</h3>
							<ul className="space-y-2 text-muted-foreground text-sm">
								{item.links.map((link) => (
									<li key={link.label}>
										<Link className="hover:text-foreground" href={link.href}>
											{link.label}
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
				<div className="h-px bg-border" />
				{/* Social Buttons + App Links */}
				<div className="flex flex-wrap items-center justify-between gap-4 py-5 mx-8">
					<div className="flex items-center gap-2 hidden">
						{socialLinks.map(({ icon: Icon, href }, index) => (
							<Button
								asChild
								key={`social-${href}-${index}`}
								size="icon-sm"
								variant="outline"
							>
								<Link href={href}>
									<Icon />
								</Link>
							</Button>
						))}
					</div>

					<div className="flex gap-4 bg-red">
						<Button asChild className="h-11">
							<Link href="#">
								<PlayStoreIcon className="size-5" />
								<div className="flex flex-col items-start justify-center pr-2 text-left">
									<span className="font-light text-[10px] leading-none tracking-tighter">
										COMING SOON TO
									</span>
									<p className="font-bold text-base leading-none">
										Google Play
									</p>
								</div>
							</Link>
						</Button>

						{/*hidden*/}
						<Button asChild className="h-11 hidden">
							<Link href="#">
								<AppleIcon className="size-5" />
								<div className="flex flex-col items-start justify-center pr-2 text-left">
									<span className="text-[10px] leading-none tracking-tighter">
										Download on the
									</span>
									<p className="font-bold text-base leading-none">App Store</p>
								</div>
							</Link>
						</Button>
					</div>
				</div>
				<div className="h-px bg-border" />
				<div className="py-4 text-center text-muted-foreground text-xs">
					<p>&copy; {new Date().getFullYear()} Orunos, All rights reserved</p>
				</div>
			</div>
		</footer>
	);
}

function PlayStoreIcon({
	fill = "currentColor",
	...props
}: Omit<React.ComponentProps<"svg">, "ref">) {
	return (
		<svg fill={fill} viewBox="0 0 24 24" {...props}>
			<path d="m21.762,9.942L4.67.378c-.721-.466-1.635-.504-2.393-.099-.768.411-1.246,1.208-1.246,2.08v19.282c0,.872.477,1.668,1.246,2.079.755.404,1.668.37,2.393-.098l17.092-9.564c.756-.423,1.207-1.192,1.207-2.058s-.451-1.635-1.207-2.058Zm-5.746-1.413l-2.36,2.36L5.302,2.534l10.714,5.995ZM2.604,21.906V2.094l9.941,9.906L2.604,21.906Zm2.698-.439l8.355-8.355,2.36,2.36-10.714,5.995Zm15.692-8.78l-3.552,1.987-2.674-2.674,2.674-2.674,3.552,1.987c.363.203.402.548.402.686s-.039.483-.402.686Z" />
		</svg>
	);
}

function AppleIcon({
	fill = "currentColor",
	...props
}: Omit<React.ComponentProps<"svg">, "ref">) {
	return (
		<svg fill={fill} viewBox="0 0 24 24" {...props}>
			<g id="_Group_2">
				<g id="_Group_3">
					<path
						d="M18.546,12.763c0.024-1.87,1.004-3.597,2.597-4.576c-1.009-1.442-2.64-2.323-4.399-2.378    c-1.851-0.194-3.645,1.107-4.588,1.107c-0.961,0-2.413-1.088-3.977-1.056C6.122,5.927,4.25,7.068,3.249,8.867    c-2.131,3.69-0.542,9.114,1.5,12.097c1.022,1.461,2.215,3.092,3.778,3.035c1.529-0.063,2.1-0.975,3.945-0.975    c1.828,0,2.364,0.975,3.958,0.938c1.64-0.027,2.674-1.467,3.66-2.942c0.734-1.041,1.299-2.191,1.673-3.408    C19.815,16.788,18.548,14.879,18.546,12.763z"
						id="_Path_"
					/>
					<path
						d="M15.535,3.847C16.429,2.773,16.87,1.393,16.763,0c-1.366,0.144-2.629,0.797-3.535,1.829    c-0.895,1.019-1.349,2.351-1.261,3.705C13.352,5.548,14.667,4.926,15.535,3.847z"
						id="_Path_2"
					/>
				</g>
			</g>
		</svg>
	);
}
