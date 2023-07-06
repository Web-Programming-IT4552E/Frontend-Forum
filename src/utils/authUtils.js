const getAccessToken = () => {
	const token = localStorage.getItem(
		`${process.env.REACT_APP_PREFIX_LOCAL}_access_token`
	);
	if (token) {
		return token;
	}
	return null;
};

const getRefreshToken = () => {
	const token = localStorage.getItem(
		`${process.env.REACT_APP_PREFIX_LOCAL}_refresh_token`
	);
	if (token) {
		return token;
	}
	return null;
};

const isLoggedIn = () => {
	const token = getAccessToken();
	if (token) {
		return true;
	}
	return false;
};

const getUser = () => {
	const user = localStorage.getItem(
		`${process.env.REACT_APP_PREFIX_LOCAL}_user`
	);
	if (user) {
		return JSON.parse(user);
	}
	return null;
};

const isAdmin = () => {
	const user = getUser();
	if (user) {
		return user.role === "admin";
	}
	return false;
};

const AuthUtils = {
	getAccessToken,
	getRefreshToken,
	getUser,
	isLoggedIn,
	isAdmin,
};

export default AuthUtils;
