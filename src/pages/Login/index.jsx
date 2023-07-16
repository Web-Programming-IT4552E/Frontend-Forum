import React from "react";
import classes from "./styles.module.scss";
import PageContainer from "../../containers/PageContainer";
import { Button, Form, Input, Row, Col } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { loginHandler, storeUserData } from "../../services/auth.service";
import { isExpired, decodeToken } from "react-jwt";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userThunk } from "../../redux/actions/user";

export const Login = () => {
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const handleFinish = async (value) => {
		let response = await loginHandler(value);
		console.log(response);
		if (response?.status == 404) {
			toast.error(response?.data?.message || "Login failed!");
		} else if (response?.status == 200 || response?.status == 201) {
			const token = response?.data;
			localStorage.setItem(
				`${process.env.REACT_APP_PREFIX_LOCAL}_access_token`,
				token?.accessToken
			);
			localStorage.setItem(
				`${process.env.REACT_APP_PREFIX_LOCAL}_refresh_token`,
				token?.refreshToken
			);
			storeUserData(decodeToken(token?.accessToken));
			dispatch(userThunk(decodeToken(token?.accessToken)));
			toast.success("Login success!");
			navigate("/");
		}
	};

	return (
		<PageContainer>
			<Row justify="center" className={classes.container}>
				<Col xs={22} md={16} lg={10}>
					<Row justify="center" className={classes.content}>
						<Col span={24}>
							<h3 className={classes.title}>LOGIN</h3>
							<Form
								form={form}
								size="large"
								onFinish={(value) => handleFinish(value)}
								requiredMark={false}
								layout="vertical"
							>
								<Form.Item
									label="Email"
									name="email"
									rules={[
										{
											required: true,
											message: "Email is required!",
										},
									]}
								>
									<Input prefix={<MailOutlined />} />
								</Form.Item>

								<Form.Item
									name="password"
									label="Password"
									rules={[
										{
											required: true,
											message: "Password is required!",
										},
									]}
								>
									<Input prefix={<LockOutlined />} type="password" />
								</Form.Item>

								<Form.Item>
									<Button type="primary" htmlType="submit" block>
										Log in
									</Button>
								</Form.Item>
							</Form>
						</Col>
					</Row>
				</Col>
			</Row>
		</PageContainer>
	);
};
