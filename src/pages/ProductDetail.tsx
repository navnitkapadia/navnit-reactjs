import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { productById } from "../services/product.service";

const ProductDetail = () => {
  const { id } = useParams<"id">();
  const { isLoading, isError, data } = useQuery(["product", id], () =>
    productById(id!)
  );

  if (isLoading)
    return (
      <div className="flex items-center justify-center my-5">
        <Spinner />
      </div>
    );
  if (isError) return <p className="text-red-400">Oops something went wrong</p>;

  const { product } = data || {};
  return (
    <div className="m-8 p-5">
      {!product && (
        <div className="flex align-center justify-center h-3/6">
          <div className="font-sans text-center text-xl"> No product found</div>
        </div>
      )}
      {product && (
        <>
          <div className="flex justify-start items-start">
            <img
              className="rounded-md border max-h-96 w-96"
              src={product?.avatar}
              alt={product?.name}
            />
            <div className="flex flex-col justify-between items-stretch mx-6">
              <div className="text-4xl font-bold w-auto h-11">
                {product?.name}
              </div>

              <div className="text-2xl font-medium mt-5 text-gray-700 w-auto h-11">
                $ {product?.price}
              </div>
              <div className="text-2xl font-medium mt-5 text-gray-700 w-auto h-11">
                {product?.developerEmail}
              </div>
              <div className="text-2xl font-medium mt-5 text-gray-700 w-auto h-11">
                {product?.category}
              </div>
            </div>
          </div>
          <hr className="text-black my-4" />
          <span className="text-xl font-bold">Description</span>
          <div className="text-base text-gray-800 mt-5">
            {product?.description}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetail;
