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

// download photo
export const downloadPhoto = async (url: string, filename: string) => {
	try {
		const response = await fetch(url)
		const blob = await response.blob()
		const blobUrl = window.URL.createObjectURL(blob)

		const link = document.createElement('a')

		link.href = blobUrl
		link.download = filename || 'photo.jpg'
		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)
		window.URL.revokeObjectURL(blobUrl)
	} catch (error) {
		console.error('Ошибка при скачивании:', error)
		// Если fetch не удался (CORS), просто открываем в новом окне
		window.open(url, '_blank')
	}
}
