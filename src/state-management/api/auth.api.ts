import { API } from '.'
import {
  LoginInterface,
  LoginResponseInterface,
  UpdateUserPayloadInterface,
  UpdateUserResponseInterface,
} from '../../interfaces/api/auth.interface'
import {
  RegisterInterface,
  RegisterResponseInterface,
} from '../../interfaces/api/auth.interface'

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
    update: build.mutation<
      UpdateUserResponseInterface,
      UpdateUserPayloadInterface
    >({
      query: (body) => ({
        url: `users/me`,
        method: 'PUT',
        body,
      }),
    }),
  }),
})

export const { useLoginMutation, useRegisterMutation, useUpdateMutation } =
  authAPI

export default authAPI
