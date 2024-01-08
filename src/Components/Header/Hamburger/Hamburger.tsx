import "./Hamburger.sass"

const Hamburger = ({ isOpen, setIsOpen }) => {
	return (
		<div className={"hamburger-wrapper " + (isOpen ? "open" : "")} onClick={(e) => setIsOpen(!isOpen)}>
			<span className="line-1"></span>
			<span className="line-2"></span>
			<span className="line-3"></span>
		</div>
	)
}

export default Hamburger;