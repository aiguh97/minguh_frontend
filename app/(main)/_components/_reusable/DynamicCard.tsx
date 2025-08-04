import { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface DynamicCardProps {
  title: string;
  description: string;
  footer?: ReactNode;
  className?: string;
  children: ReactNode; // Ganti prop "content" dengan "children"
}

const DynamicCard: React.FC<DynamicCardProps> = ({
  title,
  description,
  footer,
  className,
  children, // Ambil prop "children"
}) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {children} {/* Gunakan prop "children" di sini */}
      </CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
};

export default DynamicCard;