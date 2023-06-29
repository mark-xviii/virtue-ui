import { API } from '.'
import {
  LoginInterface,
  LoginResponseInterface,
} from '../../interfaces/api/login.interface'

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
  }),
})

export const { useLoginMutation } = authAPI

export default authAPI
