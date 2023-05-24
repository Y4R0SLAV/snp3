import {getCurrentYear} from 'src/utils/functions'
import s from './Footer.module.css'

export const Footer = () => {
	return <div className={s.Root}>© {getCurrentYear()} All Rights Reserved</div>
}
