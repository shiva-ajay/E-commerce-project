import React from "react";
import { Route, Routes } from "react-router-dom";
import { ActivationPage, LoginPage, SignupPage } from "./Routes.js";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
    <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/sign-up" element={<SignupPage />} />
      <Route path="/activation/:activation_token" element={<ActivationPage />} />
    </Routes>
    </>
  );
};

export default App;
