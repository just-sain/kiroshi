import { api } from '@lib'
import { keepPreviousData, queryOptions } from '@tanstack/react-query'
import type { IModelResponse, IPaginationParams, IStrapiResponse } from '@types'

// ModelService.ts
export class ModelService {
	getAllModelsOptions = ({
		page = 1,
		pageSize = 10,
		search,
		locale,
	}: IPaginationParams<{ name: { $containsi: string } } | undefined>) => {
		return queryOptions({
			queryKey: ['models', page, pageSize, search, locale],
			queryFn: async () => {
				const { data } = await api.get<IStrapiResponse<IModelResponse[]> | null>('/api/models', {
					params: {
						locale: locale,
						pagination: {
							page,
							pageSize,
						},
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
	getModelByDocumentIdOption = (id: string, locale: string) => {
		return queryOptions({
			queryKey: ['model', id, locale],
			queryFn: async () => {
				const { data } = await api.get<IStrapiResponse<IModelResponse> | null>(`/api/models/${id}`, {
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
