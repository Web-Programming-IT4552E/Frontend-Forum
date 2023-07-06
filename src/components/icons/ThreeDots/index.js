import React from "react";
import "./style.scss";
import { Menu, Dropdown } from "antd";

const ThreeDots = ({ itemMenu, handler }) => {
	const menu = <Menu items={itemMenu} onClick={(e) => handler(e)} />;
	return (
		<Dropdown
			overlay={menu}
			getPopupContainer={() => document.querySelector("#three-dots")}
		>
			<a>
				<div className="three-dots h-[45px]" id="three-dots"></div>
			</a>
		</Dropdown>
	);
};

export default ThreeDots;
