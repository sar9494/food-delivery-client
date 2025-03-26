import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useJwt } from "react-jwt";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const token =
    (typeof window !== "undefined" && localStorage.getItem("token")) || "";
  const path = usePathname();
  const { isExpired, decodedToken } = useJwt(token!);
  useEffect(() => {
    if (!token || isExpired) {
      router.push("/login");
      setLoading(false);
      console.log(decodedToken);

      return;
    } else {
      localStorage.setItem("user", JSON.stringify(decodedToken));
      setLoading(false);
      if (path.includes("/login") || path.includes("/signUp")) {
        router.push("/");
      }
    }
  }, [token, isExpired]);

  if (loading) {
    return <div>... LOADING</div>;
  }

  return children;
};
