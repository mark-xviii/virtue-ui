import { API } from '.'
import { UserType } from '../../types/user.type'

const userAPI = API.enhanceEndpoints({
  addTagTypes: ['User'],
}).injectEndpoints({
  endpoints: (build) => ({
    findByPublicTag: build.mutation<UserType, string>({
      query: (publicTag) => ({
        url: `users/${publicTag}`,
        method: 'GET',
      }),
    }),
  }),
})

export const { useFindByPublicTagMutation } = userAPI

export default userAPI
