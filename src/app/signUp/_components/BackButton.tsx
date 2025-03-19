import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
export const BackButton = ({
  onClick,
}: {
  onClick?: () => void | undefined;
}) => {
  return (
    <Button
      className="w-fit border bg-white px-3 py-3"
      onClick={onClick ? onClick : () => {}}
    >
      <ChevronLeft color="black " />
    </Button>
  );
};
