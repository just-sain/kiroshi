import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	images: {
		domains: ['192.168.49.15', '192.168.49.15:1337', 'http://192.168.49.15:1337', 'kiroshi.aspc.kz'],
		unoptimized: true,
	},
	turbopack: {
		rules: {
			'*.svg': {
				loaders: [
					{
						loader: '@svgr/webpack',
						options: {
							icon: true,
						},
					},
				],
				as: '*.js',
			},
		},
	},
}

export default nextConfig
