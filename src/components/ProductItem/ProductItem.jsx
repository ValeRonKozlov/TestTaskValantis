import React from 'react';
import './ProductItem.css'

export default function ProductItem({id, title, price, brand}) {
	return (
		<div className="product__list-item">
			<p className="item-id">ID: {id}</p>
			<h2 className="item-title">{title}</h2>
			<p className="item-price">Price: {price}</p>
			<p className="item-brand">{brand ? `Brand: ${brand}` : ''}</p>
		</div>
	)
}
