import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

const useManager = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useContext(AuthContext);
  const { data: isManager, isPending: isManagerLoading } = useQuery({
    queryKey: ["ismanager", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/manager/${user.email}`);
      console.log(res.data);
      return res.data.manager;
    },
  });
  return { isManager, isManagerLoading };
};

export default useManager;
