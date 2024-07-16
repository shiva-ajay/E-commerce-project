import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ActivationPage, HomePage, LoginPage, ProductsPage, SignupPage, BestSellingPage, EventsPage, FAQPage } from "./Routes.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Store from "./redux/store.js";
import { loadUser } from "./redux/actions/user.js";
import { useSelector } from "react-redux";

const App = () => {

  const { loading } = useSelector((state) => state.user);


  useEffect(() => {
    Store.dispatch(loadUser());
  }, []);
  return (
    <>
    {
      loading ? (
        null
      ) : (
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
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/activation/:activation_token" element={<ActivationPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/best-selling" element={<BestSellingPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/faq" element={<FAQPage />} />
      </Routes>
    </>
      )
    }
    </>
  );
};

export default App;
