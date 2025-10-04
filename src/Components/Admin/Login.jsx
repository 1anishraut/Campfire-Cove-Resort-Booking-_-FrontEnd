import { useState } from "react";
import logo from "../../../src/assets/images/pngegg (1).png";
import axios from "axios";
import { BASE_URL } from "../../Utils/Constants";
import { addAdmin } from "../../Utils/adminSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [managerId, setManagerId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const adminLoginHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        BASE_URL + "/admin/login",
        { managerId, password },
        { withCredentials: true }
      );
      dispatch(addAdmin(res?.data));
      navigate("/adminDashboard/stay");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="w-full  h-screen flex items-center justify-center font-robotoLight  self-center ">
      <div className="flex flex-col lg:flex-row gap-36  items-center h-full">
        {/* Left Section */}
        <section className="lg:w-1/2  flex flex-col items-center text-white mt-10 lg:mt-0 ">
          <div className="text-4xl  tracking-wide flex items-center gap-1   relative pb-2 cursor-pointer font-robotoMedium">
            <img src={logo} alt="" className="h-20 w-auto" />
            <h1 className="mr-4 text-nowrap">Campfire Cove</h1>
            <span className="absolute bottom-0 right-0 font-paintBrush text-orange text-4xl rotate-350">
              Resort
            </span>
          </div>
        </section>

        <div className="hidden lg:block border-r border-white-light h-[80%] w-[2xp]"></div>

        {/* Right Section */}
        <section className="w-1/2 relative md:h-[80%] flex flex-col items-center justify-center text-white ">
          <div className="flex flex-col items-center">
            <div className="text-center text-white mb-12">
              <h1 className="text-4xl mb-4">Admin Login</h1>
              <p className="text-sm">Enter your credentials</p>
            </div>
            <form
              onSubmit={adminLoginHandler}
              className="flex flex-col gap-4 w-96"
            >
              <div className="flex flex-col">
                <label htmlFor="managerId" className="text-white mb-2">
                  Manager ID
                </label>
                <input
                  type="text"
                  id="managerId"
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

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                type="submit"
                className="bg-[#FC3200] text-white p-2 rounded hover:bg-[#fc3200cc] transition-all duration-300"
              >
                Login
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Login;
