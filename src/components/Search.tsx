import React, { useEffect, useState } from "react";
import { searchProduct } from "../redux/filter/filterSlice";
import { useAppDispatch } from "../redux/hooks";

const Search = () => {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(searchProduct(search));
  }, [dispatch, search]);

  const handleSearchChange = (e: React.ChangeEvent<{ value: string }>) => {
    const sValue = e.target.value;
    if (sValue.length === 0) setSearch("");
    setSearch(sValue);
  };

  return (
    <div className="relative inline-block text-left w-80">
      <input
        onChange={handleSearchChange}
        className="block appearance-none w-full border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        type="text"
        placeholder="Search product"
      />
    </div>
  );
};

export default Search;
