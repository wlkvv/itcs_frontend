import {useEffect, useState} from "react";

export function useDesktop() {
	const [isDesktopLarge, setIsDesktopLarge] = useState(window.innerWidth > 1180)
	const [isDesktopMedium, setIsDesktopMedium] = useState(window.innerWidth > 1024)
	const [is900, setIs900] = useState(window.innerWidth > 900)
	const [is800, setIs800] = useState(window.innerWidth > 800)
	const [isMobile, setIsMobile] = useState(window.innerWidth > 420)

	const updateMedia = () => {
		setIsDesktopLarge(window.innerWidth > 1180)
		setIsDesktopMedium(window.innerWidth > 1024)
		setIs900(window.innerWidth > 900)
		setIs800(window.innerWidth > 800)
		setIsMobile(window.innerWidth > 420)
	};

	useEffect(() => {
		window.addEventListener("resize", updateMedia);
		return () => window.removeEventListener("resize", updateMedia);
	});

	return {
		isDesktopMedium,
		isDesktopLarge,
		is900,
		is800,
		isMobile
	};
}