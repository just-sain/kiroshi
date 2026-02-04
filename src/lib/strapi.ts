import axios from 'axios'

// api
export const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_STRAPI_URL,
	headers: {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
	},
	params: {
		populate: '*',
	},
})

// get media url link
export const getMedia = (source: string) => {
	return process.env.NEXT_PUBLIC_MEDIA_URL + source
}
