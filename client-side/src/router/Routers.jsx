import { Route, Routes } from "react-router";

import OTPInput from "../components/Login/OTPInput";
import Reset from "../components/Login/Reset";

export const Routing = () => {
  return (
    <Routes>
      <Route path="OTPinput" element={<OTPInput />} />
      <Route path="Reset" element={<Reset />} />
    </Routes>
  );
};
