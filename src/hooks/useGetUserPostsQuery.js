import { useCacheFetch } from "./useCacheFetch";

export default function useGetUserPostsQuery() {
  const { data, error, isLoading } = useCacheFetch(
    ["user-posts"],
    {
      onSuccess: (data) => {
        console.log(data);
      },
    },
    {
      url: `/post/myPost`,
      method: "GET",
      isAuth: true,
    }
  );
  return { data: data?.data, error, isLoading };
}
