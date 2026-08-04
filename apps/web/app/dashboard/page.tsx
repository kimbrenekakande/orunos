import { serverSession } from "@/lib/server-session";
import { redirect } from "next/navigation";
import TemplateGallery from "@/components/ui/templates";
import { TableView } from "@/components/ui/table-view";
import { VerifyEmailButton } from "./verify";
import prisma from "@/lib/prisma";
import { Sparkles } from "lucide-react";
import { StatCards } from "@/components/dashboard/stats";


export default async function Home() {
  const session = await serverSession();
  const user = session?.user;
  if (!user) redirect("/login");

  const allDocs = await prisma.document.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
  
  const firstName = user.name?.split(" ")[0] || "there";

  return (
    <div className="">
      <div className="mx-0 sm:mx-8 mt-8 sm:mt-12">
        <h2 className="text-xl sm:text-3xl text-center sm:text-left font-header">Good {getTimeOfDay()}, {firstName}</h2>
        <p className="text-sm text-muted-foreground mt-1 text-center sm:text-left">
          {user.email}
        </p>
      </div>

      {!user.emailVerified && (
        // unhide this section after testing
        <section className="mx-0 sm:mx-8 mt-6 sm:mt-8"> 
          <div className="h-px w-full bg-amber-500/30"></div>
          <div className="flex justify-between items-center gap-3 py-3 px-1">
            <div className="flex items-center gap-2 min-w-0 hidd">
              <Sparkles className="h-4 w-4 text-amber-500 shrink-0" />
              <p className="text-xs sm:text-sm text-amber-700 dark:text-amber-300 truncate">Please verify your email</p>
            </div>
            <VerifyEmailButton email={user.email}/>
          </div>
          <div className="h-px w-full bg-amber-500/30"></div>
        </section>
      )}

      <StatCards documents={allDocs}/>
      
      {/*<div className="mx-0 sm:mx-8 mt-6 sm:mt-8">
        <div className="flex gap-3 sm:gap-4 justify-stretch sm:justify-start">
          <StatBadge 
            icon={<Coins className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
            label="Credits"
            value={1}
            size="sm"
            className="flex-1 sm:flex-none justify-center"
          />
          <StatBadge 
            icon={<FileText className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
            label="Documents"
            value={5}
            size="sm"
            className="flex-1 sm:flex-none justify-center"
          />
          <StatBadge 
            icon={<Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
            label="Status"
            value={user.emailVerified ? "Verified" : "Pending"}
            variant={user.emailVerified ? "success" : "warning"}
            size="sm"
            className="flex-1 sm:flex-none justify-center"
          />
        </div>
      </div>*/}
      <section className="mx-0 sm:mx-8 mt-10 sm:mt-12 mb-6 sm:mb-0">
        <h3 className="text-base sm:text-lg text-center sm:text-left mb-4">Start a new paper</h3>
        <TemplateGallery />
      </section>

      <div className="mx-0 sm:mx-8 pb-8">
        <div></div>
        <TableView user={user} docs={allDocs}/>
      </div>
    </div>
  );
}






function StatBadge({ 
  icon, 
  label, 
  value, 
  variant = "default",
  size = "default",
  className = ""
}: { 
  icon: React.ReactNode;
  label: string;
  value: string;
  variant?: "default" | "success" | "warning";
  size?: "default" | "sm";
  className?: string;
}) {
  const styles = {
    default: "bg-muted/50 border-border/60 text-foreground",
    success: "bg-emerald-500/10 border-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    warning: "bg-amber-500/10 border-amber-500/20 text-amber-700 dark:text-amber-300",
  };

  const sizes = {
    default: "px-4 py-2.5 text-sm",
    sm: "px-3 py-2 text-xs",
  };

  return (
    <div className={`flex items-center gap-2 rounded-lg border ${sizes[size]} ${styles[variant]} ${className}`}>
      {icon}
      <span className="font-medium">{value}</span>
      <span className="text-muted-foreground hidden sm:inline">·</span>
      <span className="text-muted-foreground hidden sm:inline">{label}</span>
    </div>
  );
}

function getTimeOfDay() {
  const hour = new Date().getHours();
  if (hour < 12) return "morning";
  if (hour < 17) return "afternoon";
  return "evening";
}
