import React from "react";
import { Col, Drawer, Row, Tabs } from "antd";
import "./styles.scss";
import { useSelector } from "react-redux";

const UserDetail = (props) => {
	const { onClose, visible, userData } = props;
	const { TabPane } = Tabs;
	const user = useSelector((state) => state.user);

	const onChange = () => {};

	return (
		<Drawer
			title="Profile"
			placement="right"
			onClose={onClose}
			visible={visible}
			closable={false}
		>
			<Row gutter={[20, 20]}>
				<Col>
					<div className="AvatarWrapper">
						<img
							src={`${user?.avatar || 
								"https://i.pravatar.cc/300"}`}
							className="Avatar"
						/>
						<div className="Role">
							{userData?.type ? userData.type.toUpperCase() : "CUSTOMER"}
						</div>
					</div>
				</Col>
				<Col>
					<div className="Name">{userData.name?.last}</div>
				</Col>
			</Row>

			{false && (
				<Tabs defaultActiveKey="1" onChange={onChange}>
					<TabPane tab={<div>About</div>} key="1">
						{/* <div>Gender: {userData.gender}</div>
					<div>Email: {userData.email}</div> */}
					</TabPane>

					<TabPane
						tab={
							<div>
								Posts <span className="NumberOfPost">6</span>
							</div>
						}
						key="2"
					>
						<div>Content</div>
						<div>Content</div>
						<div>Content</div>
						<div>Content</div>
					</TabPane>
				</Tabs>
			)}
		</Drawer>
	);
};

export default UserDetail;
