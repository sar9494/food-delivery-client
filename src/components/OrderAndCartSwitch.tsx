import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Food } from "@/utils/types";
import { ChosenFoodCard } from "./ChosenFoodCard";
import { SheetClose } from "@/components/ui/sheet";
export const OrderAndCartSwitch = () => {
  const foodsInCart = JSON.parse(localStorage.getItem("chosenFoods") || "[]");
  const totalPrice = foodsInCart.reduce(
    (sum: number, items: { food: Food; count: number }) => {
      return sum + Number(items.food.price * items.count);
    },
    0
  );
  const shippingPrice = 0.99;
  const handleFoodOrder = () => {};
  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger className="focus-visible:bg-red-500" value="cart">
          Cart
        </TabsTrigger>
        <TabsTrigger value="order">Order</TabsTrigger>
      </TabsList>
      <TabsContent value="cart">
        <div className="flex flex-col gap-5">
          <div className="p-5 bg-white rounded-2xl">
            <p className="text-xl font-semibold">My cart</p>
            <div className="flex flex-col py-5 gap-5">
              {foodsInCart &&
                foodsInCart?.map(
                  (el: { food: Food; count: number }, index: number) => {
                    return (
                      <ChosenFoodCard
                        key={index}
                        food={el.food}
                        count={el.count}
                      />
                    );
                  }
                )}
            </div>
            <SheetClose className="w-full bg-white rounded-full hover:text-white hover:bg-red-500 border border-red-500 text-red-500 py-2">
              Add food
            </SheetClose>
          </div>
          <div className="bg-white p-5 rounded-2xl">
            <p className="text-xl font-semibold">Payment info</p>
            <div className="border-b-2 border-dashed py-5 flex flex-col gap-2">
              <div className="flex w-full justify-between">
                <p>Items</p>
                <p>{totalPrice}</p>
              </div>
              <div className="flex w-full justify-between ">
                <p>Shipping</p>
                <p>{shippingPrice}</p>
              </div>
            </div>
            <div className="flex w-full justify-between py-2">
              <p>Total</p>
              <p>{totalPrice + shippingPrice}</p>
            </div>
            <Button className="bg-red-500 w-full rounded-full hover:bg-white hover:text-red-500 border border-red-500">
              Checkout
            </Button>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="order" className="sm:max-h-full">
        <div className="p-5 bg-white rounded-2xl w-full">
          <p className="text-xl font-semibold">Order history</p>
        </div>
      </TabsContent>
    </Tabs>
  );
};
