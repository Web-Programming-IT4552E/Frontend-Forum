import { useCacheFetch } from "./useCacheFetch";

export default function useCommentsQuery(post_id) {
  const { data, error, isLoading } = useCacheFetch(
    ["comments", post_id],
    {
      onSuccess: (data) => {
        console.log(data);
      },
    },
    {
      url: `/post/comments/${post_id}`,
      method: "GET",
      isAuth: true,
    }
  );
  return { data: data?.data, error, isLoading };
}
