import {put, takeEvery, call} from 'redux-saga/effects'
import {bookApi} from 'src/api/api'
import {
	addBook,
	removeBook,
	editBook,
	BookItemType,
	setTotalBooksCount,
	fetchBookSuccess,
	fetchBookFailure,
	fetchBooksSuccess,
	fetchBooksFailure,
} from 'reducers/books'
import {PayloadAction} from '@reduxjs/toolkit'
import {toast} from 'react-hot-toast'

function* fetchBooksWorker(action: PayloadAction<string>) {
	try {
		const data: BookItemType[] = yield call(bookApi.getBooks, action.payload)
		const count: number = yield call(bookApi.getTotalBooksCount)
		yield put(fetchBooksSuccess(data))
		yield put(setTotalBooksCount(count))
	} catch (error: any) {
		yield put(fetchBooksFailure(error.message || 'An unknown error occurred'))
	}
}

function* fetchBookWorker(action: PayloadAction<string>) {
	try {
		const data: BookItemType = yield call(bookApi.getBook, action.payload)
		yield put(fetchBookSuccess(data))
	} catch (error: any) {
		yield put(fetchBookFailure(error.message || 'An unknown error occurred'))
	}
}

function* addBookWorker(action: PayloadAction<BookItemType>) {
	try {
		yield call(bookApi.addBook, action.payload)
		yield put(addBook(action.payload))
		yield toast.success('Book has been added')
	} catch (error: any) {
		yield toast.error(error.message)
	}
}

function* removeBookWorker(action: PayloadAction<number>) {
	try {
		yield call(bookApi.removeBook, action.payload.toString())
		yield put(removeBook(action.payload))
		yield toast.success('Book has been removed')
	} catch (error: any) {
		yield toast.error(error.message)
	}
}

function* editBookWorker(action: PayloadAction<BookItemType>) {
	try {
		yield call(bookApi.editBook, action.payload)
		yield put(editBook(action.payload))
		yield toast.success('Book has been edited')
	} catch (error: any) {
		yield toast.error(error.message)
	}
}

export function* bookWatcher() {
	yield takeEvery('books/fetchBooks', fetchBooksWorker)
	yield takeEvery('books/fetchBook', fetchBookWorker)
	yield takeEvery('books/asyncAddBook', addBookWorker)
	yield takeEvery('books/asyncRemoveBook', removeBookWorker)
	yield takeEvery('books/asyncEditBook', editBookWorker)
}
