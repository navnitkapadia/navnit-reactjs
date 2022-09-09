import axiosAuth from '../helpers/AxiosInterceptor';
import { Category } from '../types/CategoryModel';

const url: string = process.env.REACT_APP_API_URL;
export const categoryList = async () => {
    const { data } = await axiosAuth.get<Category[]>(`${url}/api/categories`);
    return data;
}