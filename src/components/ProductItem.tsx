import { FC } from "react";
import { Link } from "react-router-dom";

import { Product } from "../types/ProductModel";

const ProductItem: FC<Product> = (product: Product) => {
  return (
    <Link to={`/product-detail/${product._id}`}>
      <div className="max-w-sm rounded overflow-hidden shadow-lg group relative p-3">
        <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
          <img
            src={product.avatar}
            alt={product.name}
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          />
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700">
              <span aria-hidden="true" className="absolute inset-0"></span>
              {product.name}
            </h3>
          </div>
          <p className="text-sm font-medium text-gray-900">$ {product.price}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
