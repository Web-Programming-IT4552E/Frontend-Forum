import React from "react";

const PublicRoute = ({ children }) => {
	/**
	 * @dev check if user is not logged in, return to login page
	 */
	return <React.Fragment>{children}</React.Fragment>;
};

export default PublicRoute;
