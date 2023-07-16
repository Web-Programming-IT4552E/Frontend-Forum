import axios from "axios";
// import jwtDecode from "jwt-decode";
import { request } from "../utils/request";

export function logOut() {
  localStorage.removeItem(`${process.env.REACT_APP_PREFIX_LOCAL}_user`);
  localStorage.removeItem(`${process.env.REACT_APP_PREFIX_LOCAL}_access_token`);
  localStorage.removeItem(
    `${process.env.REACT_APP_PREFIX_LOCAL}_refresh_token`
  );
  window.location.href = "/login";
}

export function storeUserData(data) {
  localStorage.setItem(
    `${process.env.REACT_APP_PREFIX_LOCAL}_user`,
    JSON.stringify(data)
  );
}

// export async function loginService(data) {
//   try {
//     const response = await request(
//       {
//         url: `${process.env.REACT_APP_API}/auth/login`,
//         method: "POST",
//         data: data,
//       },
//       false
//     );
//     storeUserData(jwtDecode(response.data.accessToken));
//     localStorage.setItem(
//       `${process.env.REACT_APP_PREFIX_LOCAL}_access_token`,
//       response.data.accessToken
//     );
//     localStorage.setItem(
//       `${process.env.REACT_APP_PREFIX_LOCAL}_refresh_token`,
//       response.data.refreshToken
//     );
//     return { data: response, error: null };
//   } catch (error) {
//     return { data: null, error };
//   }
// }

export async function getToken() {
  try {
    const data = await axios.post(
      `${process.env.REACT_APP_API}/auth/refresh-token`,
      {
        refreshToken: localStorage.getItem(
          `${process.env.REACT_APP_PREFIX_LOCAL}_refresh_token`
        ),
        accessToken: localStorage.getItem(
          `${process.env.REACT_APP_PREFIX_LOCAL}_access_token`
        ),
      }
    );
    localStorage.setItem(
      `${process.env.REACT_APP_PREFIX_LOCAL}_access_token`,
      data.data.accessToken
    );
    localStorage.setItem(
      `${process.env.REACT_APP_PREFIX_LOCAL}_refresh_token`,
      data.data.refreshToken
    );
    return data.data.accessToken;
  } catch (err) {
    // logOut();
  }
}
export async function loginHandler(data) {
  return await request(
    {
      url: `/auth/login`,
      method: "POST",
      data,
    },
    false
  )
    .then((res) => res)
    .catch((err) => err?.response);
}
