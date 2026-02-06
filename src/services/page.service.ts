import { api } from '@lib'
import { queryOptions } from '@tanstack/react-query'
import type {
	IAuthor,
	IEventResponse,
	IMediaResponse,
	IProjectsResponse,
	ISeasonResponse,
	ISeriesResponse,
	IStrapiResponse,
} from '@types'

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

// atc response
interface IAtcResponse {
	id: number
	documentId: string
	name: string
	shortDescription: string
	fullName: string
	fullDescription: string
	graphicDescription: string
	configDescription: string
	moreThanDescription: string
	createdAt: string
	updatedAt: string
	publishedAt: string
	locale: string
	poster: IMediaResponse
	season: ISeasonResponse
	authors: IAuthor[]
	game: IMediaResponse
	// documentation: any
	screenshots: IMediaResponse[]
}

// courses
interface ICoursesResponse {
	id: number
	documentId: string
	order: number
	link: string
	name: string
	description: string
	createdAt: string
	updatedAt: string
	publishedAt: string
	locale: string
	duration: string
	season: ISeasonResponse
}

interface IGalleryResponse {
	id: string
	documentId: string
	name: string
	event: IEventResponse
	medias: IMediaResponse[]
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

	// projects page
	getProjectsOptions = (locale: string) => {
		return queryOptions({
			queryKey: ['projects', locale],
			queryFn: async () => {
				const { data } = await api.get<IStrapiResponse<IProjectsResponse[]> | null>('/api/projects', {
					params: {
						locale: locale,
						pagination: {
							page: 1,
							pageSize: 20,
						},
						sort: 'createdAt:desc',
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

	// atc
	getAtcOptions = (locale: string) => {
		return queryOptions({
			queryKey: ['atc', locale],
			queryFn: async () => {
				const { data } = await api.get<IStrapiResponse<IAtcResponse> | null>('/api/atc', {
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

	// courses page
	getCoursesOptions = (locale: string) => {
		return queryOptions({
			queryKey: ['courses', locale],
			queryFn: async () => {
				const { data } = await api.get<IStrapiResponse<ICoursesResponse[]> | null>('/api/courses', {
					params: {
						locale: locale,
						pagination: {
							page: 1,
							pageSize: 20,
						},
						sort: 'order:asc',
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

	// gallery page
	getGalleriesOptions = (locale: string) => {
		return queryOptions({
			queryKey: ['galleries', locale],
			queryFn: async () => {
				const { data } = await api.get<IStrapiResponse<IGalleryResponse[]> | null>('/api/galleries', {
					params: {
						locale: locale,
						populate: undefined,
						'populate[medias][populate]': '*',
						'populate[event][populate]': '*',
						'sort[event][date]': 'desc',
						pagination: {
							page: 1,
							pageSize: 100,
						},
					},
				})

				if (!data) return null

				return data
			},
			retry: false,
		})
	}

	// gallery get by document id
	getGalleryByDocumentIdOptions = (documentId: string, locale: string) => {
		return queryOptions({
			queryKey: ['gallery', documentId, locale],
			queryFn: async () => {
				const { data } = await api.get<IStrapiResponse<IGalleryResponse> | null>(`/api/galleries/${documentId}`, {
					params: {
						locale: locale,
						populate: undefined,
						'populate[medias][populate]': '*',
						'populate[event][populate]': '*',
					},
				})

				if (!data) return null

				return data
			},
			retry: false,
		})
	}
}
