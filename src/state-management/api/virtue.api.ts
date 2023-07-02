import { API } from '.'
import { UpdateVirtueInterface } from '../../interfaces/api/virtue.interface'
import { VirtueType } from '../../types/virtue.type'

const virtueAPI = API.enhanceEndpoints({
  addTagTypes: ['Virtue'],
}).injectEndpoints({
  endpoints: (build) => ({
    getFeed: build.mutation<VirtueType[], null>({
      query: () => ({
        url: `virtues/feed`,
        method: 'GET',
      }),
    }),
    findVirtuesByPublicTag: build.mutation<VirtueType[], string>({
      query: (publicTag) => ({
        url: `virtues/user/${publicTag}`,
        method: 'GET',
      }),
    }),
    createVirtue: build.mutation<VirtueType, string>({
      query: (text) => ({
        url: 'virtues',
        method: 'POST',
        body: { text },
      }),
    }),
    updateVirtue: build.mutation<VirtueType, UpdateVirtueInterface>({
      query: (obj) => ({
        url: `virtues/${obj.virtueId}`,
        method: 'PUT',
        body: { text: obj.text },
      }),
    }),
    deleteVirtue: build.mutation<unknown, string>({
      query: (virtueId) => ({
        url: `virtues/${virtueId}`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const {
  useFindVirtuesByPublicTagMutation,
  useCreateVirtueMutation,
  useDeleteVirtueMutation,
  useUpdateVirtueMutation,
  useGetFeedMutation,
} = virtueAPI

export default virtueAPI
