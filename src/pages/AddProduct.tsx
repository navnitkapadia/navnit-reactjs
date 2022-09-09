import { useNavigate } from "react-router-dom";

import { useFormik } from "formik";
import validationSchema from "../validations/product.validation";

import { useQuery } from "react-query";
import { categoryList } from "../services/category.service";
import { createProduct } from "../services/product.service";
import { Product } from "../types/ProductModel";

const AddProduct = ({
  onSubmit,
}: {
  onSubmit?: (values: Omit<Product, "_id">) => {};
}) => {
  const email = process.env.REACT_APP_DEVELOPER_EMAIL || "";
  const navigate = useNavigate();
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: 0,
      avatar: "",
      category: "-1",
      developerEmail: email,
    },
    validationSchema,
    onSubmit: async (values, helpers) => {
      onSubmit && onSubmit(values);
      try {
        if (values.price === 0)
          return helpers.setFieldError("price", "required field");
        await createProduct({ ...values } as Product);
        navigate("/");
      } catch (e: any) {
        helpers.setErrors(e);
      }
    },
  });

  const { data } = useQuery<any>("categories", categoryList);

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Create Product
          </h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Product Name</label>
            <input
              id="name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              type="text"
              placeholder="Product name"
            />
            {errors.name && touched.name && (
              <span data-testid="nameError" className="text-red-500 text-xs">
                {errors.name}
              </span>
            )}
          </div>

          <div className="mt-5">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.description}
              className="elative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              rows={3}
              cols={5}
              placeholder="Description"
            />
            {errors.description && touched.description && (
              <span className="text-red-500 text-xs">{errors.description}</span>
            )}
          </div>
          <div className="mt-5">
            <label htmlFor="avatar">Avatar</label>
            <input
              id="avatar"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.avatar}
              className="elative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              type="text"
              placeholder="Image URL"
            />
            {errors.avatar && touched.avatar && (
              <span className="text-red-500 text-xs">{errors.avatar}</span>
            )}
          </div>
          <div className="mt-5">
            <label htmlFor="developerEmail">Developer Email</label>
            <input
              id="developerEmail"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.developerEmail}
              className="elative block w-full mt-5 appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              type="text"
              placeholder="Developer Email"
            />
            {errors.developerEmail && touched.developerEmail && (
              <span className="text-red-500 text-xs">
                {errors.developerEmail}
              </span>
            )}
          </div>
          <div className="mt-5">
            <label htmlFor="price">Price</label>
            <input
              id="price"
              onChange={(value) => setFieldValue("price", value.target.value)}
              onBlur={(value) => setFieldValue("price", value.target.value)}
              value={values.price}
              className="elative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              type={"number"}
              placeholder="Price"
            />
            {errors.price && touched.price && (
              <span className="text-red-500 text-xs">{errors.price}</span>
            )}
          </div>

          <div className="relative mt-5">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              onChange={(value) =>
                setFieldValue("category", value.target.value)
              }
              value={values.category}
              className="block appearance-none w-full border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            >
              <option value="-1">Categories</option>
              {data?.categories.map((cat: any) => (
                <option
                  key={cat._id}
                  value={cat.name}
                  className="text-gray-500 px-4 py-3 text-base"
                >
                  {cat.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
          {errors.category && touched.category && (
            <span className="text-red-500 text-xs">{errors.category}</span>
          )}
          <button
            type="submit"
            className="mt-10 inline-flex justify-center w-full bg-white hover:bg-blue-500 text-black font-bold hover:text-white py-2 px-4 border border-gray-300 shadow-sm rounded"
          >
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
