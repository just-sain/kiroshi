import { api } from '@lib'
import { keepPreviousData, queryOptions } from '@tanstack/react-query'
import type { IPaginationParams, IPortfolioResponse, IStrapiResponse } from '@types'

export class PortfolioService {
	getAllPortfoliosOptions = ({
		page = 1,
		pageSize = 10,
		search,
		locale,
	}: IPaginationParams<{ name: { $containsi: string } } | undefined>) => {
		return queryOptions({
			queryKey: ['portfolios', page, pageSize, search, locale],
			queryFn: async () => {
				const { data } = await api.get<IStrapiResponse<IPortfolioResponse[]> | null>('/api/portfolios', {
					params: {
						locale: locale,
						populate: undefined,
						'populate[poster][populate]': '*',
						'populate[event][populate]': '*',
						pagination: {
							page,
							pageSize,
						},
						sort: 'createdAt:desc',
						filters: search,
					},
				})

				return data || null
			},
			retry: false,
			placeholderData: keepPreviousData,
		})
	}

	// get model by id
	getPortfolioByDocumentIdOption = (id: string, locale: string) => {
		return queryOptions({
			queryKey: ['portfolio', id, locale],
			queryFn: async () => {
				const { data } = await api.get<IStrapiResponse<IPortfolioResponse> | null>(`/api/portfolios/${id}`, {
					params: {
						locale: locale,
						populate: undefined,
						'populate[poster][populate]': '*',
						'populate[event][populate]': '*',
					},
				})

				return data?.data || null
			},
			retry: false,
		})
	}
}
