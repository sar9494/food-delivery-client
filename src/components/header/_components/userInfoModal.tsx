import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { User } from "lucide-react";
import { useUser } from "@/provider/UserProvider";
export const UserInfoModal = () => {
  const { user, handleLogout } = useUser();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="rounded-full bg-red-500 p-3">
          <User />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 flex justify-center">
        <div className="grid gap-4">
          <p>{user?.email}</p>
          <Button onClick={() => handleLogout()}>Sign out</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
