import {Button} from 'common/Button/Button'
import {useThemeMode, Themes} from 'src/hooks/useThemeMode'
import classNames from 'classnames/bind'

import s from './ToggleThemeMode.module.css'

export const ToggleThemeMode = () => {
	const {supportedThemes, setTheme} = useThemeMode()
	const cx = classNames.bind(s)

	const handleDarkThemeClick = () => {
		setTheme(supportedThemes.dark as Themes)
	}

	const handleLightThemeClick = () => {
		setTheme(supportedThemes.light as Themes)
	}

	return (
		<div className={s.Root}>
			<Button
				classNames={cx({button: true, button1: true})}
				onClick={handleLightThemeClick}
			>
				Light
			</Button>

			<Button
				classNames={cx({button: true, button2: true})}
				onClick={handleDarkThemeClick}
			>
				Dark
			</Button>
		</div>
	)
}
