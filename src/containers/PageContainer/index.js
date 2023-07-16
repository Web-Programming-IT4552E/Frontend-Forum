import React, { useState } from "react";
import classes from "./styles.module.scss";
import { Layout, Button, Row, Col, Space, BackTop } from "antd";
import RouteConfigs from "../../constants/routes";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { logOut } from "../../services/auth.service";
import { persistor } from "../../redux";
import { request } from "../../utils/request";
const { Header, Content, Footer } = Layout;

const PageContainer = ({ children }) => {
	const navigate = useNavigate();
	const user = useSelector((state) => state.user);
	const logoutHandler = () => {
		logOut();
		request(
			{
				url: "/auth/logout",
				method: "POST",
				data: {
					refreshToken: localStorage.getItem(
						`${process.env.REACT_APP_PREFIX_LOCAL}_refresh_token`
					),
				},
			},
			false
		);
		persistor.purge(); // tam vay cho nhanh
	};
	return (
		<Layout className={classes.home}>
			<Header className={classes.header}>
				<div
					className={`${classes.title} cursor-pointer`}
					onClick={() => navigate(RouteConfigs.home)}
				>
					Forum
				</div>
				<Space direction="horizontal" size={[16, 16]}>
					{user?.role == "admin" ? (
						<Button
							ghost
							onClick={() => navigate(RouteConfigs.manageWaitingPost)}
						>
							Post Waiting
						</Button>
					) : null}
					<Button type="primary" onClick={() => navigate(RouteConfigs.profile)}>
						Profile
					</Button>
					{!user || Object.keys(user).length == 0 ? (
						<Button
							className={`classes["login-button"] bg-white`}
							onClick={() => navigate(RouteConfigs.login)}
						>
							Login
						</Button>
					) : (
						<Button
							className={`classes["login-button"] bg-white`}
							onClick={() => logoutHandler()}
						>
							Logout
						</Button>
					)}
				</Space>
			</Header>
			<Content className={classes.content}>{children}</Content>
			<BackTop style={{ zIndex: 100000 }} />
		</Layout>
	);
};

export default PageContainer;
