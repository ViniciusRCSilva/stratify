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
    		backgroundImage: {
    			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
    			'dot-pattern': 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px)'
    		},
    		backgroundSize: {
    			'dot-lg': '24px 24px'
    		},
    		animation: {
    			pulse: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    			float: 'float 15s ease-in-out infinite',
    			'accordion-down': 'accordion-down 0.2s ease-out',
    			'accordion-up': 'accordion-up 0.2s ease-out'
    		},
    		keyframes: {
    			pulse: {
    				'0%, 100%': {
    					opacity: '0.5'
    				},
    				'50%': {
    					opacity: '0'
    				}
    			},
    			float: {
    				'0%': {
    					transform: 'translate(0%, 0%)'
    				},
    				'25%': {
    					transform: 'translate(25%, 25%)'
    				},
    				'50%': {
    					transform: 'translate(0%, 50%)'
    				},
    				'75%': {
    					transform: 'translate(-25%, 25%)'
    				},
    				'100%': {
    					transform: 'translate(0%, 0%)'
    				}
    			},
    			'accordion-down': {
    				from: {
    					height: '0'
    				},
    				to: {
    					height: 'var(--radix-accordion-content-height)'
    				}
    			},
    			'accordion-up': {
    				from: {
    					height: 'var(--radix-accordion-content-height)'
    				},
    				to: {
    					height: '0'
    				}
    			}
    		},
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
    			warning: {
    				DEFAULT: '#FBBF24',
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
