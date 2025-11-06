import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const MyReservations = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:4000/api/v1/reservation/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setReservations(res.data.reservations);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load your reservations");
      }
    };

    fetchReservations();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:4000/api/v1/reservation/reservation/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setReservations((prev) => prev.filter((r) => r._id !== id));
      toast.success("Reservation cancelled successfully!");
    } catch (error) {
      toast.error("Failed to cancel reservation!");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">My Reservations</h2>
      {reservations.length === 0 ? (
        <p>No reservations found.</p>
      ) : (
        <ul className="space-y-4">
          {reservations.map((resv) => (
            <li key={resv._id} className="border p-4 rounded-lg flex justify-between items-center">
              <div>
                <p><strong>Date:</strong> {resv.date}</p>
                <p><strong>Time:</strong> {resv.time}</p>
              </div>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md"
                onClick={() => handleDelete(resv._id)}
              >
                Cancel
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyReservations;
