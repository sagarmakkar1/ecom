import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import React, { useState } from "react";
import { styled } from "styled-components";
import HeaderImage from "../../images/header.webp";
import { sliderItems } from "../data";
import { mobile, tablet } from "../responsive";
import { Link } from "react-router-dom";

const Container = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	/* background-color: coral; */
	position: relative;
	overflow: hidden;
	${mobile({ display: "none" })}
`;

const Arrow = styled.div`
	width: 50px;
	height: 50px;
	background-color: #fff7f7;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	top: 0;
	bottom: 0;
	left: ${(props) => props.direction === "left" && "10px"};
	right: ${(props) => props.direction === "right" && "10px"};
	margin: auto;
	cursor: pointer;
	opacity: 0.5;
	z-index: 2;
`;

const Wrapper = styled.div`
	height: 100%;
	display: flex;
	transition: all 1.5s ease;
	transform: translateX(${(props) => props.slideindex * -100}vw);
`;

const Slide = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	align-items: center;
	background-color: #${(props) => props.bg};
`;

const ImgContainer = styled.div`
	height: 100%;
	flex: 1;
`;

const Image = styled.img`
	height: 80%;
`;

const InfoContainer = styled.div`
	flex: 1;
	padding: 50px;
	${tablet({ display: "none" })}
`;

const Title = styled.h1`
	font-size: 70px;
`;

const Desc = styled.p`
	margin: 50px 0;
	font-size: 20px;
	font-weight: 500;
	letter-spacing: 3px;
`;
const Button = styled.button`
	padding: 10px;
	font-size: 20px;
	background-color: transparent;
	cursor: pointer;
`;

function Slider() {
	const [slideIndex, setSlideIndex] = useState(0);

	const handleClick = (direction) => {
		if (direction === "left") {
			setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
		} else {
			setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
		}
	};

	return (
		<Container>
			<Arrow direction="left" onClick={() => handleClick("left")}>
				<ArrowLeftOutlined />
			</Arrow>
			<Wrapper slideindex={slideIndex}>
				{sliderItems.map((item) => (
					<Slide bg={item.bg} key={item.id}>
						<ImgContainer>
							<Image src={item.img} />
						</ImgContainer>
						<InfoContainer>
							<Title>{item.title}</Title>
							<Desc>{item.desc}</Desc>
							<Link to="/products/woman">
								<Button>SHOP NOW</Button>
							</Link>
						</InfoContainer>
					</Slide>
				))}
				<Slide bg="fcf1ed">
					<ImgContainer>
						<Image src={HeaderImage} />
					</ImgContainer>
					<InfoContainer>
						<Title>SUMMER SALE</Title>
						<Desc>
							DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS
						</Desc>
						<Link to="/products/woman">
							<Button>SHOP NOW</Button>
						</Link>
					</InfoContainer>
				</Slide>
				<Slide bg="fbf0f4">
					<ImgContainer>
						<Image src={HeaderImage} />
					</ImgContainer>
					<InfoContainer>
						<Title>SUMMER SALE</Title>
						<Desc>
							DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS
						</Desc>
						<Link to="/products/woman">
							<Button>SHOP NOW</Button>
						</Link>
					</InfoContainer>
				</Slide>
			</Wrapper>
			<Arrow direction="right" onClick={() => handleClick("right")}>
				<ArrowRightOutlined />
			</Arrow>
		</Container>
	);
}

export default Slider;
