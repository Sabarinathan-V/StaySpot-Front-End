import { useEffect, useState } from "react";
import Perks from "../components/Perks";
import axios from "axios";
import PhotosUploader from "../components/PhotosUploader";
import AccountNav from "../components/AccountNav";
import { Navigate, useParams } from "react-router-dom";

export default function PlacesFormPage(){

    const {id} = useParams();

    const [title, setTitle] = useState("");
    const [address, setAddress] = useState("");
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState("");
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [maxGuest, setMaxGuest] = useState('');
    const [price, setPrice] = useState(100)
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
      if (!id) {
        return
      }
      axios.get("/places/" + id).then(placeData => {

        const {data} = placeData;

        setTitle(data.title);
        setAddress(data.address);
        setAddedPhotos(data.photos);
        setDescription(data.description);
        setPerks(data.perks);
        setExtraInfo(data.extraInfo);
        setCheckIn(data.checkIn);
        setCheckOut(data.checkOut);
        setMaxGuest(data.maxGuest);
        setPrice(data.price);
      })
    }, [id]);

    function inputHeader(text) {
      return <h2 className="mt-4 text-2xl">{text}</h2>;
    }

    function inputDescription(text) {
      return <p className=" text-gray-500 text-sm">{text}</p>;
    }

    function preInput(title, description) {
      return (
        <>
          {inputHeader(title)}
          {inputDescription(description)}
        </>
      );
    }
    
    async function savePlace (event) {
      event.preventDefault();
      const placeData = { title,
        address, addedPhotos, description, perks,
        extraInfo, checkIn, checkOut, maxGuest, price,
      }
      if (id) {
        await axios.put('/places/'+id, placeData);
          setRedirect(true)
      } else {
        await axios.post('/places', placeData);
          setRedirect(true)
      }
    }

    if (redirect) {
        return <Navigate to={'/account/places'} />
    }
    

    return (
        <>
        <AccountNav />
        <form onSubmit={savePlace}>
          {preInput(
            "Title",
            "Title for your place. should be short and catchy as in advertisement"
          )}
          <input
            type="text"
            placeholder="title, for example: my lovely apartment"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />

          {preInput("Address", "Address to this place")}
          <input
            type="text"
            placeholder="address"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            required
          />

          {preInput("Photos", "more = better")}
          <PhotosUploader           
            addedPhotos={addedPhotos}
            setAddedPhotos={setAddedPhotos}

          />

          {preInput("Description", "description of this place")}
          <textarea
            placeholder="add description here"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
          />

          {preInput("Perks", "select all the perks of your place")}
          <Perks perks={perks} setPerks={setPerks} />

          {preInput("Extra info", "house rules, etc.")}
          <textarea
            placeholder="add extra info here"
            value={extraInfo}
            onChange={(event) => setExtraInfo(event.target.value)}
          />

          {preInput(
            "Check in & out, Maximum guest",
            "add check in and out times. remember to have some time window for cleaning the room between guests"
          )}
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-2">
            <div>
              <h3 className="mt-2 -mb-1">Check in</h3>
              <input
                type="number"
                placeholder="00:00"
                value={checkIn}
                onChange={(event) => setCheckIn(event.target.value)}
                required
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1">Check out</h3>
              <input
                type="number"
                placeholder="00:00"
                value={checkOut}
                onChange={(event) => setCheckOut(event.target.value)}
                required
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1">Max number of guests</h3>
              <input
                type="number"
                placeholder="0"
                value={maxGuest}
                onChange={(ev) => setMaxGuest(ev.target.value)}
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1">Price</h3>
              <input
                type="number"
                placeholder="0"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                required
              />
            </div>
          </div>

          <button className="primary mt-2">
            Save
          </button>
        </form>
        </>
    )
}