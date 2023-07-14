import { useMutation, useQueryClient } from "react-query";
import { request } from "../utils/request";

export default function useDeletePostMutation(onSuccess, onError) {
	const queryClient = useQueryClient();
	return useMutation(
		(post_id) =>
			request({
				url: `${process.env.REACT_APP_API}/post/${post_id}`,
				method: "DELETE",
				isAuth: true,
			}),
		{
			onSuccess: (data, variables) => {
				queryClient.invalidateQueries(["public-posts"]);
				onSuccess(data);
			},
			onError: (error) => {
				onError(error);
			},
		}
	);
}
