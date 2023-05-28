import {useState} from 'react'
import {Button} from 'common/Button/Button'
import {useThemeMode, Themes} from 'src/hooks/useThemeMode'
import classNames from 'classnames/bind'

import s from './ToggleThemeMode.module.css'

export const ToggleThemeMode = () => {
	const {theme, supportedThemes, setTheme} = useThemeMode()
	const [currentThemeMode, setCurrentThemeMode] = useState<Themes>(theme)

	const cx = classNames.bind(s)

	const handleDarkThemeClick = () => {
		setTheme(supportedThemes.dark as Themes)
		setCurrentThemeMode(supportedThemes.dark as Themes)
	}

	const handleLightThemeClick = () => {
		setTheme(supportedThemes.light as Themes)
		setCurrentThemeMode(supportedThemes.light as Themes)
	}

	return (
		<div className={s.Root}>
			<Button
				classNames={cx({
					button: true,
					button1: true,
					active: currentThemeMode === supportedThemes.light,
				})}
				onClick={handleLightThemeClick}
			>
				Light
			</Button>

			<Button
				classNames={cx({
					button: true,
					button2: true,
					active: currentThemeMode === supportedThemes.dark,
				})}
				onClick={handleDarkThemeClick}
			>
				Dark
			</Button>
		</div>
	)
}
