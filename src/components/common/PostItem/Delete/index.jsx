import React from "react";
import { Popconfirm } from "antd";
import useDeletePostMutation from "../../../../hooks/useDeletePostMutation";
import { toast } from "react-toastify";

const Delete = (props) => {
	const { id, setPosts } = props;
	const onSuccess = () => {
		toast.success("Post deleted successfully!");
	};
	const onError = () => {
		toast.error("Failed to delete post!");
	};
	const { mutateAsync: deletePost } = useDeletePostMutation(onSuccess, onError);

	return (
		<Popconfirm
			placement="top"
			title="Are you sure to delete this post?"
			onConfirm={async () => {
				const data = await deletePost(id);
				if (data?.status == 200 || data?.status == 201) {
					setPosts((prevPosts) => {
						console.log(prevPosts);
						return prevPosts.filter((post) => post._id != id);
					});
				} else {
					toast.error("Failed to delete post!");
				}
			}}
			okText="Yes"
			cancelText="No"
		>
			<a style={{ color: "red" }} key="list-loadmore-more">
				Delete
			</a>
		</Popconfirm>
	);
};

export default Delete;
