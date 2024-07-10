import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ReactNode } from "react";

interface TooltipProps {
  children: ReactNode;
  content: string;
  side?: "bottom" | "left" | "top" | "right";
  align?: "center" | "end" | "start";
}

const ActionTooltip = ({ children, align, content, side }: TooltipProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={50}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side} align={align} className="bg-neutral-800/70">
        <p className="font-medium text-xs text-neutral-100">
            {content}
        </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ActionTooltip;
