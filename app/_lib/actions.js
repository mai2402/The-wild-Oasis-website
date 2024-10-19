"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";


export async function deleteReservation(bookingId){
  const session = await auth();
   
  if (!session )
   throw new Error("You must be logged in!!")

  const guestBookings = await getBookings(session.guestId)
  const guestBookingsId = guestBookings.map((booking)=>booking.id);

  if(!guestBookingsId.includes(bookingId)) 
    throw new Error("you are not allowed to delete this booking!!")

  const {  error } = 
  await supabase.from('bookings').delete().eq('id', bookingId);

  if (error) throw new Error('Booking could not be deleted');
 
   revalidatePath("/account/reservations")
}

export async function updateGuestProfile(formData){
   const session = await auth();
   
   if (!session )
    throw new Error("You must be logged in!!")

   const nationalID = formData.get("nationalID");
   const [nationality,countryFlag] =
    formData.get("nationality").split("%")

   if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("please enter a valid national Id number")

   const updatedGuest = {nationalID,nationality,countryFlag}
   const { data, error } = await supabase
   .from('guests')
   .update(updatedGuest)
   .eq('id', session.guestId)
   .select()
   .single();

 if (error) 
   throw new Error('Guest could not be updated');

 revalidatePath("/account/profile")
}

export async function signInAction(){
    await signIn('google',{redirectTo: "/account"})
}


export async function signOutAction(){
    await signOut({redirectTo: "/"})
}