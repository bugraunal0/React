import axios from "axios";
import {env} from "../../env";
import { CartListModel, CartProductsModel } from "../../app/modules/cart/models/CartListModel";

//LIST
export async function getCartList(
    userId: number,
): Promise<CartListModel> {
    return await axios.get(`${env.REACT_APP_BACKEND_API_URL}/carts/user/`+userId);
}
//ADD
export async function addToCartList(
    userId: number,
    date: any,
    products: Array<CartProductsModel>
): Promise<CartListModel> {
    return await axios.post(`${env.REACT_APP_BACKEND_API_URL}/carts`, JSON.stringify( {
        userId: userId,
        date: date,
        products: products
    }));
}
//UPDATE
export async function updateCartList(
    userId: number,
    date: Date,
    products: Array<CartProductsModel>
): Promise<CartListModel> {
    return await axios.put(`${env.REACT_APP_BACKEND_API_URL}/carts/`+userId, JSON.stringify( {
        userId: userId,
        date: date,
        products: products
    }));
}

//DELETE
export async function deleteCartList(
    id: number,
    ): Promise<CartListModel> {
        return await axios.delete(`${env.REACT_APP_BACKEND_API_URL}/carts/`+id.toString());
    }
