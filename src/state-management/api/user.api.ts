import { API } from '.'
import { UserType } from '../../types/user.type'

const userAPI = API.enhanceEndpoints({
  addTagTypes: ['User'],
}).injectEndpoints({
  endpoints: (build) => ({
    whoAmI: build.mutation<UserType, null>({
      query: () => ({
        url: 'auth/who-am-i',
        method: 'GET',
      }),
    }),
    findByPublicTag: build.mutation<UserType, string>({
      query: (publicTag) => ({
        url: `users/${publicTag}`,
        method: 'GET',
      }),
    }),
    subscribe: build.mutation<UserType, string>({
      query: (publicTag) => ({
        url: `users/subscribe/${publicTag}`,
        method: 'POST',
      }),
    }),
  }),
})

export const {
  useFindByPublicTagMutation,
  useSubscribeMutation,
  useWhoAmIMutation,
} = userAPI

export default userAPI
