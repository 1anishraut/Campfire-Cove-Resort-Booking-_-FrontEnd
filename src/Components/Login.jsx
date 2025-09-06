import { useEffect, useState } from "react";
import logo from "../Assets/Images/pngegg (1).png";
import axios from "axios";
import { BASE_URL } from "../Utils/Constants";
import { addAdmin } from "../Utils/adminSlice";
import { useDispatch } from "react-redux"; 
import { Navigate } from "react-router";

const Login = () => {
  const dispatch = useDispatch(); 

  const [swipe, setSwipe] = useState(false);

  const [managerId, setManagerId] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [buttonText, setButtonText] = useState("Admin Login");
  const [error, setError] = useState("");

  const adminLoginHander = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        BASE_URL + "/admin/login",
        { managerId, password },
        { withCredentials: true }
      );
      console.log("Login Response:", res?.data);

      dispatch(addAdmin(res?.data));
      return Navigate("/adminDashboard");
    } catch (error) {
      setError(error.response?.data?.message);
    }
  };
  const userLoginHander = async (e) => {
    e.preventDefault();
  };

  const handleToggle = () => {
    setSwipe(!swipe);
  };




  return (
    <div className="w-full max-w-[1600px] h-screen  self-center">
      <div
        className={`flex flex-col lg:flex-row gap-16 md:gap-0 items-center h-full transition-all duration-500 ${
          swipe ? "lg:flex-row-reverse" : "lg:flex-row"
        }`}
      >
        {/* Left Section */}
        <section className=" w-1/2 flex flex-col items-center text-white mt-10 lg:mt-0">
          <div className="flex items-center justify-center gap-2 ">
            <img src={logo} alt="Logo" className="md:h-30 h-20 w-auto  " />
            <h1 className="md:text-3xl font-bold text-center h-20 md:h-30 flex items-center px-4   border-[#FC3200] border-b-4 border-t-4 border-r-4  rounded-tr-md rounded-br-md text-nowrap">
              Camp on Hills
            </h1>
          </div>
          <button
            onClick={handleToggle}
            className="border rounded-lg px-4 py-2 mt-8 border-[#FC3200] hover:scale-105 hover:shadow-lg hover:shadow-[#FC3200] transition-all duration-300 cursor-pointer"
          >
            {swipe ? "User Login" : "Admin Login"}
          </button>
        </section>

        {/* Right Section */}
        <section
          className={` w-1/2 relative md:h-[80%]  flex flex-col items-center justify-center text-white ${
            !swipe
              ? "border-l-none lg:border-l-[1px] "
              : "lg:border-r-[1px] border-l-none"
          }`}
        >
          {swipe ? (
            <div className="flex flex-col items-center">
              <div className="text-center text-white mb-12">
                <h1 className="text-4xl mb-4">Welcome</h1>
                <p className="text-sm">PLEASE LOGIN TO ADMIN DASHBOARD</p>
              </div>
              <form
                onSubmit={adminLoginHander}
                className="flex flex-col gap-4 w-96"
              >
                <div className="flex flex-col">
                  <label htmlFor="username" className="text-white mb-2">
                    Manager Id
                  </label>
                  <input
                    type="text"
                    id="username"
                    value={managerId}
                    onChange={(e) => setManagerId(e.target.value)}
                    className="p-2 border border-gray-300 rounded"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="password" className="text-white mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="p-2 border border-gray-300 rounded"
                  />
                </div>
                <p className="text-red-500 text-sm">{error}</p>

                <button
                  type="submit"
                  className="bg-[#FC3200] text-white p-2 rounded hover:bg-[#fc3200cc] cursor-pointer transition-all duration-300"
                >
                  Login
                </button>
              </form>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="text-center text-white mb-12">
                <h1 className="text-4xl mb-4">Welcome</h1>
                <p className="text-sm">PLEASE LOGIN TO USER DASHBOARD</p>
              </div>
              <form
                onSubmit={userLoginHander}
                className="flex flex-col gap-4 w-96"
              >
                <div className="flex flex-col">
                  <label htmlFor="username" className="text-white mb-2">
                    Email
                  </label>
                  <input
                    type="text"
                    id="username"
                    value={managerId}
                    onChange={(e) => setEmail(e.target.value)}
                    className="p-2 border border-gray-300 rounded"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="password" className="text-white mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setUserPassword(e.target.value)}
                    className="p-2 border border-gray-300 rounded"
                  />
                </div>
                <p className="text-red-500 text-sm">{error}</p>

                <button
                  type="submit"
                  className="bg-[#FC3200] text-white p-2 rounded hover:bg-[#fc3200cc] cursor-pointer transition-all duration-300"
                >
                  Login
                </button>
              </form>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Login;
