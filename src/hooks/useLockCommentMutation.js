import { useMutation, useQueryClient } from "react-query";
import { request } from "../utils/request";

export default function useLockCommentMutation(onSuccess, onError) {
	const queryClient = useQueryClient();
	return useMutation(
		(post_id) =>
			request(
				{
					url: `/post/lock/${post_id}`,
					method: "PATCH",
				},
				true
			),
		{
			onSuccess: (res, variables, context) => {
				queryClient.invalidateQueries(["public-posts", variables.post_id]);
				onSuccess();
			},
			onError: (err) => {
				onError(err);
			},
		}
	);
}
