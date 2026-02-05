import { api } from '@lib'
import { keepPreviousData, queryOptions } from '@tanstack/react-query'
import type { IAwardResponse, IPaginationParams, IStrapiResponse } from '@types'

export class AwardsService {
	getAllAwardsOptions = ({ page = 1, pageSize = 10, search, locale }: IPaginationParams<string>) => {
		return queryOptions({
			queryKey: ['awards', page, pageSize, search, locale],
			queryFn: async () => {
				const { data } = await api.get<IStrapiResponse<IAwardResponse[]> | null>('/api/awards', {
					params: {
						locale: locale,
						populate: undefined,
						'populate[photo][populate]': '*',
						'populate[event][populate]': '*',
						pagination: {
							page,
							pageSize,
						},
					},
				})

				return data || null
			},
			retry: false,
			placeholderData: keepPreviousData,
		})
	}
}
