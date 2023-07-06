import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { userThunk } from "../../redux/actions/user";
import { persistor } from "../../redux";

const PrivateRoute = ({ children }) => {
	/**
	 * @dev check if user is not logged in, return to login page
	 */
	const navigate = useNavigate();
	const pathname = useLocation().pathname;
	const user = useSelector((state) => state.user);

	useEffect(() => {
		const userData = localStorage.getItem(
			`${process.env.REACT_APP_PREFIX_LOCAL}_user`
		)
			? JSON.parse(
					localStorage.getItem(`${process.env.REACT_APP_PREFIX_LOCAL}_user`)
			  )
			: user;
		if (!userData || Object.keys(userData).length == 0) {
			navigate("/login");
		}
	}, [pathname]);

	return <React.Fragment>{children}</React.Fragment>;
};

export default PrivateRoute;
