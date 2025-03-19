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
import { MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Formik } from "formik";
import * as yup from "yup";
const addressSchema = yup.object({
  address: yup.string().required("Address is required.").min(10),
});
import { updateUser } from "@/utils/user";

export function AddAddress() {
  return (
    <Formik
      validationSchema={addressSchema}
      onSubmit={() => {}}
      initialValues={{
        address: "",
      }}
    >
      {({ values, errors, handleChange, handleSubmit, resetForm }) => (
        <form onSubmit={handleSubmit}>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <MapPin />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Delivery address</DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-4 items-center gap-4">
                <Input
                  placeholder="Enter address"
                  name="address"
                  value={values.address}
                  className="col-span-3"
                  onChange={handleChange}
                />
                <p className="text-red-500">{errors.address}</p>
              </div>
              <DialogFooter>
                <div className="flex justify-between">
                  <Button type="button" onClick={() => resetForm()}>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    onClick={() => {
                      updateUser({
                        ...values,
                        token: localStorage.getItem("token"),
                      });
                    }}
                  >
                    Deliver here
                  </Button>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </form>
      )}
    </Formik>
  );
}
