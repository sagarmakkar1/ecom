import axios from "axios";
import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import Product from "./Product";
import { BASE_URL } from "../requestMethods";

const Container = styled.div`
	padding: 20px;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
`;

function Products({ cat, filters, sort, homePage }) {
	const [products, setProducts] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState([]);

	useEffect(() => {
		const getProducts = async () => {
			try {
				const res = await axios.get(
					cat
						? `${BASE_URL}products?category=${cat}`
						: homePage
						? `${BASE_URL}products`
						: `${BASE_URL}products?new=true`
				);
				setProducts(res.data);
			} catch (err) {
				console.log("Getting Products error", err);
			}
		};
		getProducts();
	}, [cat]);

	useEffect(() => {
		filters &&
			setFilteredProducts(
				products.filter((item) =>
					Object.entries(filters).every(([key, value]) =>
						//if product item includes values set in filters state
						item[key].includes(value)
					)
				)
			);
	}, [products, cat, filters]);

	useEffect(() => {
		//Debug: createdAt dates are not being interpreted by js, hence no sort
		if (sort === "newest") {
			setFilteredProducts(
				(prev) => [...prev].sort((a, b) => a.createdAt - b.createdAt) //Javascript sort syntax
			);
		} else if (sort === "aesc") {
			setFilteredProducts((prev) =>
				[...prev].sort((a, b) => a.price - b.price)
			);
		} else {
			setFilteredProducts((prev) =>
				[...prev].sort((a, b) => b.price - a.price)
			);
		}
	}, [sort]);

	return (
		<Container>
			{filters
				? filteredProducts.map((item) => <Product item={item} key={item._id} />)
				: homePage
				? products
						.slice(0, 8)
						.map((item) => <Product item={item} key={item._id} />)
				: products.map((item) => <Product item={item} key={item._id} />)}
		</Container>
	);
}

export default Products;
