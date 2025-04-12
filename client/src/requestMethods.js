import axios from "axios";

export const BASE_URL = "http://localhost:5000/api/";

const getToken = () => {
	return JSON.parse(localStorage.getItem("user"))?.accessToken || "";
};

export const publicRequest = axios.create({
	baseURL: BASE_URL,
});

export const userRequest = axios.create({
	baseURL: BASE_URL,
	headers: {
		token: `Bearer ${getToken()}`,
	},
});
