import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

type ButtonIconProps = {
  title?: string;
  icon: LucideIcon;
  onPress?: () => void;
};

export function ButtonIcon({ title, icon: Icon, onPress }: ButtonIconProps) {
  return (
    <Button onClick={onPress} variant="outline" size="sm" aria-label={title}>
      <Icon className="w-4 h-4" />
      <span>{title}</span>
    </Button>
  );
}
