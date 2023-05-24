import s from './Preloader.module.css'

const Preloader = () => {
	return (
		<div className={s.Root}>
			<img
				src={require('src/assets/images/preloader.gif')}
				alt='loading...'
			/>
		</div>
	)
}

export default Preloader
