import { Link } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";
import PlaceImg from "../components/PlaceImg";

export default function PlacesPage() {

  const [places, setPlaces] = useState({})

  useEffect(()=>{
    axios.get('/user-places').then((info) =>{
      setPlaces(info.data)
    })
  }, [])


  return (
    <div>
      <AccountNav />

      <div className="text-center">
        <Link
          to={"/account/places/new"}
          className="inline-flex bg-red-500 gap-1 text-white py-2 px-6 rounded-full "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Add new places
        </Link>
      </div>

      {places.length > 0 &&
        places.map((place, index) => {
          return (
            <Link to={'/account/places/'+place._id} className="flex flex-col sm:flex-row cursor-pointer gap-2 sm:gap-4 bg-gray-100 p-4 rounded-2xl m-4 overflow-hidden" key={index}>
              <div className="sm:w-32 sm:h-32 rounded-xl bg-gray-300 grow shrink-0">
                <PlaceImg place={place} />
              </div>
              <div className="grow-0 shrink">
              <h2 className="text-md sm:text-xl font-semibold sm:truncate">{place.title}</h2>
              <p className="text-sm mt-2 hidden sm:block">{place.description}</p>
              <div className="text-sm sm:text-xl block sm:hidden">{place.address}</div>
              </div>
            </Link>
          );
        })}
    </div>
  );
}
