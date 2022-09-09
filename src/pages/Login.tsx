import { useNavigate } from "react-router-dom";

import { useFormik } from "formik";
import validationSchema from "../validations/user.validation";

import { getGithubAvatar, GetToken } from "../services/user.service";
import { User } from "../types/UserModel";

const Login = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      github: "",
      avatar: "",
    },
    validationSchema,
    onSubmit: async (values, bag) => {
      try {
        const { avatar_url } = await getGithubAvatar(
          values.github.split("/")[3]
        );
        values = { ...values, avatar: avatar_url };
        await GetToken({ ...values } as User);
        navigate("/");
      } catch (e: any) {
        bag.setErrors(e);
      }
    },
  });

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Login
          </h2>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <input
            id="fullName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.fullName}
            className="relative block w-full mb-5 appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            type="text"
            placeholder="Name"
          />
          {formik.errors.fullName && formik.touched.fullName && (
            <span className="text-red-500 text-xs">
              {formik.errors.fullName}
            </span>
          )}

          <input
            id="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className="elative block w-full mb-5 appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            placeholder="Email"
          />
          {formik.errors.email && formik.touched.email && (
            <span className="text-red-500 text-xs">{formik.errors.email}</span>
          )}

          <input
            id="github"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.github}
            className="elative block w-full mb-5 appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            placeholder="Github profile link"
          />
          {formik.errors.github && formik.touched.github && (
            <span className="text-red-500 text-xs">{formik.errors.github}</span>
          )}

          <button
            type="submit"
            className="inline-block px-7 mt-4 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
          >
            SEND
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
