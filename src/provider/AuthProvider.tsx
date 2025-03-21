import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useJwt } from "react-jwt";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const token =
    (typeof window !== "undefined" && localStorage.getItem("token")) || "";
  const path = usePathname();
  const { isExpired } = useJwt(token!);
  useEffect(() => {
    if (!token || isExpired) {
      router.push("/login");
      setLoading(false);
      return;
    } else {
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
