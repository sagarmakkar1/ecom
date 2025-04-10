import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import Success from "./pages/Success";
import { useSelector } from "react-redux";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
	const user = useSelector((state) => state.user.currentUser);
	return (
		<Router>
			<ScrollToTop />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/products" element={<ProductList />} />
				<Route path="/products/:category" element={<ProductList />} />
				<Route path="/product/:id" element={<Product />} />
				<Route path="/cart" element={<Cart />} />
				<Route path="/success" element={<Success />} />
				<Route
					path="/login"
					element={user ? <Navigate replace to={"/"} /> : <Login />}
				/>
				<Route
					path="/register"
					element={user ? <Navigate replace to={"/"} /> : <Register />}
				/>
			</Routes>
		</Router>
	);
};

export default App;
