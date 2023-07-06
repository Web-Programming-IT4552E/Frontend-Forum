import {
	Comment,
	List,
	Tooltip,
	Card,
	Form,
	Input,
	Button,
	Avatar,
} from "antd";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { request } from "../../../utils/request";
import { useCacheFetch, useCacheMutate } from "../../../hooks/useCacheFetch";
import { toast } from "react-toastify";
import RenderIf from "../../../containers/RenderIf/RenderIf";
import { FaReply } from "react-icons/fa";
import CommentItem from "./CommentItem";

const { TextArea } = Input;

const Editor = React.forwardRef(
	({ onChange, onSubmit, submitting, value }, ref) => (
		<div style={{ marginLeft: "-12px" }}>
			<Form.Item>
				<TextArea ref={ref} rows={4} onChange={onChange} value={value} />
			</Form.Item>
			<Form.Item>
				<Button
					htmlType="submit"
					loading={submitting}
					onClick={onSubmit}
					type="primary"
				>
					Add Comment
				</Button>
			</Form.Item>
		</div>
	)
);

const CommentSection = ({
	postId,
	commentId = null,
	depth = 0,
	isPost = true,
}) => {
	const [params, setParams] = useState({
		limit_per_load: 5,
		comment_id: commentId,
		// last_prev_comment_id if exists
	});
	const [comments, setComments] = useState([]);
	const [submitting, setSubmitting] = useState(false);
	const [value, setValue] = useState("");
	const [canLoadMore, setCanLoadMore] = useState(true);
	const [commentsInPosts, setCommentInPosts] = useState([]);
	const [openReply, setOpenReply] = useState(false);

	const { data: commentData, refetch } = useCacheFetch(
		["posts-comment", postId, commentId],
		{
			onError: () => {
				toast.error("Fetch comment error!");
			},
		},
		{
			isAuth: true,
			params,
			url: isPost
				? `/comment/post-comment/${postId}`
				: `/comment/comment-replies/${commentId}`,
		}
	);

	const [userToReply, setUserToReply] = useState(null);

	const ref = useRef(null);

	const { data: userData } = useCacheFetch(
		["users"],
		{
			onError: () => {
				toast.error("Load user avatar failed!");
			},
		},
		{ isAuth: true, url: "/account" }
	);
	const { mutateAsync: addCommentToPost } = useCacheMutate(
		null,
		{},
		{
			isAuth: true,
			params,
			url: `/comment/${postId}`,
			method: "POST",
			data: {
				content: value,
				reply_to_comment_id: userToReply?._id,
				attachment: [],
			},
		}
	);
	useEffect(() => {
		if (commentData?.data) {
			if (Object.keys(commentData?.data || {}).length < params.limit_per_load) {
				setCanLoadMore(false);
			} else {
				setCanLoadMore(true);
			}
			setCommentInPosts(Object.values(commentData?.data || {}));
		}
	}, [commentData]);
	useEffect(() => {
		console.log("Comment in Posts", commentsInPosts);
	}, [commentsInPosts]);

	const onLoadMore = async () => {
		try {
			const data = await request(
				{
					url: isPost
						? `/comment/post-comment/${postId}`
						: `/comment/comment-replies/${commentId}`,
					method: "GET",
					params: {
						...params,
						last_prev_comment_id: commentsInPosts
							? commentsInPosts[Object.keys(commentsInPosts).length - 1]._id
							: null,
					},
				},
				true
			);
			if (data.status == 200) {
				if (Object.values(data.data).length < params.limit_per_load) {
					setCanLoadMore(false);
				}
				setCommentInPosts(
					[...commentsInPosts].concat(Object.values(data?.data || {}))
				);
				setParams({
					...params,
					last_prev_comment_id: commentData?.data?._id,
				});
			}
		} catch (err) {
			console.log(err);
			toast.error("Fetch more comments failed!");
		}
	};

	const handleSubmit = async () => {
		try {
			await addCommentToPost();
			setValue("");
			if (depth === 0) setUserToReply(null);
			refetch();
		} catch (err) {
			console.log(err);
			toast.error("Add comment failed!");
			setValue("");
		}
	};

	const focusRef = () => {
		if (ref?.current) {
			ref.current.focus();
		}
	};

	return (
		<Card style={{ borderTopLeftRadius: "0", borderTopRightRadius: "0" }}>
			<List
				className="comment-list"
				itemLayout="horizontal"
				dataSource={commentsInPosts.filter(
					(comment) => comment.reply_to_comment_id == commentId
				)}
				renderItem={(item, idx) => {
					return (
						<li>
							<CommentItem
								{...{
									setOpenReply,
									setUserToReply,
									setValue,
									item,
									postId,
									commentId,
									isPost,
									focusRef,
									depth,
									ref,
								}}
							/>
						</li>
					);
				}}
			/>

			<RenderIf isTrue={canLoadMore}>
				<div
					ref={ref}
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
			<RenderIf isTrue={openReply || depth === 0}>
				<Comment
					avatar={
						<Avatar
							src={
								userData?.data?.avatar || "https://i.pravatar.cc/300"
							}
							alt="Han Solo"
						/>
					}
					content={
						<Editor
							onChange={(e) => {
								setValue(e.target.value);
							}}
							ref={ref}
							onSubmit={handleSubmit}
							submitting={submitting}
							value={value}
						/>
					}
				/>
			</RenderIf>
		</Card>
	);
};

export default CommentSection;
