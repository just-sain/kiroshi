import { api } from '@lib'
import { queryOptions } from '@tanstack/react-query'
import type { IMediaResponse, IStrapiResponse } from '@types'

// main response
export interface Series {
	id: number
	url: string
}

interface IMainResponse {
	id: number
	documentId: string
	createdAt: string
	updatedAt: string
	publishedAt: string
	scroller: IMediaResponse[]
	series: Series[]
}

export class PageService {
	// get me
	getMainOptions = () => {
		return queryOptions({
			queryKey: ['main'],
			queryFn: async () => {
				const { data } = await api.get<IStrapiResponse<IMainResponse> | null>('/api/main')

				if (!data) {
					return null
				}

				return data.data
			},
			retry: false,
		})
	}
}
