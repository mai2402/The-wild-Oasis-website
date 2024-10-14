import DateSelector from "@/app/_components/DateSelector";
import ReservationForm from "@/app/_components/ReservationForm";
import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";


async function Reservation({cabin}) {

    const [bookedDates,settings]= await Promise.all([getBookedDatesByCabinId(cabin.id),getSettings()])
    return (
        <div className="grid grid-cols-2" >
        <DateSelector  bookedDates={bookedDates} settings={settings} cabin={cabin}/>
        <ReservationForm cabin={cabin}/>
    </div>
    )
}

export default Reservation
