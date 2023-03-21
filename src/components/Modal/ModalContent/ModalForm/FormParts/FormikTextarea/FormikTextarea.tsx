import s from './FormikTextarea.module.css'
import {useField, FieldHookConfig} from 'formik'

export const FormikCustomTextarea = (props: FieldHookConfig<string>) => {
	const [field] = useField(props)

	return (
		<textarea
			className={s.Root}
			{...field}
			placeholder={props.placeholder}
		/>
	)
}
