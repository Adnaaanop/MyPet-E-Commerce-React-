
import React from "react";
import { useField } from "formik";

const Input = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={props.id || props.name}
          className="block mb-1 text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <input
        {...field}
        {...props}
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          meta.touched && meta.error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {meta.touched && meta.error && (
        <p className="text-sm text-red-500 mt-1">{meta.error}</p>
      )}
    </div>
  );
};

export default Input;

