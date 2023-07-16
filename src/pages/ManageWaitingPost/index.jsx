import React, { useEffect, useState } from "react";
import classes from "./styles.module.scss";
import { Row, Col } from "antd";
import NewsFeed from "../../containers/NewsFeed";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCacheFetch } from "../../hooks/useCacheFetch";
import { toast } from "react-toastify";
import PageContainer from "../../containers/PageContainer";

const ManageWaitingPost = () => {
	const [params, setParams] = useState({
		page: 1,
		limit: 5,
		status: 0,
	});

	const user = useSelector((state) => state.user);
	const navigate = useNavigate();

	useEffect(() => {
		// console.log(user.role == "admin");
		if (user.role != "admin") {
			navigate("/");
		}
	}, [user]);
	return (
		<PageContainer>
			<Row className={classes.container} justify="center">
				<Col xs={22} sm={16} lg={12}>
					<NewsFeed
						title={"Waiting Posts"}
						params={params}
						setParams={setParams}
						queryKey="waiting-posts"
						url="/post/public"
						isFilter={false}
					/>
				</Col>
			</Row>
		</PageContainer>
	);
};

export default ManageWaitingPost;
