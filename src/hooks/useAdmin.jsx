import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminLoading, setIsAdminLoading] = useState(true);

  useEffect(() => {
    const fetchAdminStatus = async () => {
      if (!user?.email) {
        setIsAdmin(false);
        setIsAdminLoading(false);
        return;
      }

      try {
        setIsAdminLoading(true);
        const { data } = await axiosSecure.get(`/users/admin/${user.email}`);
        setIsAdmin(data?.isAdmin || false);
      } catch (error) {
        console.error("Error fetching admin status:", error);
        setIsAdmin(false);
      } finally {
        setIsAdminLoading(false);
      }
    };

    fetchAdminStatus();
  }, [user?.email, axiosSecure]);

  return [isAdmin, isAdminLoading];
};

export default useAdmin;
