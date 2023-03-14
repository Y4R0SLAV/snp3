import s from './Modal.module.css'
import {Formik, Form, useField, FieldHookConfig} from 'formik'
import {BookItemType} from '../Catalog/BookItems/BookItem/BookItem'
import * as Yup from 'yup'
import classNames from 'classnames/bind'

const BlockBox: React.FC<{title: string; errorMessage: string; children: React.ReactNode}> = ({
	title,
	errorMessage,
	children,
}) => {
	const cx = classNames.bind(s)
	return (
		<div className={s.block}>
			<div className={s.label}>{title}</div>
			{children}
			<div className={cx({error: true, hide: !errorMessage})}>{errorMessage}</div>
		</div>
	)
}

const FormikCustomInput = (props: FieldHookConfig<string>) => {
	const [field] = useField(props)

	return (
		<input
			className={s.input}
			{...field}
			placeholder={props.placeholder}
			type={props.type}
		/>
	)
}

const FormikCustomTextarea = (props: FieldHookConfig<string>) => {
	const [field] = useField(props)
	const title = props.title

	return (
		<div className={s.block}>
			<div className={s.label}>{title}</div>
			<textarea
				className={s.textarea}
				{...field}
				placeholder={props.placeholder}
			/>
		</div>
	)
}

const SignupSchema = Yup.object().shape({
	ISBN: Yup.string()
		.matches(/^[0-9]+$/, 'Invalid ISBN-13: Must be only digits')
		.min(13, 'Invalid ISBN-13: it must contain 13 digit')
		.max(13, 'Invalid ISBN-13: it must contain 13 digit')
		.required('Required'),
	publishYear: Yup.number().moreThan(
		400,
		'Invalid year of published: The book should be printed on paper, not written on clay tablets',
	),
	imgSrc: Yup.string()
		.url('Invalid url: Enter a correct adress to a book cover')
		.required('Url is required'),
	title: Yup.string().required('Title is required'),
	author: Yup.string().required('Author is required'),
	publisher: Yup.string().required('Publisher is required'),
	description: Yup.string().required('Description is required'),
})

const ModalForm = () => {
	return (
		<Formik
			initialValues={
				{
					title: '',
					author: '',
					imgSrc: '',
					publisher: '',
					ISBN: '',
					publishYear: 2000,
					description: '',
				} as BookItemType
			}
			validationSchema={SignupSchema}
			onSubmit={(values, {setSubmitting}) => {
				setTimeout(() => {
					alert(JSON.stringify(values, null, 2))

					setSubmitting(false)
				}, 400)
			}}
		>
			{({isSubmitting, errors, touched}) => (
				<Form className={s.form}>
					<BlockBox
						title='Title'
						errorMessage={errors.title && touched.title ? errors.title : ''}
					>
						<FormikCustomInput name='title' />
					</BlockBox>

					<BlockBox
						title='Author'
						errorMessage={errors.author && touched.author ? errors.author : ''}
					>
						<FormikCustomInput name='author' />
					</BlockBox>

					<BlockBox
						title='Url of the book cover'
						errorMessage={errors.imgSrc && touched.imgSrc ? errors.imgSrc : ''}
					>
						<FormikCustomInput name='imgSrc' />
					</BlockBox>

					<BlockBox
						title='Publisher'
						errorMessage={errors.publisher && touched.publisher ? errors.publisher : ''}
					>
						<FormikCustomInput name='publisher' />
					</BlockBox>

					<BlockBox
						title='ISBN-13'
						errorMessage={errors.ISBN && touched.ISBN ? errors.ISBN : ''}
					>
						<FormikCustomInput name='ISBN' />
					</BlockBox>

					<BlockBox
						title='Year of publication'
						errorMessage={errors.publishYear && touched.publishYear ? errors.publishYear : ''}
					>
						<FormikCustomInput
							type='number'
							name='publishYear'
						/>
					</BlockBox>

					<BlockBox
						title='Description'
						errorMessage={errors.description && touched.description ? errors.description : ''}
					>
						<FormikCustomTextarea
							as='textarea'
							name='description'
						/>
					</BlockBox>

					<div className={s.button}>
						<button
							type='submit'
							disabled={isSubmitting}
							className={s.button}
						>
							Submit
						</button>
					</div>
				</Form>
			)}
		</Formik>
	)
}

export const Modal = () => {
	return (
		<div className={s.Root}>
			<div className={s.content}>
				<div className={s.title}>Adding the book</div>
				<ModalForm />
			</div>
		</div>
	)
}
