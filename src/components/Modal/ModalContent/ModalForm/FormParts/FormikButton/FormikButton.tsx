import {Button} from 'src/components/common/Button/Button'
import s from './FormikButton.module.css'

export const FormikButton: React.FC<{title: string; onClick?: () => void}> = ({title, onClick}) => {
	return (
		<div className={s.Root}>
			<Button
				onClick={onClick}
				props={s.button}
			>
				<button type='submit'>{title}</button>
			</Button>
		</div>
	)
}
