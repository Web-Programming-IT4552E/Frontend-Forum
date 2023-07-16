import React, { useEffect, useState } from "react";
import PageContainer from "../../containers/PageContainer";
import classes from "./styles.module.scss";
import {
	Row,
	Col,
	Card,
	Space,
	Typography,
	Avatar,
	Button,
	Select,
} from "antd";
import PostItem from "../../components/common/PostItem";
import RenderIf from "../../containers/RenderIf/RenderIf";
import { useCacheFetch } from "../../hooks/useCacheFetch";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import moment from "moment";
import { request } from "../../utils/request";
import { PostStatus } from "../../constants/postStatus";
import useGetUserQuery from "../../hooks/useGetUserQuery";
const { Title } = Typography;

const Profile = () => {
	const onError = (error) => {
		toast.error("Fetch failed!");
	};
	const [posts, setPosts] = useState([]);
	const user = useSelector((state) => state.user);
	const [canFetchMore, setCanFetchMore] = useState(true);
	const [params, setParams] = useState({
		page: 1,
		limit: 5,
		status: 1,
	});

	const { isLoading: loadingPosts, data: endpointData } = useCacheFetch(
		["my-posts-social", params.status],
		{
			onError,
		},
		{
			isAuth: true,
			params,
			url: "/post/myPost",
		}
	);

	useEffect(() => {
		if (endpointData?.status == 200) {
			if (endpointData.data.data.length < params.limit) {
				setCanFetchMore(false);
			}
			setPosts(endpointData.data.data);
		}
	}, [endpointData]);

	const onLoadMore = async () => {
		try {
			const data = await request(
				{
					url: "/post/myPost",
					method: "GET",
					params: {
						...params,
						page: params.page + 1,
					},
				},
				true
			);
			if (data.status == 200) {
				if (data.data.data.length < params.limit) {
					setCanFetchMore(false);
				}
				setPosts(posts.concat(data.data.data));
				setParams({
					...params,
					page: params.page + 1,
				});
			}
		} catch (err) {
			toast.error("Fetch more posts failed!");
		}
	};

	return (
		<PageContainer>
			<Row className={classes.wrapper} justify="center" gutter={[16, 16]}>
				<Col sm={22} lg={7}>
					<Row className={classes.sticky} gutter={[0, 16]} justify="center">
						<Col align="center" justify="center" xs={24} lg={22}>
							<Card>
								<Space size="small" direction="vertical">
									<Avatar
										size={(150, 150)}
										src={
											user ? user.avatar : "https://i.pravatar.cc/300"
										}
									/>
									<Title level={4} strong>
										{user && user.fullname}
									</Title>
									<Typography>{user && user.type.toUpperCase()}</Typography>
								</Space>
							</Card>
						</Col>
						<Col xs={24} lg={22}>
							<Title level={3}>General Info</Title>
							<Card>
								<div>Phone: {user && user.phone}</div>
								<div>Email: {user && user.email}</div>
								<div>Address: {user && user.address}</div>
								<div>
									Birhday:{" "}
									{user && user?.birthday
										? moment(new Date(user?.birthday)).format(
												"HH:mm DD/MM/YYYY"
										  )
										: ""}
								</div>
							</Card>
						</Col>
					</Row>
				</Col>
				<Col sm={22} lg={{ span: 14, offset: -1 }}>
					<div className="flex justify-between flex-wrap">
						<Title level={3}>Posts</Title>
						<Select
							placeholder="Filter Posts"
							style={{ width: "150px" }}
							onChange={(e) => setParams({ ...params, status: e, page: 1 })}
							bordered={false}
							defaultValue={Object.keys(PostStatus)[1]}
						>
							{Object.keys(PostStatus).map((key, idx) => {
								return (
									<Select.Option value={key} key={idx}>
										{PostStatus[key]}
									</Select.Option>
								);
							})}
						</Select>
					</div>
					<Space direction="vertical" style={{ display: "flex" }}>
						{Object.keys(posts).length > 0 &&
							posts.map((item, idx) => {
								return (
									<PostItem
										item={{ ...item, loading: loadingPosts }}
										key={idx}
									/>
								);
							})}
					</Space>
					<RenderIf isTrue={canFetchMore}>
						<div
							style={{
								textAlign: "center",
								margin: "12px 0",
								height: 32,
								lineHeight: "32px",
							}}
						>
							<Button onClick={onLoadMore}>Load More</Button>
						</div>
					</RenderIf>
				</Col>
			</Row>
		</PageContainer>
	);
};

export default Profile;
