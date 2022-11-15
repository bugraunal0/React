import axios from "axios";
import { UserModel } from "../../app/modules/users/models/UserModel";
import {env} from "../../env";

export async function fetchAllUsers(
): Promise<UserModel> {
    return await axios.get(`${env.REACT_APP_BACKEND_API_URL}/users`);
}