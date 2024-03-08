import axios from "axios";
import { generateAuthToken } from "../utils/utils.js";

const BASE_API = `https://api.valantis.store:41000/`;
const token = generateAuthToken();


export default class ProductService {
// fetchind all products ids
	static async getAll(limit, page) {
		const responce = await axios.post(BASE_API, {
			action: "get_ids",
			params: {"offset": page, "limit": limit}
		},
		{
			headers: {
				'Content-Type': 'application/json, text/plain', 
				'X-Auth': token
			}
		})
		return responce;
	}

// get products by id
	static async getProducts(productIds) {
		const responce = await axios.post(BASE_API, {
			action: 'get_items',
			params: { ids: productIds }
		},
		{
			headers: {
				'Content-Type': 'application/json',
				'X-Auth': token
			}
		})
		return responce;
	}

// Get brand list for select
	static async getBrandList() {
		const responce = await axios.post(BASE_API, {
			action: 'get_fields',
			params: {"field": "brand" }
		},
		{
			headers: {
				'Content-Type': 'application/json',
				'X-Auth': token
			}
		})
		return responce;
	}

// Filter products by name
	static async getProductsByName(productName) {
		const responce = await axios.post(BASE_API, {
			action: 'filter',
			params: {"product": productName}
		},
		{
			headers: {
				'Content-Type': 'application/json',
				'X-Auth': token
			}
		})
		return responce;
	}

// Filter product by price
	static async getProductsByPrice(price) {
		const responce = await axios.post(BASE_API, {
			action: 'filter',
			params: {"price": price}
		},
		{
			headers: {
				'Content-Type': 'application/json',
				'X-Auth': token
			}
		})
		return responce;
	}
	
// Filter products by brand name
	static async getFilteredBrands(brandName) {
		const responce = await axios.post(BASE_API, {
			action: 'filter',
			params: {"brand": brandName}
		},
		{
			headers: {
				'Content-Type': 'application/json',
				'X-Auth': token
			}
		})
		return responce;
	}
}