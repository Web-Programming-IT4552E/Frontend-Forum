import { useQuery, useMutation, useQueryClient } from "react-query";
import { request } from "../utils/request";
const fetchCacheFetch = (
	{ isAuth, params, url, method = "GET", data },
	postData
) => {
	return request(
		{
			url,
			params,
			method,
			data: postData ? postData : data,
		},
		isAuth
	);
};
/**
 *
 * @param {*} key: key for recognize different use query
 * @param {*} options: settings for useQuery
 * @param {*} fetchOptions: settings for fetch request
 * @returns
 */
export const useCacheFetch = (key, options, fetchOptions) => {
	return useQuery(key, () => fetchCacheFetch(fetchOptions), {
		...options,
	});
};

export const useCacheMutate = (key, options, fetchOptions) => {
	return useMutation((data) => fetchCacheFetch(fetchOptions, data), {
		...options, // can write optimistic update here but we don't do this at this time
	});
};
