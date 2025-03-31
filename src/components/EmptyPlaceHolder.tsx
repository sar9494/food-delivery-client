export const EmptyPlaceHolder = (props: { place: string }) => {
  return (
    <div className="flex flex-col justify-center bg-gray-100 rounded-xl p-5 w-full">
      <div className="flex justify-center">
        <img
          className="w-[60px]"
          src="https://res.cloudinary.com/dszot6j60/image/upload/v1742377758/Screenshot_2024-12-17_at_18.02.18_1_Traced_crjxm8.png"
          alt="logo image"
        />
      </div>

      {props.place === "order" ? (
        <div className="flex items-center flex-col w-full">
          <p>No Orders Yet? </p>
          <p className="text-sm">
            🍕 "You haven't placed any orders yet. Start exploring our menu and
            satisfy your cravings!"
          </p>
        </div>
      ) : (
        <div className="flex  items-center flex-col w-full">
          <p>Your cart is empthy </p>
          <p className="text-sm text-gray-400">
            Hungry? 🍔 Add some delicious dishes to your cart and satisfy your
            cravings!
          </p>
        </div>
      )}
    </div>
  );
};
