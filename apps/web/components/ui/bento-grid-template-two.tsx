"use client";

import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

export type BentoItem = {
  id: string;
  title: string;
  description?: string;
  image?: string;
  link?: string;
  size?: "small" | "medium" | "large" | "wide" | "tall";
  color?: string; // background for solid variants
  accentColor?: string; // text color override
  variant?: "default" | "highlight" | "glass" | "solid";
  tag?: string;
  priority?: number;
};

export type BentoGridProps = {
  items: BentoItem[];
  className?: string;
  animate?: boolean;
  gap?: number;
};

export function BentoGridTemplateTwo({
  items,
  className,
  animate = true,
  gap = 4,
}: BentoGridProps) {
  const cols = 4;
  const leftover = items.length % cols;

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-4 auto-rows-[minmax(180px,auto)]",
        className
      )}
      style={{ gap: `${gap * 0.25}rem` }}
    >
      {items.map((item, i) => {
        const isLastSingle = leftover === 1 && i === items.length - 1;
        return (
          <motion.div
            key={item.id}
            initial={animate ? { opacity: 0, y: 20 } : undefined}
            animate={animate ? { opacity: 1, y: 0 } : undefined}
            transition={{
              duration: 0.4,
              delay: animate ? 0.1 + i * 0.1 : 0,
              ease: [0.21, 0.58, 0.36, 1],
            }}
            className={cn(
              "col-span-1",
              item.size === "large" && "md:col-span-2 md:row-span-2",
              item.size === "wide" && "md:col-span-2",
              item.size === "tall" &&
                item.variant !== "glass" &&
                "md:row-span-2",
              item.priority === 1 && "md:col-span-2 md:row-span-2",
              isLastSingle && "md:col-span-4"
            )}
          >
            <BentoGridItem item={item} />
          </motion.div>
        );
      })}
    </div>
  );
}

function BentoGridItem({ item }: { item: BentoItem }) {
  const {
    title,
    description,
    image,
    link,
    color,
    accentColor,
    variant = "default",
    tag,
  } = item;

  const hasImage = Boolean(image);

  // Base
  const classes = [
    "group relative overflow-hidden rounded transition-all duration-300 h-full",
    // "hover:shadow-xl hover:-translate-y-1 text-black",
  ];

  // Variant
  if (variant === "default") {
    if (hasImage) {
      classes.push("bg-transparent", "text-white");
    } else {
      classes.push(
        "bg-white dark:bg-gray-800",
        "text-gray-900 dark:text-gray-100",
        "hover:bg-gray-100 dark:hover:bg-gray-700"
      );
    }
  } else if (variant === "highlight") {
    classes.push(
      "dark:bg-transparent border border-gray",
      "text-white",
    );
  } else if (variant === "glass") {
    classes.push(
      "bg-white/10 dark:bg-black/10 backdrop-blur-sm",
      "border border-gray-200 dark:border-gray-700",
      "text-gray-900 dark:text-gray-100",
      "hover:bg-white/20 dark:hover:bg-black/20"
    );
  } else if (variant === "solid") {
    classes.push("text-white");
  }

  return (
    <div
      className={cn(...classes)}
      style={
        variant === "solid" && color ? { backgroundColor: color } : undefined
      }
    >
      {image && (
        <div className="absolute inset-0 z-0">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 dark:opacity-60"
          />
          <div className="absolute inset-0 bg-black/60 dark:bg-black/70" />
        </div>
      )}

      <div className="relative z-10 h-full p-6 flex flex-col justify-between">
        <div>
          {tag && (
            <span
              className={cn(
                "inline-block rounded-md px-3 py-1 text-xs font-semibold mb-3",
                variant === "default"
                  ? hasImage
                    ? "bg-gray-800/60 text-white"
                    : "bg-indigo-100 text-indigo-700"
                  : "bg-white/30 text-white"
              )}
              style={accentColor ? { color: accentColor} : undefined}
            >
              {tag}
            </span>
          )}

          <h3
            className="text-xl font-semibold tracking-tight mb-2"
            style={accentColor ? { color: accentColor } : undefined}
          >
            {title}
          </h3>

          {description && (
            <p
              className="text-sm leading-relaxed text-muted-foreground"
              // style={accentColor ? { color: accentColor } : undefined}
            >
              {description}
            </p>
          )}
        </div>

        {link && (
          <Link
            href={link}
            className="mt-4 inline-flex items-center text-sm font-medium hover:bg-transparent hover:text-gray-200 cursor-pointer  text-orange-500 "
            // style={accentColor ? { color: accentColor } : undefined}
          >
            <span className="">Learn more</span>
            <ArrowUpRight className="ml-1 h-4 w-4 " />
          </Link>
        )}
      </div>
    </div>
  );
}

// hover:bg-transparent hover:text-gray-200 cursor-pointer  text-orange-500