import { notFound } from 'next/navigation'

export default function CatchAll() {
	notFound() // Это принудительно вызовет ваш [locale]/not-found.tsx
}
