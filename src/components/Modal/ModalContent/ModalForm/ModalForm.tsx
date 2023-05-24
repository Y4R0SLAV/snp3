import {useState} from 'react'
import {Formik, Form} from 'formik'
import * as Yup from 'yup'
import {useDispatch, useSelector} from 'react-redux'
import {
	asyncAddBook,
	asyncRemoveBook,
	asyncEditBook,
	toggleModalWindow,
	selectBookIsPending,
} from 'reducers/books'
import {BookItemType} from 'components/Catalog/BookItems/BookItem/BookItem'

import {BlockBox} from './FormParts/BlockBox/BlockBox'
import {FormikCustomInput} from './FormParts/FormikInput/FormikInput'
import {FormikCustomTextarea} from './FormParts/FormikTextarea/FormikTextarea'
import {FormikButton} from './FormParts/FormikButton/FormikButton'
import s from './ModalForm.module.css'
import {getCurrentYear} from 'src/utils/functions'
import Preloader from 'src/components/common/Preloader/Preloader'

const SignupSchema = Yup.object().shape({
	ISBN: Yup.string().matches(/^[0-9]+$/, 'Invalid ISBN-13: Must be only digits'),
	publishYear: Yup.number()
		.moreThan(
			400,
			'Invalid year of published: The book should be printed on paper, not written on clay tablets',
		)
		.lessThan(
			getCurrentYear() + 1,
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

	const bookIsPending = useSelector(selectBookIsPending)
	if (bookIsPending) {
		return <Preloader />
	}

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

	const addHandler = () => {
		setSubmitButtonState('add')
	}
	const saveHandler = () => {
		setSubmitButtonState('save')
	}
	const removeHandler = () => {
		dispatch(asyncRemoveBook(initialValue?.id || -1))
		dispatch(toggleModalWindow())
	}

	return (
		<Formik
			enableReinitialize
			initialValues={formValue}
			validationSchema={SignupSchema}
			onSubmit={(values, {resetForm}) => {
				switch (submitButtonState) {
					case 'add':
						dispatch(asyncAddBook(values))
						break
					case 'save':
						// id всегда будет, т.к. если я попал в editMode, то точно передал initialState
						const newBook = {...values, id: initialValue?.id || -1}
						dispatch(asyncEditBook(newBook))
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
								onClick={() => saveHandler()}
								title='Save'
							/>

							<FormikButton
								onClick={() => removeHandler()}
								title='Remove'
								type='button'
							/>
						</div>
					) : (
						<FormikButton
							title='Add the book to a catalog'
							onClick={() => addHandler()}
						/>
					)}
				</Form>
			)}
		</Formik>
	)
}
