import {Link} from 'react-router-dom'
import s from './Header.module.css'

export const Header = () => {
	return (
		<div className={s.Root}>
			<Link to={'..'}>Books for everyone</Link>{' '}
		</div>
	)
}
