import {Footer} from './Footer/Footer'
import {Header} from './Header/Header'
import s from './Layout.module.css'

export const Layout: React.FC<{children: React.ReactNode | Array<React.ReactNode>}> = ({
	children,
}) => {
	return (
		<div className={s.Root}>
			<Header />
			<div className={s.content}>{children}</div>
			<Footer />
		</div>
	)
}
