import { Fragment } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

import { productList } from "../services/product.service";
import { Product } from "../types/ProductModel";

import ProductItem from "../components/ProductItem";

import Categories from "../components/Categories";
import Search from "../components/Search";
import Spinner from "../components/Spinner";
import { searchValue, selectValue } from "../redux/filter/filterSlice";
import { useAppSelector } from "../redux/hooks";

const Products = () => {
  const navigate = useNavigate();
  const selected = useAppSelector<string>(selectValue);
  const search = useAppSelector<string>(searchValue);
  const filterItem: string =
    selected !== "-1" ? selected : "" || search !== "" ? search : "";

  const { isLoading, isError, data } = useQuery<Product[]>(
    ["products"],
    () => productList(),
    {
      select: (data: Product[]) =>
        data.filter((product: Product) => {
          return (
            product["category"]
              ?.toLowerCase()
              .includes(filterItem.toLowerCase()) ||
            product["name"]?.toLowerCase().includes(filterItem.toLowerCase())
          );
        }),
    }
  );
  if (isLoading)
    return (
      <div className="flex items-center justify-center my-5">
        <Spinner />
      </div>
    );

  if (isError) return <p className="text-red-400">Oops something went wrong</p>;

  return (
    <>
      <div className="flex justify-between my-10">
        <Search />
        <Categories />
      </div>
      <div className="flex justify-end">
        <button
          onClick={() => navigate("/add-product")}
          className="bg-sky-500 hover:bg-sky-700 px-5 py-2 text-sm leading-5 rounded-full font-semibold text-white "
        >
          Create Product
        </button>
      </div>
      {data?.length ? (
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {data?.map((p: Product) => (
            <Fragment key={p._id}>
              <ProductItem {...p} />
            </Fragment>
          ))}
        </div>
      ) : (
        <div className="flex align-center justify-center h-3/6">
          <div className="font-sans text-center text-xl">No products found</div>
        </div>
      )}
    </>
  );
};

export default Products;
