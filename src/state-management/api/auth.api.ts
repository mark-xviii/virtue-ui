import { API } from '.'
import {
  LoginInterface,
  LoginResponseInterface,
} from '../../interfaces/api/login.interface'
import {
  RegisterInterface,
  RegisterResponseInterface,
} from '../../interfaces/api/register.interface'

const authAPI = API.enhanceEndpoints({
  addTagTypes: ['Auth'],
}).injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginResponseInterface, LoginInterface>({
      query: (body) => ({
        url: 'auth/login',
        method: 'POST',
        body,
      }),
    }),
    register: build.mutation<RegisterResponseInterface, RegisterInterface>({
      query: (body) => ({
        url: 'auth/register',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useLoginMutation, useRegisterMutation } = authAPI

export default authAPI
