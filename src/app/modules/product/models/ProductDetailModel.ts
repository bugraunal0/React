import { ProductModel } from "./ProductDetailWrapperModel";

export interface ProductDetailModel {
    title: string;
    price: number;
    description: string;

}

export interface ProductEditModel {
    title: string;
    price: number;
    description: string;
    category: string,
    image: string
}