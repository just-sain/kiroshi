import { api } from '@lib'
import { keepPreviousData, queryOptions } from '@tanstack/react-query'
import type { INewsResponse, IPaginationParams, IStrapiResponse } from '@types'

export class NewsService {
	getAllNewsesOptions = ({
		page = 1,
		pageSize = 10,
		search,
		locale,
	}: IPaginationParams<{ name: { $containsi: string } } | undefined>) => {
		return queryOptions({
			queryKey: ['newses', page, pageSize, search, locale],
			queryFn: async () => {
				const { data } = await api.get<IStrapiResponse<INewsResponse[]> | null>('/api/newses', {
					params: {
						locale: locale,
						pagination: {
							page,
							pageSize,
						},
						sort: 'date:desc',
						filters: search,
					},
				})

				return data || null
			},
			retry: false,
			placeholderData: keepPreviousData,
		})
	}

	// get portfolio by document id
	getNewsByDocumentIdOption = (id: string, locale: string) => {
		return queryOptions({
			queryKey: ['news', id, locale],
			queryFn: async () => {
				const { data } = await api.get<IStrapiResponse<INewsResponse> | null>(`/api/newses/${id}`, {
					params: {
						locale: locale,
					},
				})

				return data?.data || null
			},
			retry: false,
		})
	}
}
