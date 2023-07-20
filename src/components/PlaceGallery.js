import { useState } from "react";

export default function PlaceGallery({ place }) {
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 bg-black text-white min-w-full min-h-screen">
        <div className="bg-black p-8 grid gap-2">
          <div>
            <h1 className="text-2xl mb-2 mr-36">Photos of {place.title}</h1>
            <button
              onClick={() => setShowAllPhotos(false)}
              className="fixed flex gap-1 rounded-2xl px-4 py-2 shadow shadow-white text-black right-12 top-8"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Close
            </button>
          </div>
          {place?.photos?.length > 0 &&
            place.photos.map((photo, index) => (
              <div key={index}>
                <img
                  className="w-full"
                  src={"https://stayspot-backend.onrender.com/uploads/" + photo}
                  alt=""
                />
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="relative">
        <div className="grid grid-cols-[2fr_1fr] gap-2 rounded-2xl overflow-hidden">
          <div>
            {place.photos?.[0] && (
              <div>
                <img
                  onClick={() => setShowAllPhotos(true)}
                  className="aspect-square cursor-pointer object-cover w-full h-full"
                  src={"https://stayspot-backend.onrender.com/" + place.photos[0]}
                  alt=""
                />
              </div>
            )}
          </div>
          <div className="grid">
            {place.photos?.[1] && (
              <img
                onClick={() => setShowAllPhotos(true)}
                className="aspect-square cursor-pointer object-cover"
                src={"https://stayspot-backend.onrender.com/uploads/" + place.photos[1]}
                alt=""
              />
            )}
            {place.photos?.[2] && (
              <div className="overflow-hidden">
                <img
                  onClick={() => setShowAllPhotos(true)}
                  className="aspect-square cursor-pointer object-cover relative top-2"
                  src={"https://stayspot-backend.onrender.com/uploads/" + place.photos[2]}
                  alt=""
                />
              </div>
            )}
          </div>
        </div>
        <button
          onClick={() => setShowAllPhotos(true)}
          className="flex gap-1 absolute bottom-2 right-2 py-2 px-2 sm:px-4 bg-white rounded-2xl shadow shadow-md shadow-gray-500"
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
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          <span>Show more photos</span>
        </button>
      </div>
    </>
  );
}
