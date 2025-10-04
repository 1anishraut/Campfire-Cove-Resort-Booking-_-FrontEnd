import { Outlet } from "react-router";
import Booking from "./Clients/Booking";
import NavBar from "./Clients/Home/NavBar";
import Footer from "./Clients/Footer";

const ClientLayout = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-between min-h-screen relative  ">
        <div className="fixed top-20 left-0 w-full h-[100%] -z-10 ">
          <video
            className="w-full h-full object-fill"
            autoPlay
            muted
            playsInline
            loop
            src="https://elakkivalley.com/beta/wp-content/uploads/2023/12/timelapse.mov"
          />
        </div>

        <NavBar />
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

export default ClientLayout;
