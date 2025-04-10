import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { userRequest } from "../requestMethods";
import { Link } from "react-router-dom";

const Success = () => {
	const location = useLocation();
	const data = location.state.stripeData;
	const cart = location.state.cart;
	const currentUser = useSelector((state) => state.user.currentUser);
	const [orderId, setOrderId] = useState(null);

	useEffect(() => {
		const createOrder = async () => {
			try {
				console.log(data);
				const res = await userRequest.post("/orders", {
					userId: currentUser,
					products: cart.products.map((item) => ({
						productId: item._id,
						quantity: item._quantity,
					})),
					amount: cart.total,
					address: "India",
				});
				setOrderId(res.data._id);
			} catch (err) {
				console.log("Order Creation error", err);
			}
		};
		data && createOrder();
	}, [cart, data]);

	return (
		<div
			style={{
				height: "100vh",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			{orderId
				? `Order has been created successfully. Your order number is ${orderId}`
				: `Successfull. Your order is being prepared...`}
			<Link to={"/"} style={{ cursor: "pointer" }}>
				<button style={{ padding: 10, marginTop: 20 }}>Go to Homepage</button>
			</Link>
		</div>
	);
};

export default Success;
