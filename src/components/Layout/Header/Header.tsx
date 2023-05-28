import {Link} from 'react-router-dom'
import {ToggleThemeMode} from 'src/components/ToggleThemeMode/ToggleThemeMode'

import s from './Header.module.css'
import {useSelector} from 'react-redux'
import {selectSearchQuery} from 'reducers/books'

export const Header = () => {
	const searchQuery = useSelector(selectSearchQuery)

	return (
		<div className={s.Root}>
			<Link to={searchQuery ? `./?search=${searchQuery}` : '..'}>Books for everyone</Link>
			<ToggleThemeMode />
		</div>
	)
}
