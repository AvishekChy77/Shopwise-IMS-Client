import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

const useNotices = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useContext(AuthContext);
  const { data = { unread: 0, notices: [] }, refetch } = useQuery({
    queryKey: ["notices", user?.email],
    enabled: !loading && !!user?.email,
    refetchInterval: 60_000,
    queryFn: async () => (await axiosSecure.get("/notices")).data,
  });

  const markRead = async (id) => {
    await axiosSecure.patch(`/notices/${id}/read`);
    refetch();
  };

  return { ...data, markRead };
};

export default useNotices;
