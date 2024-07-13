import React from 'react'
import { Route, Routes } from "react-router-dom";
import {LoginPage, SignupPage} from './Routes.js'
const App = () => {
  return (
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/sign-up' element={<SignupPage />} />
    </Routes>
  )
}

export default App