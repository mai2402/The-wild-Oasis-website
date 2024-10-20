"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";


export async function updateReservation(formData){

  const bookingId = Number(formData.get("bookingId"))
  
  // authenticating user  
  const session = await auth();
  if (!session )
   throw new Error("You must be logged in!!")


  // fetch form data
 
  const numOfGuests = Number(formData.get("numOfGuests"));
  const observations = formData.get("observations").slice(0,1000)
  const updatedFields = {numOfGuests,observations}

// checking if guest has permission to update reservation based of his logged-in id

  const guestBookings = await getBookings(session.guestId)
  const guestBookingsId = guestBookings.map((booking)=>booking.id);
  if(!guestBookingsId.includes(bookingId)) 
    throw new Error("you are not allowed to update this reservation!!")


  const { error } = await supabase
  .from('bookings')
  .update(updatedFields)
  .eq('id', bookingId)
  .select()
  .single();

if (error) {
  console.error(error);
  throw new Error('reservation could not be updated');

}

 revalidatePath(`/account/reservations/edit/${bookingId}`)
 revalidatePath("/account/reservations")

 redirect("/account/reservations")
}



export async function deleteReservation(bookingId){
  const session = await auth();
   
  if (!session )
   throw new Error("You must be logged in!!")

  const guestBookings = await getBookings(session.guestId)
  const guestBookingsId = guestBookings.map((booking)=>booking.id);

  if(!guestBookingsId.includes(bookingId)) 
    throw new Error("you are not allowed to delete this booking!!")

  // for testing useOptimistic hook
  
  // await new Promise((res) => setTimeout(res, 1000));

  // throw new Error();

  const {  error } = 
  await supabase.from('bookings').delete().eq('id', bookingId);

  if (error) throw new Error('Reservation could not be deleted');
 
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
   const {  error } = await supabase
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