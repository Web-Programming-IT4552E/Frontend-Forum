import React from "react";
import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicRoute from "./containers/Auth/PublicRoute";
import PrivateRoute from "./containers/Auth/PrivateRoute";
import { Spin } from "antd";
import { ToastContainer } from "react-toastify";
import { routes } from "./routes";
import { QueryClientProvider, QueryClient } from "react-query";
import { PersistGate } from "redux-persist/integration/react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/index.js";

function App() {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<QueryClientProvider
					client={
						new QueryClient({
							defaultOptions: {
								queries: {
									refetchOnWindowFocus: false,
								},
							},
						})
					}
				>
					<BrowserRouter>
						<React.Suspense
							fallback={
								<div className="h-full flex align-middle justify-center">
									<Spin size="large" />
								</div>
							}
						>
							<div className="wrapper">
								<Routes>
									{Object.keys(routes).map((key) => {
										if (routes[key].isAuth) {
											return (
												<Route
													key={key}
													path={routes[key].path}
													element={
														<PrivateRoute>
															{routes[key].component}{" "}
														</PrivateRoute>
													}
												/>
											);
										} else if (!routes[key].isAuth) {
											console.log(routes[key]);

											return (
												<Route
													key={key}
													path={routes[key].path}
													element={
														<PublicRoute>{routes[key].component} </PublicRoute>
													}
												/>
											);
										}
									})}
								</Routes>
							</div>
						</React.Suspense>
						<ToastContainer
							position="bottom-right"
							autoClose={3000}
							hideProgressBar={false}
							newestOnTop={false}
							closeOnClick
							rtl={false}
							pauseOnFocusLoss
							draggable
							theme="light"
							pauseOnHover
						/>
					</BrowserRouter>
				</QueryClientProvider>
			</PersistGate>
		</Provider>
	);
}

export default App;
