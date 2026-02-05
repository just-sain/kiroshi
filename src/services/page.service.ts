import { api } from '@lib'
import { queryOptions } from '@tanstack/react-query'
import type { IMediaResponse, ISeriesResponse, IStrapiResponse } from '@types'

// main response
interface IMainResponse {
	id: number
	documentId: string
	createdAt: string
	updatedAt: string
	publishedAt: string
	scroller: IMediaResponse[]
	series: ISeriesResponse[]
}

export class PageService {
	// get me
	getMainOptions = (locale: string) => {
		return queryOptions({
			queryKey: ['main', locale],
			queryFn: async () => {
				const { data } = await api.get<IStrapiResponse<IMainResponse> | null>('/api/main', {
					params: {
						locale: locale,
					},
				})

				if (!data) {
					return null
				}

				return data.data
			},
			retry: false,
		})
	}
}
