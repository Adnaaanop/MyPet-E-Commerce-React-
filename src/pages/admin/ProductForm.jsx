import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "../../components/common/Button";

const ProductForm = ({ initialValues, onSubmit, isEdit = false }) => {
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    price: Yup.number().required("Price is required"),
    stock: Yup.number().required("Stock is required"),
    image: Yup.string().url("Must be a valid URL").required("Image URL required"),
    category: Yup.string().required("Category is required"),
    description: Yup.string().required("Description is required"),
    rating: Yup.number().min(0).max(5).required("Rating is required"),
  });

  return (
    <div className="bg-white p-6 rounded shadow max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4 text-blue-700">
        {isEdit ? " Edit Product" : " Add Product"}
      </h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className="space-y-4">
          {/* Name */}
          <div>
            <label className="block font-medium">Name</label>
            <Field name="name" className="w-full border px-3 py-2 rounded" placeholder="Enter product name" />
            <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
          </div>

          {/* Price */}
          <div>
            <label className="block font-medium">Price</label>
            <Field name="price" type="number" className="w-full border px-3 py-2 rounded" placeholder="Enter price" />
            <ErrorMessage name="price" component="div" className="text-red-500 text-sm" />
          </div>

          {/* Stock */}
          <div>
            <label className="block font-medium">Stock</label>
            <Field name="stock" type="number" className="w-full border px-3 py-2 rounded" placeholder="Enter stock quantity" />
            <ErrorMessage name="stock" component="div" className="text-red-500 text-sm" />
          </div>

          {/* Category */}
          <div>
            <label className="block font-medium">Category</label>
            <Field name="category" className="w-full border px-3 py-2 rounded" placeholder="e.g. Dog, Cat, Fish" />
            <ErrorMessage name="category" component="div" className="text-red-500 text-sm" />
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium">Description</label>
            <Field as="textarea" name="description" className="w-full border px-3 py-2 rounded" placeholder="Enter product description" rows="3" />
            <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
          </div>

          {/* Rating */}
          <div>
            <label className="block font-medium">Rating</label>
            <Field name="rating" type="number" step="0.1" className="w-full border px-3 py-2 rounded" placeholder="Enter rating (0 to 5)" />
            <ErrorMessage name="rating" component="div" className="text-red-500 text-sm" />
          </div>

          {/* Image  */}
          <div>
            <label className="block font-medium">Image URL</label>
            <Field name="image" className="w-full border px-3 py-2 rounded" placeholder="Paste Unsplash URL" />
            <ErrorMessage name="image" component="div" className="text-red-500 text-sm" />
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            {isEdit ? "Update Product" : "Add Product"}
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default ProductForm;
