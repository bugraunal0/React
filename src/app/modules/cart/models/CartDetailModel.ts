import { CartModel } from "./CartDetailWrapperModel";

export interface CartDetailModel {
    id: number;
    name: string;
    age: number;

}

export interface CartEditModel {
    id: number;
    name?: string;
    age: number;
}