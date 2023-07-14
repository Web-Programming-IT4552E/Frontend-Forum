import { useMutation, useQueryClient } from "react-query";
import { request } from "../utils/request";

export default function useCreatePostMutation(onSuccess, onError) {
	const queryClient = useQueryClient();
	return useMutation(
		(data) =>
			request({
				url: `/post/regular`,
				method: "POST",
				data: data,
				isAuth: true,
			}),
		{
			onSuccess: (data, variables, context) => {
				console.log(variables);
				onSuccess(data);
				queryClient.invalidateQueries(["public-posts", variables.post_id]);
			},
			onError: (error) => {
				onError(error);
			},
		}
	);
}
