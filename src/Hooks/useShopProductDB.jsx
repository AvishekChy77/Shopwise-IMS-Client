import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import useUserData from "./useUserData";

// Shop and product data only exist for managers; asking as an admin returns
// 403, which the axios interceptor treats as "log out"
const useShopProductDB = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useContext(AuthContext);
  const { userDB } = useUserData();
  const isManager = !loading && !!user?.email && userDB?.role === "manager";

  const { data: shop, isLoading: isShopLoading } = useQuery({
    queryKey: ["shop", user?.email],
    enabled: isManager,
    queryFn: async () => {
      const res = await axiosSecure.get(`/shops/${user.email}`);
      return res.data;
    },
  });
  const {
    data: products,
    isLoading: isProductsLoading,
    refetch,
  } = useQuery({
    queryKey: ["products", user?.email],
    enabled: isManager,
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/${user.email}`);
      return res.data;
    },
  });

  return { shop, isShopLoading, products, isProductsLoading, refetch };
};

export default useShopProductDB;
