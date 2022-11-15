export interface UserModel {
  id: number
  email: string
  username: string
  password: string
  name: NameModel
  adress: AdressModel
  phone: string
}

export interface NameModel{
  firstname: string
  lastname: string
}
 export interface AdressModel {
  city: string
  street: string
  number: number
  zipcode: string
  geolocation: GeolocationModel
 }

 export interface GeolocationModel {
  lat: string
  long: string
 }