import { Row, Col } from "antd";
import React from "react";
import PostItemFilter from "./PostItemFilter";
import classes from "./styles.module.scss";

const NewsFeedNav = ({ title, func, isFilter = true }) => {
	return (
		<Row justify="space-between" className={classes.nav}>
			<Col align="left" className={classes.title}>
				{!title ? "Home" : title}
			</Col>
			{isFilter ? (
				<Col align="right">
					<PostItemFilter func={func} />
				</Col>
			) : null}
		</Row>
	);
};

export default NewsFeedNav;
