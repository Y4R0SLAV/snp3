import s from './FormikButton.module.css'

export const FormikButton: React.FC<{title: string; onClick?: () => void}> = ({title, onClick}) => {
	return (
		<div className={s.Root}>
			<button
				onClick={onClick}
				type='submit'
				className={s.button}
			>
				{title}
			</button>
		</div>
	)
}
