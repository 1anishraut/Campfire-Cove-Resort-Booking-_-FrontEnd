import { useState } from "react";

import "./App.css";
import Layout from "./Components/Layout";
import Login from "./Components/Login";

import { BrowserRouter, Route, Routes } from "react-router";
import appStore from "./Utils/appStore";
import { Provider } from "react-redux";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Login />}></Route>
            <Route path="/adminDashboard" element={<Login />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
