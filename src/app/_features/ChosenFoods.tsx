import { OrderAndCartSwitch } from "@/components/OrderAndCartSwitch";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart } from "lucide-react";

export const ChosenFoods = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="rounded-full py-3 px-3 bg-white">
          <ShoppingCart color="black" />
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-[480px] bg-[#404040] rounded-2xl">
        <SheetHeader>
          <SheetTitle>
            <div className="flex gap-2 text-white ">
              <ShoppingCart />
              <p>Order detail</p>
            </div>
          </SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <OrderAndCartSwitch />
        <SheetFooter></SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
