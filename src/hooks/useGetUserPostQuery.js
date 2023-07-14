import { useCacheFetch } from "./useCacheFetch";

export default function useGetUserPostQuery(post_id) {
	const { data, error, isLoading } = useCacheFetch(
		["user-post", post_id],
		{
			onSuccess: (data) => {
				console.log(data);
			},
		},
		{
			url: `/post/myPost/${post_id}`,
			method: "GET",
			isAuth: true,
		}
	);
	return { data: data?.data, error, isLoading };
}
