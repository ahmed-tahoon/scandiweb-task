import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { createProduct } from "../../helpers/fakebackend_helper";

const AddProduct = ({ productList, setProductList }) => {
  const nav = useNavigate();
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [formData, setFormData] = useState({
    sku: "",
    name: "",
    price: "",
    productType: "DVD",
    size: "",
    weight: "",
    height: "",
    width: "",
    length: "",
  });

  const goToProductList = () => {
    nav("/");
  };
  const validateForm = (formData) => {
    const errors = {};

    const checkRequired = (field, fieldName) => {
      if (!formData[field]) {
        errors[field] = `${fieldName} is required`;
      }
    };

    const checkPositive = (field, fieldName) => {
      if (!formData[field] || formData[field] <= 0) {
        errors[field] = `${fieldName} must be a positive number`;
      }
    };

    const checkMaxValue = (field, fieldName, maxValue) => {
      if (formData[field] && formData[field] > maxValue) {
        errors[
          field
        ] = `${fieldName} must be less than or equal to ${maxValue}`;
      }
    };

    checkRequired("sku", "SKU");
    checkRequired("name", "Name");
    checkPositive("price", "Price");
    checkMaxValue("price", "Price", Number.MAX_SAFE_INTEGER);
    checkRequired("productType", "Product Type");

    if (formData.productType === "DVD") {
      checkRequired("size", "Size");
      checkMaxValue("size", "DVD", Number.MAX_SAFE_INTEGER);
    }

    if (formData.productType === "Book") {
      checkRequired("weight", "Weight");
      checkMaxValue("weight", "Book", Number.MAX_SAFE_INTEGER);
    }

    if (formData.productType === "Furniture") {
      checkRequired("height", "Height");
      checkRequired("width", "Width");
      checkRequired("length", "Length");
      checkMaxValue("height", "Furniture", Number.MAX_SAFE_INTEGER);
      checkMaxValue("width", "Furniture", Number.MAX_SAFE_INTEGER);
      checkMaxValue("length", "Furniture", Number.MAX_SAFE_INTEGER);
    }

    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    const errors = validateForm({ ...formData, [name]: value });

    if (errors[name] !== undefined) {
      setFieldErrors({ ...fieldErrors, [name]: errors[name] });
    } else {
      setFieldErrors({ ...fieldErrors, [name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm(formData);
    setFieldErrors(errors);

    if (Object.keys(errors).length !== 0) {
      setError("Please fill in all required fields correctly");
    } else {
      let sendFomeData = new FormData();
      sendFomeData.append("sku", formData.sku);
      sendFomeData.append("name", formData.name);
      sendFomeData.append("price", formData.price);
      sendFomeData.append("productType", formData.productType);
      sendFomeData.append("size", formData.size);
      sendFomeData.append("weight", formData.weight);
      sendFomeData.append("height", formData.height);
      sendFomeData.append("width", formData.width);
      sendFomeData.append("length", formData.length);

      const res = await createProduct(sendFomeData).catch((err) => {
        setError(err.response.data.message);
        return;
      });

      if (res?.data.success) {
        goToProductList();
      }

      // console.log(formData);
      //goToProductList();
    }
  };

  const handleCancel = () => {
    goToProductList();
  };

  return (
    <div className="container mx-auto p-4 min-h-screen">
      {error && (
        <div
          class="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
          role="alert"
        >
          <svg
            class="flex-shrink-0 inline w-4 h-4 me-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <div>{error}</div>
        </div>
      )}
      <div className="flex justify-between items-center mb-4 bg-gray-200 p-4 rounded-md">
        <h1 className="text-2xl font-bold">Add Product</h1>

        <div className="flex-grow" />
        <div className="flex items-center space-x-4">
          <button
            onClick={handleSubmit}
            className="bg-gradient-to-r from-green-500 to-green-700 text-white font-bold py-2 px-4 rounded-md hover:from-green-700 hover:to-green-900"
          >
            Save
          </button>

          <button
            className="bg-gradient-to-r from-red-500 to-red-700 text-white font-bold py-2 px-4 rounded-md hover:from-red-700 hover:to-red-900"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </div>
      <form id="product_form" className="bg-gray-100 p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="sku" className="block font-bold mb-1">
            SKU<span className="text-red-500"> *</span>
          </label>
          <input
            type="text"
            id="sku"
            placeholder="Please, enter SKU"
            name="sku"
            className="w-full border-gray-300 rounded-md p-2"
            value={formData.sku}
            onChange={handleInputChange}
            required
          />
          {fieldErrors.sku && <p className="text-red-500">{fieldErrors.sku}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="block font-bold mb-1">
            Name<span className="text-red-500"> *</span>
          </label>
          <input
            type="text"
            id="name"
            placeholder="Please, enter Name"
            name="name"
            className="w-full border-gray-300 rounded-md p-2"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          {fieldErrors.name && (
            <p className="text-red-500">{fieldErrors.name}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block font-bold mb-1">
            Price<span className="text-red-500"> *</span>
          </label>
          <input
            type="number"
            id="price"
            placeholder="Please, enter Price"
            name="price"
            className="w-full border-gray-300 rounded-md p-2"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
          {fieldErrors.price && (
            <p className="text-red-500">{fieldErrors.price}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="productType" className="block font-bold mb-1">
            Product Type<span className="text-red-500"> *</span>
          </label>
          <select
            id="productType"
            name="productType"
            placeholder="Please, select Product Type"
            value={formData.productType}
            onChange={handleInputChange}
            className="w-full border-gray-300 rounded-md p-2"
            required
          >
            <option  value="DVD">DVD</option>
            <option value="Book">Book</option>
            <option value="Furniture">Furniture</option>
          </select>
        </div>

        {formData.productType === "DVD" && (
          <div className="mb-4">
            <label htmlFor="size" className="block font-bold mb-1">
              Size (MB)<span className="text-red-500"> *</span>
            </label>
            <input
              type="number"
              id="size"
              placeholder="Please, enter Size"
              name="size"
              className="w-full border-gray-300 rounded-md p-2"
              value={formData.size}
              onChange={handleInputChange}
              required
            />
            <span className="text-xs text-gray-500">
              Please enter the size in megabytes
            </span>
            {fieldErrors.size && (
              <p className="text-red-500">{fieldErrors.size}</p>
            )}
          </div>
        )}
        {formData.productType === "Book" && (
          <div className="mb-4">
            <label htmlFor="weight" className="block font-bold mb-1">
              Weight (Kg)<span className="text-red-500"> *</span>
            </label>
            <input
              type="number"
              id="weight"
              placeholder="Please, enter Weight"
              name="weight"
              className="w-full border-gray-300 rounded-md p-2"
              value={formData.weight}
              onChange={handleInputChange}
              required
            />
            <span className="text-xs text-gray-500">
              Please enter the weight in kilograms
            </span>
            {fieldErrors.weight && (
              <p className="text-red-500">{fieldErrors.weight}</p>
            )}
          </div>
        )}
        {formData.productType === "Furniture" && (
          <div className="mb-4">
            <label htmlFor="height" className="block font-bold mb-1">
              Height<span className="text-red-500"> *</span>
            </label>
            <input
              type="number"
              id="height"
              name="height"
              placeholder="Please, enter Height"
              className="w-full border-gray-300 rounded-md p-2"
              value={formData.height}
              onChange={handleInputChange}
              required
            />
            {fieldErrors.height && (
              <p className="text-red-500">{fieldErrors.weigheightht}</p>
            )}
            <label htmlFor="width" className="block font-bold mb-1">
              Width<span className="text-red-500"> *</span>
            </label>
            <input
              type="number"
              id="width"
              placeholder="Please, enter Width"
              name="width"
              className="w-full border-gray-300 rounded-md p-2"
              value={formData.width}
              onChange={handleInputChange}
              required
            />
            {fieldErrors.width && (
              <p className="text-red-500">{fieldErrors.width}</p>
            )}
            <label htmlFor="length" className="block font-bold mb-1">
              Length<span className="text-red-500"> *</span>
            </label>
            <input
              type="number"
              id="length"
              placeholder="Please, enter Length"
              name="length"
              className="w-full border-gray-300 rounded-md p-2"
              value={formData.length}
              onChange={handleInputChange}
              required
            />
            <span className="text-xs text-gray-500">
              Please enter the dimensions in centimeters
            </span>
            {fieldErrors.length && (
              <p className="text-red-500">{fieldErrors.length}</p>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default AddProduct;
