// import { updateReservationStatus } from "./api";

// export default async function handleCancel(reservation_id) {
//   const abortController = new AbortController();
//   let result = window.confirm(
//     "Do you want to cancel this reservation? \n \n This cannot be undone."
//   );
//   if (result) {
//     return updateReservationStatus(
//       reservation_id,
//       "cancelled",
//       abortController.signal
//     ).then();
//   }
// }