import s from './Preloader.module.css'

export const Preloader = () => {
	return (
		<div className={s.Root}>
			<img
				src={require('src/assets/images/preloader.gif')}
				alt='loading...'
			/>
		</div>
	)
}

export const PreloaderBlock = () => {
	return <div className={s.center}><Preloader /></div>
}

