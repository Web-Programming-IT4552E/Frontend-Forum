import { Button, List, Space } from "antd";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PostItem from "../../components/common/PostItem";
import { useCacheFetch } from "../../hooks/useCacheFetch";
import { request } from "../../utils/request";
import NewsFeedNav from "./NewsFeedNav";

const NewsFeed = ({ title, url, queryKey, params, setParams, isFilter }) => {
	const onError = (error) => {
		toast.error("Fetch failed!");
	};

	const [posts, setPosts] = useState([]);
	const [canFetchMore, setCanFetchMore] = useState(true);
	const { isLoading, data: endpointData } = useCacheFetch(
		[queryKey, params?.category],
		{
			onError,
		},
		{
			isAuth: true,
			params,
			url,
		}
	);

	useEffect(() => {
		if (endpointData?.status == 200) {
			if (endpointData.data.data.length < params.limit) {
				setCanFetchMore(false);
			} else {
				setCanFetchMore(true);
			}
			setPosts(endpointData.data.data);
		}
	}, [endpointData]);

	const onLoadMore = async () => {
		try {
			const data = await request(
				{
					url,
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
				console.log(posts, data.data.data);
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

	// ADMIN ONLY
	const handleAccept = (post_id) => {
		request(
			{
				url: `/post/review/${post_id}`,
				method: "PATCH",
				data: {
					status: 1,
				},
			},
			true
		)
			.then((data) => {
				if (data.status == 200) {
					toast.success("Accept post successfully!");
					setPosts(posts.filter((item) => item._id != post_id));
				}
			})
			.catch((err) => {
				toast.error("Accept post failed!");
			});
	};

	const handleDeny = (post_id) => {
		request(
			{
				url: `/post/review/${post_id}`,
				method: "PATCH",
				data: {
					status: 3,
				},
			},
			true
		)
			.then((data) => {
				if (data.status == 200) {
					toast.success("Deny post successfully!");
					setPosts(posts.filter((item) => item._id != post_id));
				}
			})
			.catch((err) => {
				toast.error("Deny post failed!");
			});
	};

	return (
		<Space direction="vertical" size="small" style={{ display: "flex" }}>
			<NewsFeedNav title={title} isFilter={isFilter} />
			<List
				className="demo-loadmore-list"
				loading={isLoading}
				itemLayout="vertical"
				dataSource={posts}
				renderItem={(item) => (
					<PostItem {...{ item, handleAccept, handleDeny, posts, setPosts }} />
				)}
			/>
			{canFetchMore ? (
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
			) : null}
		</Space>
	);
};

export default NewsFeed;
