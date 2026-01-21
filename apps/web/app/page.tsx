"use client"
import CardNav from "@/components/react-bits/CardNav";
import { items } from "../lib/items_list";
import LogoCloud from "@/components/logo-cloud";
import FocusButton from "@/components/focus-button";
import HoverArrowButton from "@/components/hover-arrow-button";
import {Card} from "@/components/tiptapui/card";
import { useRouter } from 'next/navigation';

import { LoaderIcon } from "lucide-react"
import { cn } from "@/lib/utils"


const App = () => {
  const router = useRouter();
  const imageLogos = [
    { src: "/brand/logo_white.png", alt: "Company 1", href: "#" },
    { src: "/brand/logo_white.png", alt: "Company 2", href: "#" },
    { src: "/brand/logo_white.png", alt: "Company 3", href: "#" },
  ];

  return (
    <div className="h-screen w-screen bg-amber-700">
      <CardNav
        items={items}
        menuColor="#000"
        buttonBgColor="#111"
        buttonTextColor="#fff"
        ease="power3.out"
      />
      <div
        id="hero-section"
        className="min-h-screen w-full bg-orange-500 relative flex flex-col justify-center"
        style={{
          backgroundImage: "url(/images/tree.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div id="call-to-action" className="flex flex-col gap-6 items-center">
          <h1 className="text-2xl text-white">WRITE CITE LEARN</h1>
          <h2 className="text-7xl text-white font-crimson-text motion-preset-focus motion-duration-1000 text-center">
            Your Academic Copilot
          </h2>
          <p className="text-white text-center">
            Designed to to help students complete Coursework,to focus on
            learning.
          </p>
          <HoverArrowButton
            text="Get Started"
            duration={0.3}
            iconSize={20}
            className="bg-black text-white dark:bg-white dark:text-black"
            onClick={() => router.push("/dashboard")}
          />
        </div>
        
        <div className="w-full place-content-center mt-16">
         	<section className="relative mx-auto max-w-3xl">
    				<h2 className="mb-5 text-center font-medium text-foreground text-xl tracking-tight md:text-3xl">
   					<span className="text-muted-foreground">Trusted by experts.</span>
   					<br />
   					<span className="font-semibold">Used by students from leading universities.</span>
    				</h2>
    				<div className="mask-[linear-gradient(to_right,transparent,black,transparent)] mx-auto my-5 h-px max-w-sm bg-border" />
    				<LogoCloud />
    				<div className="mask-[linear-gradient(to_right,transparent,black,transparent)] mt-5 h-px bg-border" />
         	</section>
        </div>
      </div>
      <div className="w-full mt-16 flex flex-col">
        <div className="flex flex-col gap-5">
          <h2 className="text-4xl">Master anything you learn. <br /> Do your best research and write your citations with ease.</h2>
          <p className="text-white">
            With Orunos, you can easily create citations and references for your research papers,articles, and other academic work. <br /> Our citation generator is designed to help you save time and ensure accuracy in your citations.
          </p>
        </div>
        <div className="grid grid-cols-4 gap-4 mt-16">
          <Card className="h-100"/>
          <Card className="h-100"/>
          <Card className="h-100"/>
          <Card className="h-100"/>
        </div>
        
        <LoaderIcon
          role="status"
          aria-label="Loading"
          className={cn("size-4 animate-spin")}
          // {...props}
        />
        
      </div>
    </div>
  ); 
};

export default App;
