import { selectedCategory } from "../redux/filter/filterSlice";
import { useAppDispatch } from "../redux/hooks";

import { useQuery } from "react-query";
import { categoryList } from "../services/category.service";
import { Category } from "../types/CategoryModel";
import Spinner from "./Spinner";

const Categories = () => {
  const dispatch = useAppDispatch();

  const { isLoading, isError, data } = useQuery<Category[]>(
    "categories",
    categoryList
  );

  if (isLoading)
    return (
      <div className="flex items-center justify-center my-5">
        <Spinner />
      </div>
    );
  if (isError) return <p className="text-red-400">Oops something went wrong</p>;

  const handleChange = (e: React.ChangeEvent<{ value: string }>) => {
    const sValue: string = e.target.value;
    dispatch(selectedCategory(sValue));
  };

  return (
    <div className="relative inline-block text-left w-80">
      <select
        onChange={handleChange}
        className="block appearance-none w-full border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
      >
        <option value="-1">Categories</option>
        {data?.map(({ _id, name }) => (
          <option
            key={_id}
            value={name}
            className="text-gray-500 px-4 py-3 text-base"
          >
            {name}
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
  );
};

export default Categories;
