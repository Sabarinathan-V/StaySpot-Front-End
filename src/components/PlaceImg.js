export default function PlaceImg({place, index=0, className=null}){

    if (!place.photos?.length){
        return ''
    }
    if(!className){
        className = "w-full h-full rounded-xl sm:rounded-none object-cover"
    }
    return (
        <>
        <img className={className} src={"https://stayspot-backend.onrender.com/uploads/"+place.photos[index]} alt="" />             
        </>
    )
}