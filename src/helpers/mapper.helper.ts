import { Atom, Box, Code2, Dumbbell, HelpCircle, type LucideIcon, Megaphone, Settings } from 'lucide-react'

export const getProjectIcon = (category: string): LucideIcon => {
	const icons: Record<string, LucideIcon> = {
		physics: Atom,
		training: Dumbbell,
		programming: Code2,
		cad: Box,
		smm: Megaphone,
		engineering: Settings,
	}

	return icons[category.toLowerCase()] ?? HelpCircle
}

export const formatFileSize = (kb: number): string => {
	if (!kb || kb <= 0) return '0 B'

	const units = ['KB', 'MB', 'GB', 'TB']
	let size = kb
	let unitIndex = 0

	while (size >= 1024 && unitIndex < units.length - 1) {
		size /= 1024
		unitIndex++
	}

	return `${size.toFixed(2)} ${units[unitIndex]}`
}

// extract youtube id from url
export const getYouTubeId = (url: string) => {
	const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
	const match = url.match(regExp)

	return match && match[2].length === 11 ? match[2] : url
}
