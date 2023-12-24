import {useEffect, useRef, useState} from "react";

export function useModal() {

	const modalRef = useRef(null);

	const buttonRef = useRef(null);

	const [isOpen, setIsOpen] = useState(false);

	const handleClickOutside = (event) => {
		if (modalRef.current && !modalRef.current.contains(event.target) && !buttonRef.current.contains(event.target)) {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener('click', handleClickOutside, true);
		return () => {
			document.removeEventListener('click', handleClickOutside, true);
		};
	}, []);


	return {
		modalRef,
		buttonRef,
		isOpen,
		setIsOpen
	};
}