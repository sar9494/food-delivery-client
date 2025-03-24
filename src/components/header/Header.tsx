import { Button } from "../ui/button";
import { User } from "lucide-react";
import { Logo } from "../Logo";
import { AddAddress } from "./AddAddress";
import { OrderCart } from "@/app/_features/OrderCart";
export const Header = () => {
  return (
    <div className="flex justify-between w-full py-5 px-20 bg-gray-900">
      <Logo />
      <div className="flex gap-5">
        <AddAddress />
        <OrderCart />
        <Button className="rounded-full bg-red-500 p-3">
          <User />
        </Button>
      </div>
    </div>
  );
};
