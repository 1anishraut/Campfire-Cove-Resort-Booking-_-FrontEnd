import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../Utils/Constants";
import { addStay } from "../../Utils/staySlice";
import { addAdventure } from "../../Utils/adventureSlice";
import BookingDetails from "./BookingDetails";
import AvailableRoomAdv from "./AvailableRoomAdv";
import jsPDF from "jspdf";
// import logo from "../../../src/assets/images/pngegg (1).png";

const Booking = () => {

  const { checkIn, checkOut } = useSelector((state) => state.dates);
  // console.log(checkIn, checkOut);
  

  const [isGreen, setIsGreen] = useState(null);
  const [isGreenAdv, setIsGreenAdv] = useState(null);
  const [step2, setStep2] = useState(false);
  const [step3, setStep3] = useState(false);
  const [step4, setStep4] = useState(false);

  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [fullName, setFullName] = useState("");
  const [emailId, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [amount, setAmount] = useState("");
  const [roomId, setRoomId] = useState(null);
  const [adventureId, setAdventureId] = useState(null);
  const [guests, setGuests] = useState(1);
  const [bookingId, setBookingId] = useState(null);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [KEY_ID, setKEY_ID] = useState(null);

  const dispatch = useDispatch();
  const rooms = useSelector((state) => state.stay);
  const adventures = useSelector((state) => state.adventure);
  
  //  Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const bookingData = {
      checkin,
      checkout,
      fullName,
      emailId,
      contact,
      roomId,

      amount,
      guests,
    };
    console.log(bookingData);
    setStep2(true);
  };
  //  Fetch rooms
  const fetchStayData = async () => {
    try {
      const res = await axios.get(BASE_URL + "/admin/listStays", {
        withCredentials: true,
      });
      dispatch(addStay(res?.data));
    } catch (error) {
      console.error("Error fetching stay data:", error);
    }
  };
  // Fetch Adventures
  const fetchAdventures = async () => {
    try {
      const res = await axios.get(BASE_URL + "/admin/listAdventure", {
        withCredentials: true,
      });
      // console.log(res?.data);
      dispatch(addAdventure(res?.data));
    } catch (error) {
      console.error("Error fetching adventures:", error);
    }
  };

  useEffect(() => {
    fetchStayData();
    fetchAdventures();
  }, [dispatch]);


  // Add Room Adventure Handler (example)
  const handleAddRoom = (roomId, roomPrice) => {
    setRoomId(roomId);
    setAmount(roomPrice);
    setIsGreen(roomId);
    setStep3(true);
  };
  const handleAddAdventure = (advId, advPrice) => {
    setAdventureId(advId);
    setIsGreenAdv(advId);
    setStep3(true);
  };

  const bookingData = {
    checkIn : checkIn || checkin,
    checkOut : checkOut || checkout,
    fullName,
    emailId,
    contact,
    roomId,
    adventureId,
    amount,
    guests,
  };
  console.log(bookingData);
  

  const createBooking = async (bookingData) => {
    try {
      const res = await axios.post(`${BASE_URL}/booking/create`, bookingData);
      console.log("Booking created:", res.data);
      setBookingId(res.data._id);

      findBookingById(res.data._id);
      setStep4(true);
    } catch (error) {
      console.error(
        "Error creating booking:",
        error.response?.data || error.message
      );
      throw error;
    }
  };
  const findBookingById = async (id) => {
    try {
      const res = await axios.get(`${BASE_URL}/booking/${id}`);
      // console.log("Booking details:", res.data);
      setBookingDetails(res.data);
      setKEY_ID(res.data.RAZORPAY_KEY_ID);
    } catch (error) {
      console.error(
        "Error fetching booking details:",
        error.response?.data || error.message
      );
      throw error;
    }
  };

  const createPayment = async (id) => {
    try {
      const res = await axios.post(`${BASE_URL}/booking/pay/${id}`);
      const order = res.data.paymentData;
      const booking = res.data.booking;


      const options = {
        key: KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Resort Booking",
        description: `Booking ID: ${id}`,
        // image: {logo},
        order_id: order.orderId,
        handler: async (response) => {
          // Verify payment with backend
          await axios.post(`${BASE_URL}/booking/verify`, {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            bookingId: id,
          });
          // alert("Payment Successful!");
          // ✅ Generate PDF Receipt with details
          const doc = new jsPDF();
          doc.setFontSize(18);
          doc.text("Payment Receipt", 20, 20);

          doc.setFontSize(12);
          let y = 40;

          doc.text(`Booking ID: ${id}`, 20, y);
          y += 10;
          doc.text(`Status: ${booking.status}`, 20, y);
          y += 10;
          // Dates
          const checkIn = new Date(booking.checkIn).toLocaleDateString();
          const checkOut = new Date(booking.checkOut).toLocaleDateString();
          doc.text(`Check-In: ${checkIn}`, 20, y);
          y += 10;
          doc.text(`Check-Out: ${checkOut}`, 20, y);
          y += 15;

          // Guest Details
          doc.text("Guest Details:", 20, y);
          y += 10;
          doc.text(`Name: ${booking.fullName}`, 30, y);
          y += 10;
          doc.text(`Email: ${booking.emailId}`, 30, y);
          y += 10;
          doc.text(`Contact: ${booking.contact}`, 30, y);
          y += 10;
          doc.text(`Guests: ${booking.guests}`, 30, y);
          y += 15;

          // Room Details
          doc.text("Room Details:", 20, y);
          y += 10;
          doc.text(`Room: ${booking.roomId?.roomName}`, 30, y);
          y += 10;
          doc.text(`Price (per night):  ${booking.roomId?.roomPrice}`, 30, y);
          y += 15;

          // Adventure Details (if any)
          if (booking?.adventureId) {
            doc.text("Adventure Details:", 20, y);
            y += 10;
            doc.text(`Adventure: ${booking.adventureId?.advName}`, 30, y);
            y += 10;
            doc.text(
              `Adventure Price: ${booking.adventureId?.advPrice}`,
              30,
              y
            );
            y += 15;
          }

          // Payment Info
          doc.text("Payment Details:", 20, y);
          y += 10;
          doc.text(`Payment ID: ${response.razorpay_payment_id}`, 30, y);
          y += 10;
          doc.text(`Order ID: ${response.razorpay_order_id}`, 30, y);
          y += 10;
          doc.text(`Amount Paid: ${(order.amount / 100).toFixed(2)}`, 30, y);
          y += 10;
          doc.text(`Date: ${new Date().toLocaleString()}`, 30, y);

          // ✅ NOTE Section
          doc.setFontSize(11);
          doc.setTextColor(200, 0, 0); // optional red color
          doc.text(
            "Note: Please provide a valid ID proof (Passport, Driving Licence, Voter etc.) for all guests at check-in.",
            20,
            y,
            { maxWidth: 170 }
          );

          // ✅ Save/Download
          doc.save(`Payment_Receipt_${id}.pdf`);
        },
        theme: { color: "#FC3200" },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error(
        "Payment initiation failed:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <>
      <div className="mt-18 flex flex-col items-center px-4 py-8   w-full  gap-8 bg-[#053c366b]">
        {/* Booking Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white w-full max-w-[1200px] rounded-2xl p-8 flex flex-col gap-4 shadow-lg "
        >
          <h2 className="text-2xl font-semibold text-center text-gray-800">
            Book Your Stay
          </h2>

          <div className="flex justify-between border-2 border-dashed p-4 rounded-lg ">
            {/* Check-in Date */}
            <div className="border-r-2 border-dashed w-1/2 px-4">
              <label className="block mb-1 text-gray-700 text-nowrap">
                Check-in Date
              </label>
              <input
                type="date"
                value={checkin || checkIn}
                onChange={(e) => setCheckin(e.target.value)}
                className="w-full border rounded-lg p-2 focus:ring-2  outline-none"
                required
              />
            </div>

            {/* Check-out Date */}
            <div className="w-1/2 px-4">
              <label className="block mb-1 text-gray-700 text-nowrap">
                Check-out Date
              </label>
              <input
                type="date"
                value={checkout || checkOut}
                onChange={(e) => setCheckout(e.target.value)}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
                required
              />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row justify-between gap-4 lg:gap-8">
            <div className="flex gap-4 lg:gap-8 justify-between  lg:w-1/2">
              {/* Guests */}
              <div className="w-[100px] lg:w-1/2 ">
                <label className="block mb-1 text-gray-700">Guests</label>
                <input
                  type="number"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  min="1"
                  className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
                  required
                />
              </div>

              {/* Full Name */}
              <div className=" lg:w-1/2">
                <label className="block mb-1 text-gray-700">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 justify-between lg:w-1/2">
              {/* Email */}
              <div className="w-full lg:w-1/2">
                <label className="block mb-1 text-gray-700">Email</label>
                <input
                  type="email"
                  value={emailId}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
                  required
                />
              </div>

              {/* Contact Number */}
              <div className="w-full lg:w-1/2">
                <label className="block mb-1 text-gray-700">
                  Contact Number
                </label>
                <input
                  type="tel"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="Enter your phone number"
                  className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
                  required
                />
              </div>
            </div>
          </div>

          {/* Next Button */}
          <button
            type="submit"
            className="w-full lg:w-xs self-center mt-4 bg-orange hover:text-black hover:scale-105 hover:shadow-xl shadow-black text-white font-medium py-4 rounded-lg transition duration-300 cursor-pointer"
          >
            View Stays & Adventures
          </button>
        </form>

        {/* STEP 2 */}
        {step2 && (
          <AvailableRoomAdv
            rooms={rooms}
            adventures={adventures}
            handleAddRoom={handleAddRoom}
            handleAddAdventure={handleAddAdventure}
            isGreen={isGreen}
            isGreenAdv={isGreenAdv}
          />
        )}

        {/* Final Create Booking Button */}
        {step3 && (
          <button
            onClick={() => createBooking(bookingData)}
            className="bg-orange text-xl shadow-lg hover:shadow-green font-robotoLight hover:scale-105  text-white px-12 py-3 rounded-lg transition-all duration-300 cursor-pointer"
          >
            Create Booking
          </button>
        )}

        {step4 && (
          <BookingDetails
            bookingDetails={bookingDetails}
            createPayment={createPayment}
            bookingId={bookingId}
          />
        )}
      </div>
    </>
  );
};

export default Booking;
