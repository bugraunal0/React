import {Action} from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {call, takeLatest} from 'redux-saga/effects'
import {UserModel} from '../models/UserModel'
import {logoutRequest} from "./AuthCRUD";

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export const actionTypes = {
  Login: '[Login] Action',
  Logout: '[Logout] Action',
  RefreshToken: '[RefreshToken] Action',
}

const initialAuthState: IAuthState = {
  user: undefined,
  token: undefined,
  refreshToken: undefined
}

export interface IAuthState {
  user?: UserModel
  token?: string
  refreshToken?: string
  message?: string
  status?: string
}

export const reducer = persistReducer(
    {storage, key: 'ekinoks', whitelist: ['token','refreshToken','user']},
    (state: IAuthState = initialAuthState, action: ActionWithPayload<IAuthState>) => {
      //debugger
      switch (action.type) {
        case actionTypes.Login: {

        
          const token = action.payload?.token
          const refreshToken = action.payload?.token
          const user = action.payload?.user
          return {token,refreshToken, user}
        }

        case actionTypes.Logout: {
          return initialAuthState
        }

        case actionTypes.RefreshToken: {

      
          const token = action.payload?.token
          const refreshToken = action.payload?.refreshToken
          return {...state, token, refreshToken}
        }

        default:
          return state
      }
    }
)


export const actions = {
  login: (token: string, refreshToken: string, user: UserModel) => ({type: actionTypes.Login, payload: {token, refreshToken,user}}),
  logout: () => ({type: actionTypes.Logout}),
  refreshToken: (token: string, refreshToken: string) => ({type: actionTypes.RefreshToken, payload: {token, refreshToken}}),
}

export function* saga() {
  yield takeLatest(actionTypes.Logout, function* logoutSaga() {
    try{
      // @ts-ignore
      const refreshToken = JSON.parse(localStorage.getItem('persist:ekinoks')).refreshToken.replace(/['"]+/g, '');
      yield call(logoutRequest,refreshToken);
    }
    catch(e){}
  })
}