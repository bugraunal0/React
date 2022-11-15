import axios from "axios";
import {env} from "../../env";
import { ProductListModel } from "../../app/modules/product/models/ProductListModel";

export async function fetchCategoryList(
    ): Promise<ProductListModel> {
        return await axios.get(`${env.REACT_APP_BACKEND_API_URL}/products/categories`);
    }
//GETALLPRODUCTS
export async function fetchProductList(
): Promise<ProductListModel> {
    return await axios.get(`${env.REACT_APP_BACKEND_API_URL}/products`);
}
export async function fetchLimitProductList(
    limit: number,
    ): Promise<ProductListModel> {
        return await axios.get(`${env.REACT_APP_BACKEND_API_URL}/products?limit=`+limit.toString());
    }
//SEARCHBYCATEGORY
export async function fetchSearchByCategory(
    category: string,
    ): Promise<ProductListModel> {
        return await axios.get(`${env.REACT_APP_BACKEND_API_URL}/products/category/`+category.toString());
    }

export async function fetchAddProduct(
    title: string,
    price: number,
    description: string,
    image: string,
    category: string,
    ): Promise<ProductListModel> {
        return await axios.post(`${env.REACT_APP_BACKEND_API_URL}/products`, {title:title,price:price,description:description,image:image,category:category});
    }


export async function fetchEditProduct(
    id: number,
    title: string,
    price: number,
    description: string,
    image: string,
    category: string,
    ): Promise<ProductListModel> {
        return await axios.post(`${env.REACT_APP_BACKEND_API_URL}/products/${id}`, {title:title,price:price,description:description,image:image,category:category});
    }

export async function fetchDeleteProduct(
    productId: number,
    ): Promise<ProductListModel> {
        return await axios.delete(`${env.REACT_APP_BACKEND_API_URL}/products/`+productId.toString());
    }


