import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: '#121212',
				foreground: '#FFFFFF',
				card: {
					DEFAULT: '#1E1E1E',
					foreground: '#FFFFFF'
				},
				popover: {
					DEFAULT: '#1E1E1E',
					foreground: '#FFFFFF'
				},
				primary: {
					DEFAULT: '#FFFFFF',
					foreground: '#121212'
				},
				secondary: {
					DEFAULT: '#7AA2F7',
					foreground: '#FFFFFF'
				},
				muted: {
					DEFAULT: '#2A2A2A',
					foreground: '#A1A1AA'
				},
				accent: {
					DEFAULT: '#7AA2F7',
					foreground: '#FFFFFF'
				},
				success: {
					DEFAULT: '#22C55E',
					foreground: '#FFFFFF'
				},
				destructive: {
					DEFAULT: '#FF5555',
					foreground: '#FFFFFF'
				},
				border: '#2A2A2A',
				input: '#2A2A2A',
				ring: '#7AA2F7',
				chart: {
					'1': '#7AA2F7',
					'2': '#9CABF7',
					'3': '#BDB4F7',
					'4': '#DEBDF7',
					'5': '#FFC6F7'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			}
		}
	},
	// eslint-disable-next-line @typescript-eslint/no-require-imports
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
