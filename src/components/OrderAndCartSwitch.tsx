import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Food } from "@/provider/FoodProvider";
import { SheetClose } from "@/components/ui/sheet";
import { Cart } from "./Cart";
import { useEffect, useState } from "react";
import { useFoodOrder } from "@/provider/FoodOrderProvider";
import { EmptyPlaceHolder } from "./EmptyPlaceHolder";
import axios from "axios";
import { Map, Soup, Timer, X } from "lucide-react";
import { useUser } from "@/provider/UserProvider";
import { cn } from "@/lib/utils";
export const OrderAndCartSwitch = () => {
  const [foodsInCart, setFoodsInCart] = useState<
    Array<{ food: Food; count: number }>
  >([]);
  const shippingPrice = 0.99;
  const { updateFoodOrders, orders } = useFoodOrder();
  const [totalPrice, setTotalPrice] = useState(0);
  const { user } = useUser();

  useEffect(() => {
    setFoodsInCart(JSON.parse(localStorage.getItem("chosenFoods") || "[]"));
    console.log(orders);
  }, []);

  useEffect(() => {
    setTotalPrice(
      foodsInCart.reduce(
        (sum: number, items: { food: Food; count: number }) => {
          return sum + Number(items.food.price * items.count);
        },
        0
      )
    );
    localStorage.setItem("totalPrice", totalPrice.toString());
  }, [foodsInCart]);
  useEffect(() => {
    localStorage.setItem("totalPrice", (totalPrice + shippingPrice).toString());
  }, [totalPrice]);

  const handleOrderCheckout = async () => {
    const newOrder = foodsInCart.map((el) => {
      return { food: el.food._id, quantity: el.count };
    });
    await updateFoodOrders(newOrder);
  };

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
            {foodsInCart.length === 0 && <EmptyPlaceHolder place="cart" />}
            <Cart foodsInCart={foodsInCart} setFoodsInCart={setFoodsInCart} />
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
            <Button
              className="bg-red-500 w-full rounded-full hover:bg-white hover:text-red-500 border border-red-500"
              onClick={handleOrderCheckout}
            >
              Checkout
            </Button>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="order" className="sm:max-h-full">
        <div className="p-5 bg-white rounded-2xl w-full">
          <p className="text-xl font-semibold">Order history</p>
          {orders?.length === 0 ? (
            <div>
              <EmptyPlaceHolder place="order" />
              <SheetClose className="w-full bg-white rounded-full hover:text-white hover:bg-red-500 border border-red-500 text-red-500 py-2">
                Add food
              </SheetClose>
            </div>
          ) : (
            <div>
              {orders?.map((el, index) => {
                return (
                  <div
                    key={index}
                    className={cn(
                      "py-3",
                      index !== orders.length - 1 && "border-b-4  border-dashed"
                    )}
                  >
                    <div className="flex w-full justify-between p-3 items-center">
                      <p className="font-extrabold text-xl">${el.totalPrice}</p>
                      <Button className="rounded-full bg-white text-red-500 border border-gray-500">
                        {el.status}
                      </Button>
                    </div>
                    <div className="text-gray-500 flex flex-col gap-2">
                      <div className="flex flex-col gap-2">
                        {el.foodOrderItems.map((item, index) => {
                          return (
                            <div
                              key={index}
                              className="w-full flex justify-between"
                            >
                              <div className="flex gap-2">
                                <Soup color="gray" />
                                <p>{item.foodName}</p>
                              </div>
                              <p>x {item.quantity}</p>
                            </div>
                          );
                        })}
                      </div>
                      <div className="flex gap-2">
                        <Timer color="gray" />
                        <p>{el.createdAt.split("T")[0]}</p>
                      </div>
                      <div className="flex gap-2">
                        <Map color="gray" />
                        <p>{user.address}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
};
