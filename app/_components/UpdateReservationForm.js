"use client"

import { updateReservation } from "@/app/_lib/actions";
import {useFormStatus} from "react-dom"
import SpinnerMini from "./SpinnerMini";


function UpdateReservationForm({booking,maxCapacity}) {
    const {numOfGuests,observations ,id}=booking;

   
    return(
         <form action={updateReservation} className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col">
        <div className="space-y-2">

            <input type="hidden" value={id} name="bookingId" />
          <label htmlFor="numOfGuests">How many guests?</label>
          <select
            defaultValue={numOfGuests}
            name="numOfGuests"
            id="numOfGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option  value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            defaultValue={observations}
            name="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          <Button/>
        </div>
      </form>
   
  );
}

export default UpdateReservationForm

function Button() {
    const { pending } = useFormStatus();
  
    return (
      <>
        {pending ? (
          <SpinnerMini />
        ) : (
          <button className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300">
            Update reservation
          </button>
        )}
      </>
    );
  }
  


