// ✅ PetForm.jsx
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "../../components/common/Button";

const PetForm = ({ initialValues, onSubmit, isEdit = false }) => {
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    breed: Yup.string().required("Breed is required"),
    age: Yup.number()
      .required("Age is required")
      .min(0, "Age must be 0 or more"),
    description: Yup.string().required("Description is required"),
    price: Yup.number().required("Price is required"),
    stock: Yup.number().required("Stock is required"),
    image: Yup.string().url("Must be a valid URL").required("Image URL required"),
    category: Yup.string().required("Category is required"),
  });

  return (
    <div className="bg-white p-6 rounded shadow max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4 text-blue-700">
        {isEdit ? "✏️ Edit Pet" : "➕ Add Pet"}
      </h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className="space-y-4">
          <div>
            <label className="block font-medium">Name</label>
            <Field name="name" className="w-full border px-3 py-2 rounded" />
            <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
          </div>

          <div>
            <label className="block font-medium">Breed</label>
            <Field name="breed" className="w-full border px-3 py-2 rounded" />
            <ErrorMessage name="breed" component="div" className="text-red-500 text-sm" />
          </div>

          <div>
            <label className="block font-medium">Age</label>
            <Field name="age" type="number" className="w-full border px-3 py-2 rounded" />
            <ErrorMessage name="age" component="div" className="text-red-500 text-sm" />
          </div>

          <div>
            <label className="block font-medium">Description</label>
            <Field name="description" as="textarea" className="w-full border px-3 py-2 rounded" />
            <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
          </div>

          <div>
            <label className="block font-medium">Price</label>
            <Field name="price" type="number" className="w-full border px-3 py-2 rounded" />
            <ErrorMessage name="price" component="div" className="text-red-500 text-sm" />
          </div>

          <div>
            <label className="block font-medium">Stock</label>
            <Field name="stock" type="number" className="w-full border px-3 py-2 rounded" />
            <ErrorMessage name="stock" component="div" className="text-red-500 text-sm" />
          </div>

          <div>
            <label className="block font-medium">Category</label>
            <Field name="category" className="w-full border px-3 py-2 rounded" />
            <ErrorMessage name="category" component="div" className="text-red-500 text-sm" />
          </div>

          <div>
            <label className="block font-medium">Image URL</label>
            <Field name="image" className="w-full border px-3 py-2 rounded" />
            <ErrorMessage name="image" component="div" className="text-red-500 text-sm" />
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            {isEdit ? "Update Pet" : "Add Pet"}
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default PetForm;
