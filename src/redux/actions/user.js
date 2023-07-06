import { isExpired, decodeToken } from "react-jwt";
import { request } from "../../utils/request";
import { toast } from "react-toastify";

export const userThunk = (data) => async (dispatch) => {
  const response = await request(
    {
      url: "/account",
      isAuth: true,
      method: "GET",
    },
    true
  );
  const fetchData = response?.data || {};
  const payload = { ...fetchData, ...data };
  dispatch({
    type: "[store user data]",
    payload,
  });
};
