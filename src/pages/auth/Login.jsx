import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { BASE_URL } from "../../services/base";

function Login() {
  const navigate = useNavigate();

  // Initial form values
  const initialValues = {
    email: "",
    password: "",
  };

  // Validation schema
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  // Form submit handler
  const handleSubmit = async (values, actions) => {
    try {
      const res = await axios.get(`${BASE_URL}/users`);

      // Check user credentials
      const user = res.data.find(
        (user) =>
          user.email === values.email && user.password === values.password
      );

      if (user) {
        // Save only the userId in localStorage
        localStorage.setItem("userId", user.id);

        // Redirect based on role
        if (user.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/user/home");
        }
      } else {
        actions.setFieldError("email", "Invalid credentials");
        actions.setFieldError("password", " ");
      }
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

          <Input name="email" label="Email" type="email" />
          <Input name="password" label="Password" type="password" />

          <Button type="submit" className="w-full mt-4">
            Login
          </Button>
        </Form>
      </Formik>
    </div>
  );
}

export default Login;
