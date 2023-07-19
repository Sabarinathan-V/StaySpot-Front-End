import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "../components/BookingWidget";
import PlaceGallery from "../components/PlaceGallery";
import AddressLink from "../components/AddressLink";

export default function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`).then((response) => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) return "";

  return (

    <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
      <h1 className="text-2xl sm:text-3xl">{place.title}</h1>

      <AddressLink>{place.address}</AddressLink>

      <PlaceGallery place={place} />

      <div className="grid gap-4 grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div className="mt-4">
          <div>
            <h3 className="font-semibold text-xl">Description:</h3>
            <p>{place.description}</p>
          </div>
          <div className="mt-2">
            Check in : After {place.checkIn} AM
            <br />
            Check out : Before {place.checkOut} AM
            <br />
            Max number of guest : {place.maxGuest}
          </div>
        </div>

        <BookingWidget place={place} />

      </div>

      <div className="mt-4 -mx-8 px-8 bg-white">
        <h3 className="font-semibold text-xl py-2">Extra info:</h3>
        <div className="text-sm text-gray-500 pb-4">{place.extraInfo}</div>
      </div>
    </div>
    
  );
}
