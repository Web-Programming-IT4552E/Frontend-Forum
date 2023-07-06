import Home from "./pages/Home";
import ManageWaitingPost from "./pages/ManageWaitingPost";
import Profile from "./pages/Profile";
import { Login } from "./pages/Login";
import { ResetPassword } from "./pages/ResetPassword";
import { Register } from "./pages/Register";
import RouteConfigs from "./constants/routes";

export const routes = {
	home: {
		path: RouteConfigs.home,
		component: <Home />,
		isAuth: true,
	},
	manageWaitingPost: {
		path: RouteConfigs.manageWaitingPost,
		component: <ManageWaitingPost />,
		isAuth: true,
	},
	profile: {
		path: RouteConfigs.profile,
		component: <Profile />,
		isAuth: true,
	},
	login: {
		path: RouteConfigs.login,
		component: <Login />,
		isAuth: false,
	},
	resetpassword: {
		path: RouteConfigs.resetpassword,
		component: <ResetPassword />,
		isAuth: false,
	},
	signin: {
		path: RouteConfigs.register,
		component: <Register />,
		isAuth: false,
	},
};
