import {Button} from 'common/Button/Button'
import s from './FormikButton.module.css'

type typeType = 'submit' | 'button' | 'reset' | undefined

export const FormikButton: React.FC<{title: string; onClick?: () => void; type?: typeType}> = ({
	title,
	onClick,
	type = 'submit',
}) => {
	return (
		<div className={s.Root}>
			<Button
				onClick={onClick}
				classNames={s.button}
			>
				<button type={type}>{title}</button>
			</Button>
		</div>
	)
}
