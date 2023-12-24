import Cookies from "universal-cookie";
import {NEXT_MONTH} from "../../utils/consts";

export function useToken() {
	const cookies = new Cookies()

	const access_token = cookies.get("access_token");

	const setAccessToken = (value) => {
		cookies.set("access_token", value, {path: '/it', expires: new Date(NEXT_MONTH)})
	}

	const resetAccessToken = () => {
		cookies.set("access_token", undefined, {path: '/it', expires: new Date(NEXT_MONTH)})
	}

	return {
		access_token,
		setAccessToken,
		resetAccessToken
	};
}