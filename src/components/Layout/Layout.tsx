import {Footer} from './Footer/Footer'
import {Header} from './Header/Header'

export const Layout: React.FC<{children: React.ReactNode | Array<React.ReactNode>}> = ({
	children,
}) => {
	return (
		<>
			<Header />
			{children}
			<Footer />
		</>
	)
}
