import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../services/base";

const Signup = () => {
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    email: "",
    password: "",
    role: "user",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Minimum 6 characters")
      .required("Password is required"),
    role: Yup.string().oneOf(["user", "admin"]).required("Role is required"),
  });

  const handleSubmit = async (values, actions) => {
    try {
      const response = await axios.post(`${BASE_URL}/users`, values);
      const userId = response.data.id;

      localStorage.setItem("userId", userId);
      actions.resetForm();
      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error);
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
          <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

          <Input name="name" label="Name" type="text" />
          <Input name="email" label="Email" type="email" />
          <Input name="password" label="Password" type="password" />

          <div className="mb-4">
            <label
              htmlFor="role"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Role
            </label>
            <Field
              as="select"
              name="role"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </Field>
          </div>

          <Button type="submit" className="w-full mt-4">
            Register
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default Signup;
