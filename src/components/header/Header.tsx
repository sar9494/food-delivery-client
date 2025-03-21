import { Button } from "../ui/button";
import { ShoppingCart, User } from "lucide-react";
import { Logo } from "../Logo";
import { AddAddress } from "./AddAddress";
export const Header = () => {
  return (
    <div className="flex justify-between w-full py-5 px-20 bg-gray-900">
      <Logo />
      <div className="flex gap-5">
        <AddAddress />
        <Button className="rounded-full py-3 px-3 bg-white">
          <ShoppingCart color="black" />
        </Button>
        <Button className="rounded-full bg-red-500 p-3">
          <User />
        </Button>
      </div>
    </div>
  );
};
