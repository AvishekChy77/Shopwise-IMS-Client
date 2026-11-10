import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

const useUserData = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useContext(AuthContext);
  const { data: userDB, refetch } = useQuery({
    queryKey: ["user", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data || null;
    },
  });
  return { userDB, refetch };
};

export default useUserData;
