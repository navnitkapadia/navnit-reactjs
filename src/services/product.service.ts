import axiosAuth from '../helpers/AxiosInterceptor';
import { Product } from '../types/ProductModel';

const url: string = process.env.REACT_APP_API_URL;

export const productList = async () => {
    const { data } = await axiosAuth.get<Product[]>(`${url}/api/products`);
    return data;
}

export const productById = async (id: string) => {
    const { data } = await axiosAuth.get(`${url}/api/products/${id}`);
    return data;
}

export const createProduct = async (product: Product) => {
    const { data } = await axiosAuth.post<Product>(`${url}/api/products`, { ...product });
    return data;
}
