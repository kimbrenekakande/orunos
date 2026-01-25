import { Card, CardContent, CardHeader, CardTitle } from "@/components/tiptapui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/tiptapui/badge";
import { CheckCircle } from "lucide-react";

interface PrecisionCardProps {
  leftTitle: string;
  leftSubtitle: string;
  leftDescription: string;
  tags: string[];
  leftButton: string;
  rightTitle: string;
  rightDescription: string;
  rightItems: string[];
  certificationText: string;
  rightButton: string;
}

export default function PrecisionCard({
  leftTitle,
  leftSubtitle,
  leftDescription,
  tags,
  leftButton,
  rightTitle,
  rightDescription,
  rightItems,
  certificationText,
  rightButton,
}: PrecisionCardProps) {
  return (
    <div className="h-[50vh] flex  md:flex-row p-4  items-center justify-center w-screen text-center">
      {/* Left Card */}
      <Card className="w-full bg-transparent border-none">
        <CardHeader>
          <h3 className="text-muted-foreground text-sm font-medium">
            {leftSubtitle}
          </h3>
          <CardTitle className="text-2xl font-semibold">{leftTitle}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">{leftDescription}</p>

          <div className="flex flex-wrap gap-2 w-full justify-center">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-xs px-3 py-1"
              >
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="flex justify-center gap-4">
            <Button className="px-16 py-6 mt-2 rounded cursor-pointer" variant="default">
              {leftButton}
            </Button>
            <Button className="px-16 py-6 mt-2 rounded cursor-pointer" variant="default">
              {leftButton}
            </Button>
          </div>
          
        </CardContent>
      </Card>

      {/* Right Card - I have hidden this (unwanted) */}
      <Card className="hidden w-full max-w-md bg-black text-white dark:bg-white dark:text-black shadow-lg rounded-2xl border-none"> 
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">{rightTitle}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-sm text-gray-500">{rightDescription}</p>

          <div className="grid grid-cols-2 gap-4 text-center">
            {rightItems.map((item) => (
              <div
                key={item}
                className="border border-gray-700 py-3 rounded-lg text-sm bg-black text-white dark:bg-white dark:text-black"
              >
                {item}
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-green-400">
              <CheckCircle size={18} />
              <span className="text-sm font-medium">{certificationText}</span>
            </div>
            <Button variant="secondary">{rightButton}</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
