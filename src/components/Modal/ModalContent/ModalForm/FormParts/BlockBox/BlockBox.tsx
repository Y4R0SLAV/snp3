import s from './BlockBox.module.css'
import classNames from 'classnames/bind'

export const BlockBox: React.FC<{
	title: string
	errorMessage: string
	children: React.ReactNode
}> = ({title, errorMessage, children}) => {
	const cx = classNames.bind(s)
	return (
		<div className={s.Root}>
			<div className={s.label}>{title}</div>
			{children}
			<div className={cx({error: true, hide: !errorMessage})}>{errorMessage}</div>
		</div>
	)
}
