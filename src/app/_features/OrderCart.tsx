import { Button } from "@/components/ui/button";
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

export const OrderCart = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="rounded-full py-3 px-3 bg-white">
          <ShoppingCart color="black" />
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-[#404040] rounded-2xl ">
        <SheetHeader>
          <SheetTitle>
            <div className="flex gap-2 text-white">
              <ShoppingCart />
              <p>Order detail</p>
            </div>
          </SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4 w-full text-white">
          <div className="w-full p-2 bg-white rounded-full">
            <Button className="w-1/2 bg-red-500 text-black rounded-full">
              Cart
            </Button>
            <Button className="w-1/2 bg-red-500  text-black rounded-full">
              Order
            </Button>
          </div>
          <div>
            <p>My cart</p>
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
}; ///
