import React, { useState, useEffect } from "react";
import useAxiosCommon from "./../hooks/useAxiosCommon";
import SectionTitle from "./SectionTitle";
import { FaTrashAlt } from "react-icons/fa";
import Alert from "./Alert";
import useAdmin from "../hooks/useAdmin";

const PaymentsData = () => {
  const axiosInstance = useAxiosCommon();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ message: "", type: "" });
  const token = localStorage.getItem("access-token");
  console.log(token);
  const [isAdmin, isAdminLoading] = useAdmin();
  console.log(isAdmin, isAdminLoading);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axiosInstance.get("/payments", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        setPayments(response.data.payments);
      } catch (err) {
        setAlert({ message: "Error fetching payments", type: "error" });
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [axiosInstance, token]);

  // Function to handle payment deletion
  const handleDelete = async (transactionId) => {
    try {
      // Make DELETE request to the backend API
      await axiosInstance.delete(`/payments/${transactionId}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      // Remove the deleted payment from the state
      setPayments((prevPayments) =>
        prevPayments.filter(
          (payment) => payment.transactionId !== transactionId
        )
      );
      setAlert({ message: "Payment deleted successfully", type: "success" });
    } catch (err) {
      // Handle error during deletion
      setAlert({ message: "Failed to delete payment", type: "error" });
    }
  };

  // Render UI based on state
  if (loading)
    return (
      <div className="text-center text-indigo-500 bg-lightIndigo">
        Loading payments...
      </div>
    );

  // Ensure `isAdmin` is true before rendering the payments data
  if (!isAdmin) {
    return null;
  }

  return (
    <div className="bg-lightIndigo py-8">
      <div className="max-w-screen-2xl mx-auto lg:px-24 md:px-12 px-6 text-darkIndigo">
        {/* Section Title */}
        <SectionTitle title={"All Payments Data"} />

        {/* Display Alert */}
        {alert.message && (
          <Alert
            message={alert.message}
            type={alert.type}
            onClose={() => setAlert({ message: "", type: "" })}
          />
        )}

        {payments.length === 0 ? (
          <p className="text-center text-gray-500">No payments found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-lightIndigo shadow-md rounded-lg border-collapse">
              <thead>
                <tr className="bg-indigo-600 text-darkIndigo border-b border-b-indigo/20">
                  <th className="py-3 px-4 text-left">First Name</th>
                  <th className="py-3 px-4 text-left">Last Name</th>
                  <th className="py-3 px-4 text-left">Email</th>
                  <th className="py-3 px-4 text-left">LinkedIn URL</th>
                  <th className="py-3 px-4 text-left">Card</th>
                  <th className="py-3 px-4 text-left">Amount</th>
                  <th className="py-3 px-4 text-left">Country</th>
                  <th className="py-3 px-4 text-left">Transaction ID</th>
                  <th className="py-3 px-4 text-left">Date</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr
                    key={payment.transactionId}
                    className="border-b border-b-indigo/20 hover:bg-indigo/5"
                  >
                    <td className="py-3 px-4">{payment.firstName}</td>
                    <td className="py-3 px-4">{payment.lastName}</td>
                    <td className="py-3 px-4">{payment.email}</td>
                    <td className="py-3 px-4">{payment.linkedInUrl}</td>
                    <td className="py-3 px-4">{payment.card}</td>
                    <td className="py-3 px-4">${payment.amount}</td>
                    <td className="py-3 px-4">{payment.country}</td>
                    <td className="py-3 px-4">{payment.transactionId}</td>
                    <td className="py-3 px-4 text-nowrap">{payment.date}</td>
                    <td className="py-3 px-4 text-center">
                      {/* Delete button/icon */}
                      <button
                        onClick={() => handleDelete(payment.transactionId)}
                        className="text-red-600 hover:text-red-800"
                        title="Delete Payment"
                      >
                        <FaTrashAlt size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentsData;
