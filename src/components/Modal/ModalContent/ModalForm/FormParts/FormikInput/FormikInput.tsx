import s from './FormikInput.module.css'
import {useField, FieldHookConfig} from 'formik'

export const FormikCustomInput = (props: FieldHookConfig<string>) => {
	const [field] = useField(props)

	return (
		<input
			className={s.Root}
			{...field}
			placeholder={props.placeholder}
			type={props.type}
		/>
	)
}
