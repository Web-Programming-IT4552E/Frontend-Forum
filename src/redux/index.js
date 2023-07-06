import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { userReducer } from "./reducers";
import thunkMiddleware from "redux-thunk";

const allReducers = combineReducers({
	user: userReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
	key: "root",
	storage,
	version: 1,
	whitelist: ["user"],
};
const rootReducer = (state, action) => {
	if (action.type === "[logout]") {
		window.localStorage.removeItem("persist: root");
		state = {};
	}
	return allReducers(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
	persistedReducer,
	{},
	composeEnhancer(applyMiddleware(thunkMiddleware))
);

let persistor = persistStore(store);

export { store, persistor };
