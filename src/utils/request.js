import axios from "axios";
import { getToken } from "../services/auth.service";

// const token = {
// 	accessToken:
// 		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxvbmdkaWV1MTJ4QGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY1Nzk2MDAxNywiZXhwIjoxNjU4NTY0ODE3fQ.M2N7ZoSUqnn3atoEHwfKE67ZLPun1Kfja8igupjt5wI",
// 	refreshToken:
// 		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxvbmdkaWV1MTJ4QGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY1Nzk2MDAxNywiZXhwIjoxNjU4NTY0ODE3fQ.M2N7ZoSUqnn3atoEHwfKE67ZLPun1Kfja8igupjt5wI",
// };

// const token = {
// 	accessToken:
// 		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBoYW1taW5oZGFuZzEzNUBnbWFpbC5jb20iLCJyb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2NTc5NjQyNDAsImV4cCI6MTY1ODU2OTA0MH0.5IjEpd83acy1ST4fdCGG23-oh-56hpPEGZYIpKfbfOo",
// 	refreshToken:
// 		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBoYW1taW5oZGFuZzEzNUBnbWFpbC5jb20iLCJyb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2NTc5NjQyNDAsImV4cCI6MTY1ODU2OTA0MH0.5IjEpd83acy1ST4fdCGG23-oh-56hpPEGZYIpKfbfOo",
// };

const client = axios.create({
	baseURL: `${process.env.REACT_APP_API}`,
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${localStorage.getItem(
			`${process.env.REACT_APP_PREFIX_LOCAL}_access_token`
		)}`,
	},

});

/**
 *
 * @param {options} : { url, method, params }
 * @param {isAuth} : check whether should use token or not
 * @returns
 */

export const request = async ({ ...options }, isAuth) => {
	if (isAuth) {
		client.interceptors.request.use(
			async (config) => {
				const accessToken = localStorage.getItem(
					`${process.env.REACT_APP_PREFIX_LOCAL}_access_token`
				);
				config.headers = {
					Authorization: `Bearer ${accessToken}`,
					"Content-Type": "application/json",
				};
				return config;
			},
			(error) => {
				Promise.reject(error);
			}
		);
		client.interceptors.response.use(
			(response) => {
				return response;
			},
			async function (error) {
				const originalRequest = error.config;
				if (error.response?.status === 403 && !originalRequest._retry) {
					originalRequest._retry = true;
					const data = await getToken();
					axios.defaults.headers.common["Authorization"] =
						"Bearer " + data?.accessToken;
					if (data?.accessToken) {
						localStorage.setItem(
							`${process.env.REACT_APP_PREFIX_LOCAL}_access_token`,
							data?.accessToken
						);
						localStorage.setItem(
							`${process.env.REACT_APP_PREFIX_LOCAL}_refresh_token`,
							data?.refreshToken
						);
					}
					return client(originalRequest);
				}
				return Promise.reject(error);
			}
		);
	}

	try {
		let res = await client(options);
		return res;
	} catch (err) {
		return err?.response;
	}

};
