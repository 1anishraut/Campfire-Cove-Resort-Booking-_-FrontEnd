import "./App.css";
import Layout from "./Components/AdminLayout";
import Login from "./Components/Admin/Login";
import { BrowserRouter, Route, Routes } from "react-router";
import appStore, { persistor } from "./Utils/appStore";
import { Provider } from "react-redux";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import { PersistGate } from "redux-persist/integration/react";

import Stay from "./Components/Admin/Stay";
import Meals from "./Components/Admin/Meals";
import Adventure from "./Components/Admin/Adventure";
import AdminLayout from "./Components/AdminLayout";
import ClientLayout from "./Components/ClientLayout";
import Booking from "./Components/Clients/Booking";
import AllBookings from "./Components/Admin/AllBookings";
import LandingPage from "./Components/Clients/Home/LandingPage";
import Stays from "./Components/Clients/Stays_Adventure/Stays";
import Adventures from "./Components/Clients/Stays_Adventure/Adventures";

function App() {
  return (
    <Provider store={appStore}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter basename="/">
          <Routes>
            {/* -------- Client Routes -------- */}
            <Route path="/" element={<ClientLayout />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/stays" element={<Stays />} />
              <Route path="/adventures" element={<Adventures />} />
            </Route>

            {/* -------- Admin Routes -------- */}
            <Route path="/admin" element={<Login />} />
            <Route path="/adminDashboard" element={<AdminLayout />}>
              
              <Route path="allBookings" element={<AllBookings />} />

              <Route path="meals" element={<Meals />} />
              <Route path="stay" element={<Stay />} />
              <Route path="adventures" element={<Adventure />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
