import DateSelector from "@/app/_components/DateSelector";
import ReservationForm from "@/app/_components/ReservationForm";
import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import { auth } from "@/app/_lib/auth";
import LoginMessage from "./LoginMessage";

async function Reservation({cabin}) {
    const session =  await auth()

    const [bookedDates,settings]= await Promise.all([getBookedDatesByCabinId(cabin.id),getSettings()])
    console.log(bookedDates)
    return (
        <div className="grid grid-cols-2" >
        <DateSelector  bookedDates={bookedDates} settings={settings} cabin={cabin}/>
        {session?.user ?<ReservationForm cabin={cabin} user={session.user}/>: <LoginMessage/>}
    </div>
    )
}

export default Reservation
