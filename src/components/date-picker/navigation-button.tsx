import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface NavigationButtonProps {
  tooltipText: string;
  onClick: () => void;
  children: React.ReactNode;
}

export function NavigationButton({ tooltipText, onClick, children }: NavigationButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger>
        <Button
          variant="outline"
          onClick={onClick}
          className="h-12 w-9 bg-transparent border-border-primary text-content-primary hover:bg-background-tertiary hover:border-border-secondary hover:text-content-primary focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-border-brand focus:border-border-brand focus-visible:border-border-brand"
        >
          {children}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{tooltipText}</p>
      </TooltipContent>
    </Tooltip>
  )
}