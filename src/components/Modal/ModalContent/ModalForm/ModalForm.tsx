import {useState} from 'react'
import {Formik, Form} from 'formik'
import * as Yup from 'yup'
import {useDispatch} from 'react-redux'
import {BookItemType} from 'components/Catalog/BookItems/BookItem/BookItem'
import {addBook, editBook, removeBook, toggleModalWindow} from 'reducers/books'

import {BlockBox} from './FormParts/BlockBox/BlockBox'
import {FormikCustomInput} from './FormParts/FormikInput/FormikInput'
import {FormikCustomTextarea} from './FormParts/FormikTextarea/FormikTextarea'
import {FormikButton} from './FormParts/FormikButton/FormikButton'

import s from './ModalForm.module.css'
import {getCurrentYear} from 'src/utils/functions'

const SignupSchema = Yup.object().shape({
	ISBN: Yup.string().matches(/^[0-9]+$/, 'Invalid ISBN-13: Must be only digits'),
	publishYear: Yup.number()
		.moreThan(
			400,
			'Invalid year of published: The book should be printed on paper, not written on clay tablets',
		)
		.lessThan(
			getCurrentYear(),
			'Invalid year of published: Еhe entered value exceeds the current year',
		),
	imgSrc: Yup.string()
		.url('Invalid url: Enter a correct adress to a book cover')
		.required('Url is required'),
	title: Yup.string().required('Title is required'),
	author: Yup.string().required('Author is required'),
	publisher: Yup.string().required('Publisher is required'),
	description: Yup.string().required('Description is required'),
})

export const ModalForm: React.FC<{initialValue?: BookItemType; editing?: boolean}> = ({
	initialValue,
	editing = false,
}) => {
	const dispatch = useDispatch()
	type submitButtonType = 'add' | 'remove' | 'save'
	const [submitButtonState, setSubmitButtonState] = useState<submitButtonType>('add')

	let formValue = {
		title: '',
		author: '',
		imgSrc: '',
		publisher: '',
		ISBN: '',
		publishYear: 2000,
		description: '',
	} as BookItemType

	if (editing && initialValue) {
		formValue = initialValue
	}

	return (
		<Formik
			enableReinitialize
			initialValues={formValue}
			validationSchema={SignupSchema}
			onSubmit={(values, {resetForm}) => {
				switch (submitButtonState) {
					case 'add':
						dispatch(addBook(values))
						break
					case 'save':
						// id всегда будет, т.к. если я попал в editMode, то точно передал initialState
						const newBook = {...values, id: initialValue?.id || -1}
						dispatch(editBook(newBook))
						break

					case 'remove':
						// то же самое, id всегда найдётся
						console.log(initialValue?.id)
						dispatch(removeBook(initialValue?.id || -1))
						break

					default:
						break
				}

				dispatch(toggleModalWindow())
				resetForm()
			}}
		>
			{({errors, touched}) => (
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

					{editing ? (
						<div className={s.buttons}>
							<FormikButton
								onClick={() => setSubmitButtonState('save')}
								title='Save'
							/>

							<FormikButton
								onClick={() => setSubmitButtonState('remove')}
								title='Remove'
							/>
						</div>
					) : (
						<FormikButton
							title='Add the book to a catalog'
							onClick={() => setSubmitButtonState('add')}
						/>
					)}
				</Form>
			)}
		</Formik>
	)
}
