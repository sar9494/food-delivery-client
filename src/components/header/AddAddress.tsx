import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useFormik } from "formik";
import { MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import * as yup from "yup";
const addressSchema = yup.object({
  address: yup.string().required("Address is required.").min(10),
});
import { useUser } from "@/provider/UserProvider";
import { useState } from "react";
import { cn } from "@/lib/utils";
export function AddAddress() {
  const { user, updateUserInfo } = useUser();
  const [isPressed, setIsPressed] = useState(false);

  const formik = useFormik({
    initialValues: {
      address: "",
    },
    onSubmit: () => {},
    validationSchema: addressSchema,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      {!isPressed ? (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              <MapPin />
              {user?.address}
            </Button>
          </DialogTrigger>
          <DialogContent
            className={cn("sm:max-w-[425px]", isPressed && "hidden")}
          >
            <DialogHeader>
              <DialogTitle>Delivery address</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-4 items-center gap-4">
              <Input
                placeholder="Enter address"
                name="address"
                value={formik.values.address}
                className="col-span-3"
                onChange={formik.handleChange}
              />
              <p className="text-red-500">{formik.errors.address}</p>
            </div>
            <DialogFooter>
              <div className="flex justify-between">
                <Button type="button" onClick={() => formik.resetForm()}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  onClick={async () => {
                    try {
                      setIsPressed(true);
                      await updateUserInfo({
                        ...formik.values,
                        id: user._id,
                      });
                      setIsPressed(false);
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                >
                  Deliver here
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : (
        <div className="bg-white rounded-md p-2">...Loading</div>
      )}
    </form>
  );
}
