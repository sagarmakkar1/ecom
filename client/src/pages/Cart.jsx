import { Add, Remove, Close } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import { styled } from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { userRequest } from "../requestMethods";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import { removeProduct } from "../redux/cartRedux";

const KEY = import.meta.env.VITE_APP_STRIPE;

const Container = styled.div``;

const Wrapper = styled.div`
	padding: 20px;
	${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
	font-weight: 300;
	text-align: center;
`;

const Top = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 20px;
`;

const TopButton = styled.button`
	padding: 10px;
	font-weight: 600;
	cursor: pointer;
	border: ${(props) => props.type === "filled" && "none"};
	background-color: ${(props) =>
		props.type === "filled" ? "black" : "transparent"};
	color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
	${mobile({ display: "none" })}
`;
const TopText = styled.span`
	text-decoration: underline;
	cursor: pointer;
	margin: 0px 10px;
`;

const Bottom = styled.div`
	display: flex;
	justify-content: space-between;
	${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
	flex: 3;
`;

const Product = styled.div`
	display: flex;
	justify-content: space-between;
	${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
	flex: 2;
	display: flex;
	${mobile({ flexDirection: "column" })}
`;

const Divider = styled.div`
	width: 90%;
	margin: 5px auto 10px;
	height: 0.5px;
	display: none;
	background-color: black;
	${mobile({ display: "block" })}
`;

const Image = styled.img`
	width: 200px;
`;

const Details = styled.div`
	padding: 20px;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
	width: 20px;
	height: 20px;
	border-radius: 50%;
	background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const ProductAmountContainer = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 20px;
`;

const ProductAmount = styled.div`
	font-size: 24px;
	margin: 5px;
	${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
	font-size: 30px;
	font-weight: 200;
	${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
	background-color: #eee;
	border: none;
	height: 1px;
`;

const Summary = styled.div`
	flex: 1;
	border: 0.5px solid lightgray;
	border-radius: 10px;
	padding: 20px;
	height: 50vh;
`;

const SummaryTitle = styled.h1`
	font-weight: 200;
`;

const SummaryItem = styled.div`
	margin: 30px 0px;
	display: flex;
	justify-content: space-between;
	font-weight: ${(props) => props.type === "total" && "500"};
	font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
	width: 100%;
	padding: 10px;
	background-color: black;
	color: white;
	font-weight: 600;
	cursor: pointer;
`;

function Cart() {
	const cart = useSelector((state) => state.cart);
	const user = useSelector((state) => state.user.currentUser);
	const [stripeToken, setStripeToken] = useState(null);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onToken = (token) => {
		setStripeToken(token);
	};

	const handleRemoveProduct = (product, index) => {
		dispatch(removeProduct({ product, index }));
	};

	useEffect(() => {
		const makeRequest = async () => {
			try {
				const res = await userRequest.post("/checkout/payment", {
					amount: cart.total * 100,
				});
				navigate("/success", {
					state: { stripeData: res.data, cart },
				});
			} catch (err) {
				console.log("Cart creation error", err);
			}
		};
		stripeToken && makeRequest();
	}, [stripeToken, cart.total, navigate]);
	return (
		<Container>
			<Navbar />
			<Announcement />
			<Wrapper>
				<Title>YOUR BAG</Title>
				<Top>
					<Link to="/products">
						<TopButton>CONTINUE SHOPPING</TopButton>
					</Link>
					<TopTexts>
						<TopText>Shopping Bag({cart.quantity})</TopText>
						<TopText>Your Wishlist (0)</TopText>
					</TopTexts>
					<TopButton type="filled">APPLY COUPONS</TopButton>
				</Top>
				<Bottom>
					<Info>
						{cart.products.map((product, index) => (
							<Product key={index}>
								<Close
									style={{ cursor: "pointer" }}
									onClick={() => handleRemoveProduct(product, index)}
								/>
								<ProductDetail>
									<Image src={product.img} />
									<Details>
										<ProductName>
											<b>Product:</b> {product.title}
										</ProductName>
										<ProductId>
											<b>ID:</b> {product._id}
										</ProductId>
										<ProductColor color={product.color} />
										<ProductSize>
											<b>Size:</b> {product.size}
										</ProductSize>
									</Details>
								</ProductDetail>
								<PriceDetail>
									<ProductAmountContainer>
										{/* <Add /> */}
										<ProductAmount>Q: {product.quantity}</ProductAmount>
										{/* <Remove /> */}
									</ProductAmountContainer>
									<ProductPrice>
										₹ {product.price * product.quantity}
									</ProductPrice>
								</PriceDetail>
								<Divider />
							</Product>
						))}
						<Hr />
					</Info>
					<Summary>
						<SummaryTitle>ORDER SUMMARY</SummaryTitle>
						<SummaryItem>
							<SummaryItemText>Subtotal</SummaryItemText>
							<SummaryItemPrice>₹ {cart.total}</SummaryItemPrice>
						</SummaryItem>
						<SummaryItem>
							<SummaryItemText>Estimated Shipping</SummaryItemText>
							<SummaryItemPrice>₹ 40</SummaryItemPrice>
						</SummaryItem>
						<SummaryItem>
							<SummaryItemText>Shipping Discount</SummaryItemText>
							<SummaryItemPrice>₹ -40</SummaryItemPrice>
						</SummaryItem>
						<SummaryItem type="total">
							<SummaryItemText>Total</SummaryItemText>
							<SummaryItemPrice>₹ {cart.total}</SummaryItemPrice>
						</SummaryItem>
						{user ? (
							<StripeCheckout
								name="Let's Shop"
								image="https://avatars.githubusercontent.com/u/67566408?v=4"
								billingAddress
								shippingAddress
								description={`Your total is ₹${cart.total}`}
								amount={cart.total * 100}
								token={onToken}
								stripeKey={KEY}
							>
								<Button>CHECKOUT NOW</Button>
							</StripeCheckout>
						) : (
							<Link to="/login">
								<Button>CHECKOUT NOW</Button>
							</Link>
						)}
					</Summary>
				</Bottom>
			</Wrapper>
			<Footer />
		</Container>
	);
}

export default Cart;
