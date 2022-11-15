import axios from 'axios'
import {UserModel} from '../models/UserModel'
import {env} from "../../../../env";


export const LOGIN_URL = `${env.REACT_APP_BACKEND_API_URL}/auth/login`
export const LOGOUT_REQUEST_URL = `${env.REACT_APP_BACKEND_API_URL}/logout`
export const GET_ACCESSTOKEN_BY_REFRESHTOKEN_URL = `${env.REACT_APP_BACKEND_API_URL}/refresh_token`

export function login(username: string, password: string) {
  return axios.post(`${env.REACT_APP_BACKEND_API_URL}/auth/login`, {username:username,password:password})
}

export function logoutRequest(refreshToken: string) {
  return axios.post(LOGOUT_REQUEST_URL, {
    refreshToken: refreshToken,
  })
}

export function getAccessTokenByRefreshToken(refreshToken:string) {
  return axios.post<UserModel>(GET_ACCESSTOKEN_BY_REFRESHTOKEN_URL, {
    refreshToken:refreshToken
  })
}
