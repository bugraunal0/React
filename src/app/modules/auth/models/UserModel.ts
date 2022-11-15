import {AuthModel} from './AuthModel'
import {UserAddressModel} from './UserAddressModel'
import {UserCommunicationModel} from './UserCommunicationModel'
import {UserEmailSettingsModel} from './UserEmailSettingsModel'
import {UserSocialNetworksModel} from './UserSocialNetworksModel'

export interface UserModel {
  id: number
  email: string
  username: string
  password: string
  name: NameModel
  //roles: Array<string>
  //auth: AuthModel
  // password: string | undefined
  // occupation?: string
  // companyName?: string
  // phone?: string
  // pic?: string
  // language?: 'en' | 'de' | 'es' | 'fr' | 'ja' | 'zh' | 'ru'
  // timeZone?: string
  // website?: 'https://keenthemes.com'
  // emailSettings?: UserEmailSettingsModel
  // communication?: UserCommunicationModel
  // address?: UserAddressModel
  // socialNetworks?: UserSocialNetworksModel
}
export interface NameModel{
  firstname: string
  lastname: string
}