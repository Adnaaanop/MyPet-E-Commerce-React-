// import React from "react";
// import { Formik, Form } from "formik";
// import Input from "./components/common/Input";
// import Button from "./components/common/Button";

import React from "react";
import { BrowserRouter } from "react-router-dom";
import AllRoutes from "./routes/AllRoutes";
import Navbar from "./components/layout/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <AllRoutes />
    </BrowserRouter>
  );
}

export default App;
