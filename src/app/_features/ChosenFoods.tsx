import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
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
      <SheetContent className="sm:max-w-[480px] bg-gray-700 rounded-2xl">
        <SheetHeader>
          <SheetTitle>
            <div className="flex gap-2 text-white ">
              <ShoppingCart />
              <p>Order detail</p>
            </div>
          </SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-5">
          <div className="w-full flex p-2 bg-white rounded-full">
            <Button className="w-1/2 rounded-full ">Cart</Button>
            <Button className="w-1/2 rounded-full">Order</Button>
          </div>
          <div className="p-5 bg-white rounded-2xl">
            <p className="text-xl font-semibold">My cart</p>
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
