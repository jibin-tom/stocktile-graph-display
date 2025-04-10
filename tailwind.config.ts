
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
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
				},
				finance: {
					green: '#22c55e',
					red: '#ef4444',
					blue: '#3b82f6',
					darkBlue: '#1e40af',
					lightGray: '#f3f4f6',
					darkGray: '#1f2937'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
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
				},
				'pulse-rainbow': {
					'0%, 100%': { 
						boxShadow: '0 0 15px 5px rgba(255, 0, 0, 0.7)' 
					},
					'25%': { 
						boxShadow: '0 0 15px 5px rgba(255, 255, 0, 0.7)' 
					},
					'50%': { 
						boxShadow: '0 0 15px 5px rgba(0, 255, 0, 0.7)' 
					},
					'75%': { 
						boxShadow: '0 0 15px 5px rgba(0, 0, 255, 0.7)' 
					}
				},
				'spin-slow': {
					from: {
						transform: 'rotate(0deg)'
					},
					to: {
						transform: 'rotate(360deg)'
					}
				},
				'color-cycle': {
					'0%, 100%': { 
						color: '#3b82f6' 
					},
					'25%': { 
						color: '#ef4444' 
					},
					'50%': { 
						color: '#22c55e' 
					},
					'75%': { 
						color: '#f59e0b' 
					}
				},
				'float': {
					'0%, 100%': { 
						transform: 'translateY(0)' 
					},
					'50%': { 
						transform: 'translateY(-10px)' 
					}
				},
				'market-scroll': {
					'0%': {
						transform: 'translateX(0)'
					},
					'100%': {
						transform: 'translateX(-50%)'
					}
				},
				'rainbow-rotate': {
					'0%': {
						transform: 'rotate(0deg)'
					},
					'100%': {
						transform: 'rotate(360deg)'
					}
				},
				'border-flow': {
					'0%': {
						transform: 'rotate(0deg)',
						borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
						backgroundPosition: '0% 0%'
					},
					'25%': {
						transform: 'rotate(-90deg)',
						borderRadius: '58% 42% 75% 25% / 76% 46% 54% 24%',
						backgroundPosition: '25% 50%'
					},
					'50%': {
						transform: 'rotate(-180deg)',
						borderRadius: '50% 50% 20% 80% / 25% 80% 20% 75%',
						backgroundPosition: '50% 100%'
					},
					'75%': {
						transform: 'rotate(-270deg)',
						borderRadius: '30% 70% 70% 30% / 30% 52% 48% 70%',
						backgroundPosition: '75% 50%'
					},
					'100%': {
						transform: 'rotate(-360deg)',
						borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
						backgroundPosition: '0% 0%'
					}
				},
				'float-random': {
					'0%': { transform: 'translate(0, 0) rotate(0deg)' },
					'25%': { transform: 'translate(50px, -30px) rotate(90deg)' },
					'50%': { transform: 'translate(100px, 40px) rotate(180deg)' },
					'75%': { transform: 'translate(0px, 100px) rotate(270deg)' },
					'100%': { transform: 'translate(0, 0) rotate(360deg)' }
				},
				'bounce-slow': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'pulse-subtle': {
					'0%, 100%': {
						boxShadow: '0 0 0 rgba(168, 85, 247, 0.4)'
					},
					'50%': {
						boxShadow: '0 0 10px rgba(168, 85, 247, 0.6)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-rainbow': 'pulse-rainbow 4s infinite',
				'spin-slow': 'spin-slow 6s linear infinite',
				'color-cycle': 'color-cycle 4s infinite',
				'float': 'float 3s ease-in-out infinite',
				'market-scroll': 'market-scroll 30s linear infinite',
				'rainbow-rotate': 'rainbow-rotate 4s linear infinite',
				'float-random': 'float-random 20s linear infinite',
				'bounce-slow': 'bounce-slow 3s ease-in-out infinite',
				'border-flow': 'border-flow 8s linear infinite',
				'pulse-subtle': 'pulse-subtle 2s infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
