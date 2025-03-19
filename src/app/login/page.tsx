import { LogIn } from "./_features/LogIn";
export default function Home() {
  return (
    <div className="flex w-screen items-center justify-center py-5 ">
      <div className="flex w-[1300px] items-center justify-center gap-5">
        <LogIn />
        <img
          src="https://res.cloudinary.com/dszot6j60/image/upload/v1742378263/Frame_1321316047_qo4b6g.png"
          alt="site main image"
        />
      </div>
    </div>
  );
}
