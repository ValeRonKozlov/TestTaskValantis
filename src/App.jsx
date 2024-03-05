import ProductList from "./components/ProductList/ProductList";
import './App.css'
import { useEffect, useState } from "react";
import { generateAuthToken, removeDuplicates } from "./utils/utils.js";
import Loader from "./components/UI/Loader/Loader.jsx";
import SearchLoader from "./components/UI/SearchLoader/SearchLoader.jsx";
import { getBrands } from "./utils/utils.js";
import MyInput from "./components/UI/Input/MyInput.jsx";
import MySelect from "./components/UI/Select/MySelect.jsx";
import MyPagination from "./components/UI/Pagination/MyPagination.jsx"
import MyButton from "./components/UI/Button/MyButton.jsx";
import MyFilter from "./components/Filter/MyFilter.jsx";

const BASE_API = `http://api.valantis.store:40000/`;
const token = generateAuthToken();

function App() {
	const [products, setProducts] = useState([]);
	const [limit, setLimit] = useState(51);
	const [currentPage, setCurrentPage] = useState(1);
	const [isProductLoading, setIsProductLoading] = useState(false)


	async function  getAll(limit, page) {
		try {
			setIsProductLoading(true)
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
				getProducts(productIds)
				setTimeout(() => {
					setIsProductLoading(false);
				}, 3000);
			})) 
		} catch (error) {
			console.log(error.message);
		}
	}


	async function getProducts(productIds) {
		try {
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
				setProducts(uniqProductsIds);
			}))
		} catch (error) {
			console.log(error.messege);
		}
	}

	async function  getFieldBrand() {
		try {
			setIsProductLoading(true)
			await fetch(BASE_API, {
				method: "POST",
				headers: {
					'Content-Type': 'application/json', 
					'X-Auth': token
				},
				body: JSON.stringify({ 
					"action": "get_fields",
					"params": {"field": "brand"}
				})
			})
			.then(response => response.json().then((response) => {
				const productIds = response.result
				const list = getBrands(productIds)
				setOptions(list);
				setTimeout(() => {
					setIsProductLoading(false);
				}, 3000);
			})) 
		} catch (error) {
			console.log(error.message);
		}
	}

	async function  getFieldName(productName) {
		try {
			setIsProductLoading(true)
			await fetch(BASE_API, {
				method: "POST",
				headers: {
					'Content-Type': 'application/json', 
					'X-Auth': token
				},
				body: JSON.stringify({ 
					"action": "filter",
					"params": {"product": productName}
				})
			})
			.then(response => response.json().then((response) => {
				const productIds = response.result
				// console.log(productIds);
				getProducts(productIds);
				setTimeout(() => {
					setIsProductLoading(false);
				}, 3000);
			})) 
		} catch (error) {
			console.log(error.message);
		}
	}

	async function  getPrice(price) {
			try {
				setIsProductLoading(true)
				await fetch(BASE_API, {
					method: "POST",
					headers: {
						'Content-Type': 'application/json', 
						'X-Auth': token
					},
					body: JSON.stringify({ 
						"action": "filter",
						"params": {"price": price}
					})
				})
				.then(response => response.json().then((response) => {
					const productIds = response.result
					// console.log(productIds);
					getProducts(productIds);
					setTimeout(() => {
						setIsProductLoading(false);
					}, 1000);
				})) } catch (error) {
					console.log(error.message);
				}
	}

	async function getFilteredBrands(brandName) {
		try {
			setIsProductLoading(true)
			await fetch(BASE_API, {
				method: "POST",
				headers: { 
					'Content-Type': 'application/json',
					'X-Auth': token
				},
				body: JSON.stringify({ 
					"action": "filter",
					"params": {"brand": brandName},
				})
			}).then(response => response.json().then((response) => {
				const products = response.result;
				// console.log(products);
				getProducts(products);
				setTimeout(() => {
					setIsProductLoading(false);
				}, 3000);
			}))
		} catch (error) {
			console.log(error.messege);
		} 
	}


	function increment() {
		if (currentPage >= 1) {
			setCurrentPage(currentPage + 1)
		} else {
			setCurrentPage(1)
		}
	}
	function dicrement() {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1)
		} else if (currentPage === 1) {
			setCurrentPage(1)
		} else {
			setCurrentPage(1)
		}
	}

	useEffect(() => {
		getAll(limit, currentPage)
	}, [limit, currentPage])

	const [options, setOptions] = useState([])
	const  [brand, setBrand] = useState('')
	const [inputValue, setInputValue] = useState()
	const [selectValue, setSelectValue] = useState()

	useEffect(() => {
		getFieldBrand()
	}, [options])

	function onChange(value) {
		getFilteredBrands(value)
	}


	function nameFilter(e) {
		setTimeout(() => {
			getFieldName(e.target.value)
			// console.log(e.target.value);
		}, 1500);
		
	}

	function priceFilter(e) {
		setTimeout(() => {
			getPrice(Number(e.target.value))
			// console.log(e.target.value);
		}, 1500);
	}

	function reset() {
		getAll(limit, currentPage)
	}

  return (
    <div className="container product">
			<h1 className="product-title">Список Товаров</h1>
			<div className="filter">
				<MyInput title={'Sort by Name'} callback={nameFilter}/>
				<MyInput title={'Sort by Price'} callback={priceFilter}/>
				<MySelect defaultOption={'Brand'} options={options} callback={event => onChange(event.target.value)}/>
				<MyButton title={'Reset'} callback={reset}/>
			</div>
			{isProductLoading &&
        <div className="loader__container"><SearchLoader /></div>
      }
			<ProductList products={products} isProductLoading={isProductLoading}/>
			{isProductLoading &&
        <div className="loader__container"><Loader/></div>
      }
			{products.length >= 50 ?
				<MyPagination increment={increment} dicrement={dicrement} />
				: ''}
    </div>
  );
}

export default App;
