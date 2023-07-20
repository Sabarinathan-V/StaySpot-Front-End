import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function IndexPage() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get("/places").then((placesData) => {
      setPlaces(placesData.data);
    });
  }, []);

  return (
    <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
      {places.length > 0 &&
        places.map((place, index) => (
          <Link to={"/places/" + place._id} key={index}>
            <div className="bg-gray-500 rounded-2xl mb-2 flex">
              {place.photos?.[0] && (
                <img
                  className="rounded-2xl aspect-square object-cover"
                  src={"https://stayspot-backend.onrender.com/uploads/" + place.photos[0]}
                  alt=""
                />
              )}
            </div>
            <h2 className="text-sm truncate font-bold">{place.address}</h2>
            <h2 className="text-sm text-gray-500">{place.title}</h2>
            <div className="mt-1 text-sm sm:text-lg">
              <span className="font-bold">Rs. {place.price} </span>
              <span>per night</span>
            </div>
          </Link>
        ))}
    </div>
  );
}
