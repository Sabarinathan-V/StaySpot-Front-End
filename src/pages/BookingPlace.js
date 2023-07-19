import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddressLink from "../components/AddressLink";
import PlaceGallery from "../components/PlaceGallery";
import BookingDates from "../components/BookingDates";

export default function BookingPlace() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get("/bookings").then((response) => {
        const foundBooking = response.data.find(({ _id }) => _id === id);
        if (foundBooking) {
          setBooking(foundBooking);
        }
      });
    }
  }, [id]);

  if (!booking) {
    return "";
  }

  return (
    <div className="my-8">
      <h1 className="text-2xl sm:text-3xl">{booking.place.title}</h1>
      <AddressLink className="my-2">{booking.place.address}</AddressLink>
      <div className="bg-gray-200 p-4 my-6 rounded-2xl">
        <h2 className="text-lg sm:text-xl">Your booking dates: </h2>
        <BookingDates booking={booking} />
      </div>
      <PlaceGallery place={booking.place} />
    </div>
  );
}
