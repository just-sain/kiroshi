import type { LucideIcon } from 'lucide-react'

const RoleEnum = {
	TEACHER: 'TEACHER',
	STUDENT: 'STUDENT',
	ADMIN: 'ADMIN',
} as const

export type RoleEnum = (typeof RoleEnum)[keyof typeof RoleEnum]

export interface IGroup {
	keycloakId: string
	name: string
	specialty?: string
	qualification?: string
}

export interface IPagination<T> {
	data: T[]
	meta: {
		currentPage: number
		pages: number
		total: number
		pageSize: number
	}
}

export interface IUser {
	keycloakId: string

	username: string
	email?: string
	role: RoleEnum

	firstName: string
	lastName: string
	phone: string

	createdAt: string
	updatedAt: string
}

// navigation
export interface INav {
	title: string
	url: string
	role?: RoleEnum
	items?: {
		icon: LucideIcon
		title: string
		description: string
		url: string
		role?: RoleEnum
	}[]
}

// generic response
export interface IStrapiResponse<T> {
	data: T
	meta: {
		pagination?: {
			page: number
			pageSize: number
			pageCount: number
			total: number
		}
	}
}

// IMediaResponse
export interface IMediaResponse {
	id: number
	documentId: string
	name: string
	width: number
	height: number
	formats: IImageFormatsResponse
	hash: string
	ext: string
	mime: string
	size: number
	url: string
	provider: string
	createdAt: string
	updatedAt: string
	publishedAt: string
}

// formats
export interface IImageFormatsResponse {
	thumbnail: IImageResponse
	small: IImageResponse
	large: IImageResponse
	medium: IImageResponse
}

// image interface
export interface IImageResponse {
	name: string
	hash: string
	ext: string
	mime: string
	width: number
	height: number
	size: number
	sizeInBytes: number
	url: string
}

// author
export interface IAuthor {
	id: number
	documentId: string
	name: string
	email: string
	description: string
	createdAt: string
	updatedAt: string
}

// pagination params
export interface IPaginationParams<T> {
	page?: number
	pageSize?: number
	search?: T
	locale?: string
}
// model response
export interface IModelResponse {
	id: number
	documentId: string
	name: string
	description: string
	downloadCount: number
	likeCount: number
	createdAt: string
	updatedAt: string
	publishedAt: string
	locale: string
	model: string
	author: IAuthor
	poster: IMediaResponse
	localizations: IModelResponse[]
}

// portfolio
export interface IPortfolioResponse {
	id: number
	documentId: string
	name: string
	description: string
	createdAt: string
	updatedAt: string
	publishedAt: string
	locale: string
	poster: IMediaResponse
	event: IEventResponse
	localizations: IPortfolioResponse[]
}

// event
export interface IEventResponse {
	id: number
	documentId: string
	name: string
	date: string
	type: string
	location: string
	createdAt: string
	updatedAt: string
	publishedAt: string
	season: ISeasonResponse
}

// season response
export interface ISeasonResponse {
	id: number
	documentId: string
	name: string
	startYear: string
	description: string
	createdAt: string
	updatedAt: string
	publishedAt: string
}

// award response
export interface IAwardResponse {
	id: number
	documentId: string
	awardName: string
	description: string
	createdAt: string
	updatedAt: string
	publishedAt: string
	photo: IMediaResponse
	event: IEventResponse
}

export interface ISeriesResponse {
	id: number
	url: string
}
