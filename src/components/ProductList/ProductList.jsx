import React from 'react'
import ProductItem from '../ProductItem/ProductItem'

import './ProductList.css';



export default function ProductList({products, isProductLoading}) {
	
	if (!products.length && !isProductLoading) {
		return (
			<h1 className='products__list-error'>Список Товаров Пуст</h1>
		)
	}

	return (
		<div className="product__list">
			{
				products.map(({id, product, price, brand}) => (
					<ProductItem key={id} id={id} title={product} price={price} brand={brand}/>
				))
			}
		</div>
	)
}
