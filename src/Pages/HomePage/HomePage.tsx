import "./HomePage.sass"
import image from "./it.png"

const HomePage = () => {

	return (
		<div className="home-page-wrapper">

			<div className="text-container">
				<h1>Добро пожаловать на сайт ITCS!</h1>
				<h3>Ваша инфраструктура - наша забота.</h3>
			</div>

			<img src={image} className="image"/>


		</div>
	)
}

export default HomePage;