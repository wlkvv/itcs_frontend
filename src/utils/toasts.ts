import {toast} from "react-toastify";

export const successMessage = (message) => {
	toast.success(message, {
		position: toast.POSITION.BOTTOM_RIGHT
	});
};

export const infoMessage = (message) => {
	toast.info(message, {
		position: toast.POSITION.BOTTOM_RIGHT
	});
};

export const errorMessage = (message) => {
	toast.error(message, {
		position: toast.POSITION.BOTTOM_RIGHT
	});
};

export const logOutMessage = () => {
	toast.info(`Вы вышли из аккаунта`, {
		position: toast.POSITION.BOTTOM_RIGHT
	});
}

export const requestErrorMessage = () => {
	toast.error(`Что-то пошло не так`, {
		position: toast.POSITION.BOTTOM_RIGHT
	});
};
