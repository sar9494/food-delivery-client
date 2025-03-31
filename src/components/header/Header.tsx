import { Logo } from "../Logo";
import { AddAddress } from "./AddAddress";
import { ChosenFoods } from "@/app/_features/ChosenFoods";
import { UserInfoModal } from "./_components/userInfoModal";
import { FoodOrderProvider } from "@/provider/FoodOrderProvider";
export const Header = () => {
  return (
    <div className="flex justify-between w-full py-5 px-20 bg-gray-900">
      <Logo />
      <div className="flex gap-5">
        <AddAddress />
        <FoodOrderProvider>
          <ChosenFoods />
        </FoodOrderProvider>
        <UserInfoModal />
      </div>
    </div>
  );
};
