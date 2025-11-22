"use client"

import { FloatingDock } from "@/components/ui/floating-dock";
import { links } from "@/lib/floater";

export default function FloatingDockDemo() {
  return (
    <div className="flex items-center justify-center h-140 w-full">
      <FloatingDock
        mobileClassName="translate-y-20" // only for demo, remove for production
        items={links}
      />
    </div>
  );
}
