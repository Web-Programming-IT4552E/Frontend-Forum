const initState = {};

const userReducer = (state = initState, action) => {
	switch (action.type) {
		case "[store user data]":
			return action?.payload;
		default:
			return state;
	}
};

export default userReducer;
