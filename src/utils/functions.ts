export const getCurrentYear = () => {
	return new Date().getFullYear()
}

export const formateString = (str: string) => (str.length > 20 ? `${str.slice(0, 18)}...` : str)

export const exhaustiveCheck = (param: never) => {
	console.log('Обработайте значение ' + param)
}
