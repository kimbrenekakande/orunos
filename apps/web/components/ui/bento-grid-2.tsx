"use client";

import { useState } from "react";
import {
  BentoGridTemplateTwo,
  BentoItem,
} from "@/components/ui/bento-grid-template-two";

const sampleBentoData: BentoItem[] = [
  {
    id: "1",
    title: "Dr. Sarah Chen",
    description:
      "\"Orunos saved me hundreds of hours on my dissertation. The citation generator is incredibly accurate and the literature review feature helped me synthesize findings from 50+ papers in minutes.\"",
    image: "/images/boat.jpg",
    size: "large",
    priority: 1,
    tag: "PhD, Stanford University",
    variant: "highlight",
    accentColor: "#FFFFFF",
    link: "#",
  },
  {
    id: "2",
    title: "Prof. James Mwangi",
    description: "\"As a research professor, I need precision. Orunos delivers that and more - it's become an essential tool for my entire lab.\"",
    variant: "highlight",
    tag: "Research Professor",
    accentColor: "#FFFFFF",
    link: "#",
  },
  {
    id: "3",
    title: "Emily Rodriguez",
    description: "\"The reference manager is a game-changer. I no longer worry about formatting errors in my journal submissions.\"",
    variant: "highlight",
    color: "#CF0F47",
    accentColor: "#FFFFFF",
    link: "#",
  },
  {
    id: "4",
    title: "Dr. Aisha Patel",
    description: "\"Orunos helped me discover relevant studies I would have missed. The AI suggestions are remarkably insightful.\"",
    variant: "highlight",
    size: "wide",
    accentColor: "#FFFFFF",
    link: "#",
  },
  {
    id: "5",
    title: "Michael Thompson",
    description: "\"The collaborative workspace made coordinating with my thesis advisor so much easier. Highly recommend for grad students.\"",
    variant: "highlight",
    accentColor: "#FFFFFF",
    tag: "Masters Student",
    link: "#",
  },
  {
    id: "6",
    title: "Dr. Lisa Nakamura",
    description: "\"Finally, a tool that understands academic writing. The style suggestions are tailored to scholarly work.\"",
    variant: "highlight",
    accentColor: "#FFFFFF",
    link: "#",
  },
  {
    id: "7",
    title: "Robert K. Ochieng",
    description: "\"I've tried many citation tools, but Orunos is by far the most accurate for African academic sources.\"",
    variant: "highlight",
    accentColor: "#FFFFFF",
    color: "#FB5607",
    link: "#",
  },
  {
    id: "8",
    title: "Dr. Fatima Al-Hassan",
    description: "\"From journal articles to conference papers, Orunos handles every citation style perfectly. Essential for any researcher.\"",
    variant: "highlight",
    accentColor: "#FFFFFF",
    link: "#",
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
