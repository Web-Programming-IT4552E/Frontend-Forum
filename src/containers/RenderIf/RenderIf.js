import React from "react";

const RenderIf = ({ children, isTrue }) => {
	return <React.Fragment>{isTrue ? children : null}</React.Fragment>;
};

export default RenderIf;
