import React from "react";

function BookingDetails({ bookingDetails, createPayment, bookingId }) {
  if (!bookingDetails) return null;

  // 🕒 Calculate nights between checkIn and checkOut
  const nights =
    Math.ceil(
      (new Date(bookingDetails.booking.checkOut) -
        new Date(bookingDetails.booking.checkIn)) /
        (1000 * 60 * 60 * 24)
    ) || 1;

    const roomPrice = bookingDetails?.booking?.roomId?.roomPrice 
    const adventurePrice = bookingDetails?.booking?.adventureId?.advPrice
    // console.log(roomPrice, adventurePrice);
    
  const grandTotal = bookingDetails.booking.amount || 0;

  // Derive subtotal (price before 18% tax)
  const subTotal = grandTotal / 1.18; // remove 18% tax
  // console.log("sub",subTotal);
  const roomSubTotal = subTotal - (adventurePrice || 0); // room price only

  // console.log("room",roomSubTotal);

  const adventureSubTotal = subTotal - (roomSubTotal || 0); 
  // console.log("adv",adventureSubTotal);

  const taxes = grandTotal - subTotal; // difference is the tax

  const originalPrice = grandTotal + 1790; // optional if you show savings
  const savings = originalPrice - grandTotal;

  return (
    <div className="max-w-md w-full border rounded-lg shadow-md p-6 bg-white space-y-4">
      {/* Dates & Nights */}
      <div className="grid grid-cols-2 border-b pb-2">
        <div>
          <p className="text-gray-500 text-sm">Check In</p>
          <p className="font-medium">
            {new Date(bookingDetails.booking.checkIn).toLocaleDateString(
              "en-GB",
              {
                day: "2-digit",
                month: "short",
                year: "numeric",
                weekday: "short",
              }
            )}
          </p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Check Out</p>
          <p className="font-medium">
            {new Date(bookingDetails.booking.checkOut).toLocaleDateString(
              "en-GB",
              {
                day: "2-digit",
                month: "short",
                year: "numeric",
                weekday: "short",
              }
            )}
          </p>
        </div>
      </div>

      {/* Room & Guests */}
      <div className="space-y-1">
        <p className="text-gray-600">
          <span className="font-medium">No of nights:</span> {nights} Night
        </p>
        <p className="text-gray-600">
          <span className="font-medium">Room:</span>{" "}
          {bookingDetails.booking.roomId?.roomName || "Stay not selected"}
        </p>
        <p className="text-gray-600">
          <span className="font-medium">Adventure:</span>{" "}
          {bookingDetails.booking.adventureId?.advName ||
            "Adventure not selected"}
        </p>
        <p className="text-gray-600">
          <span className="font-medium">Guests:</span>{" "}
          {bookingDetails.booking.guests} Adult
        </p>
      </div>

      {/* Price Breakdown */}
      <div className="border-t pt-2 space-y-2 text-gray-700">
        <div className="flex justify-between">
          <span>Room Price</span>
          <span>₹{roomSubTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Adventure Price</span>
          <span>₹{adventureSubTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Sub Total</span>
          <span>₹{subTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Taxes & Fees</span>
          <span>₹{taxes.toFixed(2)}</span>
        </div>
      </div>

      {/* Grand Total */}
      <div className="border-t pt-3">
        <div className="flex justify-between text-lg font-semibold">
          <span>Grand Total</span>
          <div className="text-right">
            <p className="line-through text-sm text-gray-400">
              ₹{originalPrice.toFixed(2)}
            </p>
            <p className="text-green-700">₹{grandTotal.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Savings */}
      <p className="text-center text-green-600 font-medium">
        You are saving ₹{savings.toFixed(2)} on this deal!
      </p>
      <button
        onClick={() => createPayment(bookingId)}
        className="bg-green-500 w-full text-xl text-white px-6 py-2 rounded-lg shadow transition-all duration-300 cursor-pointer"
      >
        Pay Now
      </button>
    </div>
  );
}

export default BookingDetails;
