import { Button } from "../ui/button";
import { ShoppingCart, User } from "lucide-react";
import { Logo } from "../Logo";
import { AddAddress } from "./AddAddress";
export const Header = () => {
  return (
    <div>
      <Logo />
      <AddAddress />
    </div>
  );
};
