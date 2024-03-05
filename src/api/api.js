import { generateAuthToken, removeDuplicates } from "../utils/utils";

const BASE_API = `http://api.valantis.store:40000/`;
const token = generateAuthToken();


export default class ProductService {
	
		static async getAll(limit, page) {
			await fetch(BASE_API, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json', 
				'X-Auth': token
			},
			body: JSON.stringify({ 
				"action": "get_ids",
				"params": {"offset": page, "limit": limit}})
		})
		.then(response => response.json().then((response) => {
			const productIds = response.result
			// console.log('productIds', productIds)
			this.getProducts(productIds)
		})) 
	}

	
		static async getProducts(productIds) {

			await fetch(BASE_API, {
				method: "POST",
				headers: { 
					'Content-Type': 'application/json',
					'X-Auth': token
				},
				body: JSON.stringify({ 
					"action": 'get_items',
					"params": { ids: productIds },
				})
			}).then(response => response.json().then((response) => {
				const products = response.result;
				const uniqProductsIds = removeDuplicates(products, 'id')
				// console.log(uniqProductsIds);
				return uniqProductsIds;
			}))
	}

}