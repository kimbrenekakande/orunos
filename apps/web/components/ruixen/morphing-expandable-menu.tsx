"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Save,
  FileDown,
  X,
  Plus,
} from "lucide-react";

type Mode = "pill" | "dock" | "action";

const spring = {
  type: "spring" as const,
  damping: 28,
  stiffness: 380,
  mass: 0.7,
};

const dockActions: { id: Mode; icon: typeof Save; action?: () => void }[] = [
  { id: "action", icon: Save },
  { id: "dock", icon: FileDown },
];

const dims: Record<Mode, [number, number, number]> = {
  pill: [44, 44, 50],
  dock: [130, 44, 22],
  action: [130, 44, 22],
};

interface MorphingExpandableMenuProps {
  onSave: () => void;
  onDownload?: () => void;
}

export function MorphingExpandableMenu({ onSave, onDownload }: MorphingExpandableMenuProps) {
  const [mode, setMode] = useState<Mode>("pill");
  const [hoveredDock, setHoveredDock] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setMode("pill");
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      if (mode === "pill") return;
      setMode(mode === "dock" ? "pill" : "dock");
    }
    document.addEventListener("mousedown", onOutside);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onOutside);
      document.removeEventListener("keydown", onKey);
    };
  }, [mode]);

  useEffect(() => {
    if (mode !== "dock") setHoveredDock(null);
  }, [mode]);

  const goBack = () => setMode("dock");
  const [w, h, r] = dims[mode];
  const isDockOrPill = mode === "pill" || mode === "dock";

  const handleDockAction = () => {
    onDownload?.();
    setMode("pill");
  };

  const handleSaveAction = () => {
    onSave();
    setMode("pill");
  };

  const handleActionClick = () => {
    handleSaveAction();
  };

  return (
    <div ref={ref} className="relative h-11 w-11">
      <motion.div
        className="absolute right-0 top-0 overflow-hidden border border-border/60 bg-popover shadow-xl shadow-black/8 dark:border-border/40 dark:shadow-black/25"
        animate={{ width: w, height: h, borderRadius: r }}
        transition={spring}
      >
        {/* ── dock / pill bar ──────────────────────────── */}
        <AnimatePresence>
          {isDockOrPill && (
            <motion.div
              key="bar"
              className="absolute right-0 top-0 flex h-11 items-center"
              style={{ width: dims.dock[0] }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
            >
              {dockActions.map((item, i) => (
                <motion.button
                  key={item.id}
                  onClick={() => {
                    if (item.id === "action") handleActionClick();
                    if (item.id === "dock") handleDockAction();
                    setMode(item.id);
                  }}
                  onMouseEnter={() => setHoveredDock(item.id)}
                  onMouseLeave={() => setHoveredDock(null)}
                  animate={{
                    width: mode === "dock" ? 36 : 0,
                    marginLeft: mode === "dock" ? 3 : 0,
                    opacity: mode === "dock" ? 1 : 0,
                  }}
                  transition={{
                    ...spring,
                    delay: mode === "dock" ? (2 - i) * 0.03 : 0,
                  }}
                  style={{
                    height: 36,
                    pointerEvents: mode === "dock" ? "auto" : "none",
                  }}
                  className="relative flex shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-xl text-muted-foreground transition-colors duration-150 hover:text-foreground"
                >
                  {hoveredDock === item.id && (
                    <motion.div
                      layoutId="dockGlow"
                      className="absolute inset-0 rounded-xl bg-foreground/[0.05] dark:bg-foreground/[0.08]"
                      transition={spring}
                    />
                  )}
                  <item.icon className="relative z-10 size-[17px]" />
                </motion.button>
              ))}

              <motion.button
                onClick={() => setMode(mode === "pill" ? "dock" : "pill")}
                className="ml-auto flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center"
                whileTap={{ scale: 0.85 }}
              >
                <motion.div
                  animate={{ rotate: mode === "dock" ? 45 : 0 }}
                  transition={{
                    type: "spring",
                    damping: 20,
                    stiffness: 300,
                    mass: 0.5,
                  }}
                >
                  <Plus className="size-5 text-foreground/80" />
                </motion.div>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
