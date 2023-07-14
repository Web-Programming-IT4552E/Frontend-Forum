import { useMutation, useQueryClient } from "react-query";
import {toast} from "react-toastify";
import { request } from "../utils/request";

export default function useUpdatePostMutation() {
	const queryClient = useQueryClient();
	return useMutation(
		({ id, ...data }) =>
			request({
				url: `${process.env.REACT_APP_API}/post/${id}`,
				method: "PUT",
				data: data,
				isAuth: true,
			}),
		{
			onSuccess: (data) => {
				queryClient.invalidateQueries(["public-posts"]);
				toast.success("Post updated successfully");
				return data;
			},
			onError: (res) => res,
		}
	);
}
