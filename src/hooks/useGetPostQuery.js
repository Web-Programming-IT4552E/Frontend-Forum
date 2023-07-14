import { useCacheFetch } from "./useCacheFetch";

export default function useGetPostQuery(post_id) {
  const { data, error, isLoading } = useCacheFetch(
    ["public-post", post_id],
    {
      onSuccess: (data) => {
        console.log(data);
      },
    },
    {
      url: `/post/public/${post_id}`,
      method: "GET",
      isAuth: true,
    }
  );
  return { data: data?.data, error, isLoading };
}
