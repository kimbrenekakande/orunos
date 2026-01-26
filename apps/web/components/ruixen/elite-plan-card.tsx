"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ElitePlanCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
  title: string;
  subtitle: string;
  description: string;
  highlights?: string[]; // new section for extra text
  url?:string;
}

export const ElitePlanCard = React.forwardRef<
  HTMLDivElement,
  ElitePlanCardProps
>(
  (
    {
      className,
      imageUrl,
      title,
      subtitle,
      description,
      highlights = [],
      url,
    },
    ref
  ) => {
    return (
      <motion.div
        ref={ref}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 250, damping: 20 }}
        className={cn(
          "relative w-full overflow-hidden rounded hover:shadow-xl bg-black",
          className,
        )}
      >
        {/* Top image with parallax */}
        <motion.div
          className="relative h-64 w-full overflow-hidden"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.45 }}
        >
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover"
          />
          {/* Fade connection between image and black background */}
          <div className="absolute bottom-0 h-32 w-full bg-gradient-to-t from-black via-black/80 to-transparent" />
        </motion.div>

        {/* Bottom content */}
        <div className="relative z-10 p-6 bg-black text-white">
          <p className="text-sm tracking-wider text-gray-400">
            {subtitle}
          </p>
          <h3 className="mt-1 text-lg font-bold ">{title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>

          {/* Highlights */}
          {highlights.length > 0 && (
            <ul className="mt-4 grid grid-cols-2 gap-2 text-xs text-gray-400">
              {highlights.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-2 rounded-md bg-gray-400/50 px-2 py-1"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  {item}
                </li>
              ))}
            </ul>
          )}

          {/* CTA */}
          {url && (
            <div className="mt-6">
              <Link
                href={url}
                className="hover:bg-transparent hover:text-gray-200 cursor-pointer  text-orange-500"
              >
                Learn More
              </Link>
            </div>
          )}
        </div>
      </motion.div>
    );
  },
);

ElitePlanCard.displayName = "ElitePlanCard";
