import {useState, useLayoutEffect} from 'react'

export const supportedThemes = {
	light: 'light',
	dark: 'dark',
}

export type Themes = keyof typeof supportedThemes

export const useThemeMode = () => {
	const storageKey = 'theme-mode'

	const getTheme = (): Themes => {
		let theme = localStorage.getItem(storageKey)

		if (!theme) {
			localStorage.setItem(storageKey, supportedThemes.light)
			theme = supportedThemes.light
		}

		return theme as Themes
	}

	const defaultValue = getTheme()
	const [theme, setTheme] = useState(defaultValue)

	useLayoutEffect(() => {
		document.documentElement.setAttribute('data-theme', theme)
		localStorage.setItem(storageKey, theme)
	}, [theme])

	return {theme, supportedThemes, setTheme}
}
