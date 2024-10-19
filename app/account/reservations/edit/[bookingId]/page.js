



import UpdateReservationForm from "@/app/_components/UpdateReservationForm";

import { getBooking, getBookings, getCabin } from "@/app/_lib/data-service";

// Function to generate metadata dynamically for each booking
// export async function generateMetadata({ params }) {
  
//     const  { id } = await getBooking(params.bookingId); // Fetch booking details
    
//     return {
//       title: `Reservation ${id}`, // Dynamically set the title
//     };

// }

// Function to generate static params for pre-rendering routes
// export async function generateStaticParams() {
//   try {
//     const bookings = await getBookings(); // Fetch all bookings
    
//     // Map bookings to the required format
//     const ids = bookings.map((booking) => ({
//       bookingId: String(booking.id),
//     }));
    
//     return ids;
//   } catch (error) {
//     console.error('Error fetching bookings:', error);
//     return [];
//   }
// }


export default async function Page({params}) {
  const booking = await  getBooking(params.bookingId)
  const cabinId = booking.cabinId
  const {maxCapacity} = await getCabin(cabinId)

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{params.bookingId}
      </h2>
      <UpdateReservationForm booking={booking} maxCapacity={maxCapacity}/>
    </div>
      )}
