import { UserModel } from "../../models/UserModel";
import * as actions from "../types/UserType";


const initialState: UserModel = {
    id: 0,
    email: "",
    username: "",
    password: "",
    name: {firstname:"",lastname:""},
    adress: {city:"",street:"",number:0,zipcode:"",geolocation:{lat:"",long:""}},
    phone: ""
};

export function UserReducer(
    state: UserModel = initialState,
    action: actions.UserListAction
): UserModel {
    switch (action.type) {
        case actions.GET_USER_LIST_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}
