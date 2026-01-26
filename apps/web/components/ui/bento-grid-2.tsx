"use client";

import { useState } from "react";
import {
  BentoGridTemplateTwo,
  BentoItem,
} from "@/components/ui/bento-grid-template-two";

const sampleBentoData: BentoItem[] = [
  {
    id: "1",
    title: "Visual Design System",
    description:
      "A beautiful and comprehensive design system built for modern applications.",
    image: "/images/boat.jpg",
    size: "large",
    priority: 1,
    tag: "Featured",
    variant: "glass", //Semi‑transparent frosted panel with content overlay
    accentColor: "#FFFFFF",
    link: "#design",
  },
  {
    id: "2",
    title: "AI Studio",
    description: "Create, train, and deploy AI models with intuitive tools.",
    variant: "highlight", // Vibrant accent color with crisp white text
    tag: "New",
    accentColor: "#FFFFFF",
    link: "#ai",
  },
  {
    id: "3",
    title: "Analytics",
    description: "Real-time insights and beautiful data visualizations.",
    variant: "highlight", // Fully colored background with custom text color
    color: "#CF0F47",
    accentColor: "#FFFFFF",
    link: "#analytics",
  },
  {
    id: "4",
    title: "Cloud Platform",
    description: "Scalable infrastructure for modern applications.",
    // image: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg",
    variant: "highlight", // Clean card with light/dark adaptive backgrounds
    size: "wide",
    accentColor: "#FFFFFF",
    link: "#cloud",
  },
  {
    id: "5",
    title: "Security Suite",
    description: "Enterprise-grade security for your applications.",
    variant: "highlight",
    accentColor: "#FFFFFF",
    tag: "Premium",
    link: "#security",
  },
  {
    id: "6",
    title: "Developer Hub",
    description: "Comprehensive documentation and resources.",
    // image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg",
    variant: "highlight",
    accentColor: "#FFFFFF",
    link: "#docs",
  },
  {
    id: "7",
    title: "Collaboration",
    description: "Tools for teams to work better together.",
    variant: "highlight",
    accentColor: "#FFFFFF",
    color: "#FB5607",
    link: "#collaboration",
  },
  {
    id: "8",
    title: "Community",
    description: "Join thousands of developers building amazing things.",
    // image: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg",
    variant: "highlight",
    accentColor: "#FFFFFF",
    link: "#community",
  },
];

export function BentoGridTwo() {
  const [items] = useState<BentoItem[]>(sampleBentoData);

  return (
    <div className="mx-2 sm:mx-8">
      <BentoGridTemplateTwo items={items} gap={6} animate={true} />
    </div>
  );
}
