import { publicRequest } from "../requestMethods";
import {
	loginFailure,
	loginStart,
	loginSuccess,
	logoutStart,
} from "./userRedux";

export const login = async (dispatch, user) => {
	dispatch(loginStart());
	try {
		const res = await publicRequest.post("/auth/login", user);
		dispatch(loginSuccess(res.data));
	} catch (error) {
		dispatch(loginFailure());
		console.log("Login error:", error);
	}
};

export const logout = async (dispatch, user) => {
	if (user) dispatch(logoutStart());
};

export const register = async (dispatch, userDetails) => {
	try {
		const res = await publicRequest.post("/auth/register", userDetails);
		await login(dispatch, {
			username: userDetails.username,
			password: userDetails.password,
		});
	} catch (error) {
		console.log("Registration call error:", error);
	}
};
