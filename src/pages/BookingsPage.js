import { useEffect, useState } from "react";
import AccountNav from "../components/AccountNav";
import axios from "axios";
import PlaceImg from "../components/PlaceImg";
import { Link } from "react-router-dom";
import BookingDates from "../components/BookingDates";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get("/bookings").then((resData) => {
      setBookings(resData.data);
    });
  }, []);

  return (
    <div>
      <AccountNav />
      <div>
        {bookings?.length > 0 &&
          bookings.map((booking, index) => (
            <Link to={`/account/bookings/${booking._id}`} key={index}>
              <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-2 sm:gap-4 mt-2 sm:mt-4 bg-gray-200 rounded-2xl overflow-hidden p-4 sm:p-0">
                <div className="w-full sm:w-48">
                  <PlaceImg place={booking.place} />
                </div>
                <div className="py-2 grow pr-2">
                  <h2 className="text-md sm:text-xl font-semibold">
                    {booking.place.title}
                  </h2>

                  <BookingDates booking={booking} />
                  
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
