import React, { useState } from "react";
import emailjs from "emailjs-com";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  // Handle form changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID, // From .env
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID, // From .env
        formData,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY // From .env
      )
      .then(
        () => {
          setStatus("✅ Request sent successfully!");
          setFormData({
            user_name: "",
            user_email: "",
            subject: "",
            message: "",
          });
        },
        (error) => {
          setStatus("❌ Failed to send message. Try again.");
          console.error("EmailJS Error:", error);
        }
      );
  };

  return (
    <div id="contact" className=" flex items-center justify-center absolute  w-full font-robotoLight">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 max-w-xl  px-4 rounded-md  text-sm "
      >
        <div className="flex gap-4">
          <input
            type="text"
            name="user_name"
            placeholder="Your Name"
            value={formData.user_name}
            onChange={handleChange}
            className="bg-white-light p-2 w-1/2 rounded focus:outline-none"
            required
          />
          <input
            type="email"
            name="user_email"
            placeholder="Your Email"
            value={formData.user_email}
            onChange={handleChange}
            className="bg-white-light p-2 w-1/2 rounded focus:outline-none"
            required
          />

          <input
            type="text"
            name="subject"
            placeholder="Conatct Number"
            value={formData.subject}
            onChange={handleChange}
            className="bg-white-light p-2 w-1/2 rounded focus:outline-none"
            required
          />
        </div>
        {/* <textarea
          name="message"
          placeholder="Message"
          rows="4"
          value={formData.message}
          onChange={handleChange}
          className="bg-gray-900 p-2 rounded focus:outline-none"
          required
        ></textarea> */}

        <button
          type="submit"
          className="hover:bg-orange text-white py-2  rounded-full border border-orange hover:shadow-xl shadow-black transition mx-25 lg:mx-35 cursor-pointer"
        >
          Request Callback
        </button>
        {status && <p className="text-center text-sm mt-2 text-green-600">{status}</p>}
      </form>
    </div>
  );
};

export default ContactForm;
