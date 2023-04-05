import {put, takeEvery, call} from 'redux-saga/effects'
import {bookApi} from 'src/api/api'
import {
	initializeBooks,
	addBook,
	removeBook,
	editBook,
	BookItemType,
	setTotalBooksCount,
} from 'reducers/books'
import {PayloadAction} from '@reduxjs/toolkit'

function* fetchBooksWorker(action: PayloadAction<string>) {
	const data: BookItemType[] = yield call(bookApi.getBooks, action.payload)
	const count: number = yield call(bookApi.getTotalBooksCount)
	yield put(initializeBooks(data))
	yield put(setTotalBooksCount(count))
}

function* addBookWorker(action: PayloadAction<BookItemType>) {
	yield call(bookApi.addBook, action.payload)
	yield put(addBook(action.payload))
}

function* removeBookWorker(action: PayloadAction<number>) {
	yield call(bookApi.removeBook, action.payload.toString())
	yield put(removeBook(action.payload))
}

function* editBookWorker(action: PayloadAction<BookItemType>) {
	yield call(bookApi.editBook, action.payload)
	yield put(editBook(action.payload))
}

export function* bookWatcher() {
	yield takeEvery('books/fetchBooks', fetchBooksWorker)
	yield takeEvery('books/asyncAddBook', addBookWorker)
	yield takeEvery('books/asyncRemoveBook', removeBookWorker)
	yield takeEvery('books/asyncEditBook', editBookWorker)
}
