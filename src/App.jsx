import ProductList from "./components/ProductList/ProductList";
import './App.css'
import { useEffect, useState } from "react";
import { removeDuplicates, getBrands } from "./utils/utils.js";
import SearchLoader from "./components/UI/SearchLoader/SearchLoader.jsx";
import Loader from "./components/UI/Loader/Loader.jsx";
import MyInput from "./components/UI/Input/MyInput.jsx";
import MySelect from "./components/UI/Select/MySelect.jsx";
import MyPagination from "./components/UI/Pagination/MyPagination.jsx"
import MyButton from "./components/UI/Button/MyButton.jsx";
import MyFilter from "./components/Filter/MyFilter.jsx";
import { useFetching } from "./hooks/useFetching.js";
import ProductService from "./api/api.js";


function App() {
	const [products, setProducts] = useState([]);
	const [limit, setLimit] = useState(51);
	const [currentPage, setCurrentPage] = useState(1);

	// API methods 
	// mane page loading
		const [fetchProducts, isProductLoading, productError] = useFetching(async (limit, currentPage) => {
			await ProductService.getAll(limit, currentPage).then(async (responce) => {
        const productIds = responce.data.result;
					await ProductService.getProducts(productIds).then((responce) => {
						const products = responce.data.result;
						const productsList = removeDuplicates(products, 'id');
						// console.log(productsList);
						setProducts(productsList)
					})
      })
		})
		
		useEffect(() => {
			fetchProducts(limit, currentPage)
		}, [currentPage, limit])

		// -----------------------------------------------//-----------------------------
		// Filter by name

		const [fetchingFilterByName, isFetchingFilterByName, filterByNameError] = useFetching(async (productName) => {
			await ProductService.getProductsByName(productName).then(async (responce) => {
				const filteredList = responce.data.result;
				await ProductService.getProducts(filteredList).then(responce => {
					const data = responce.data.result;
					const uniqData = removeDuplicates(data, 'id')
					// console.log(uniqData);
					setProducts(uniqData)
				})
			})
		})
		// delay for name search
		let nameTimer;
		function filterByName(e) {
			clearTimeout(nameTimer);
			let name = e.target.value;
			const timeout = 2000;
			nameTimer = setTimeout(() => {
				fetchingFilterByName(name)
				console.log(name);
			}, timeout);
		}

		// ----------------------------------------------------------------------//------------------------
		// Filter by price
		const [fetchFilterByPrice, isFilterByPriceLoading, filterByPriceError] = useFetching(async (price) => {
			await ProductService.getProductsByPrice(price).then(async (responce) => {
				const filteredPriceList = responce.data.result;
				await ProductService.getProducts(filteredPriceList).then(responce => {
					const data = responce.data.result;
					const uniqData = removeDuplicates(data, 'id')
					// console.log(uniqData);
					setProducts(uniqData)
				})
			})
		})
		// delay for price search
		let priceTimer;
		function filterByPrice(e) {
			clearTimeout(priceTimer);
			let price = Number(e.target.value);
			const timeout = 2000;
			priceTimer = setTimeout(() => {
				fetchFilterByPrice(price)
				console.log(price);
			}, timeout);
		}

		// ---------------------------------------------------------------- // -----------------
		// Brand list 
		const [options, setOptions] = useState([])

		const [fetchBrandList, isBrandListLoading, brandError] = useFetching(async () => {
			await ProductService.getBrandList().then(responce => {
				const list = responce.data.result;
				const cleaneList = getBrands(list);
				// console.log(cleaneList);
				setOptions(cleaneList)
			})
		})

		useEffect(() => {
			fetchBrandList()
		}, [])

		// Filter by brend
		const [fetchFilteredBrands, isFilteredBrandsLoading, filterBrandError] = useFetching(async (brandName) => {
			await ProductService.getFilteredBrands(brandName).then(async (responce) => {
				const data = responce.data.result;
				await ProductService.getProducts(data).then(responce => {
					const filteredList = responce.data.result;
					// console.log(filteredList);
					setProducts(filteredList);
				})
			})
		})

		function onChange(value) {
			fetchFilteredBrands(value)
		}
	
		//-----------------------------------------------------------------------//----------------------
		// Reset filters
		function resetFilter() {
			document.location.reload();
			// fetchProducts(limit, currentPage)
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

  return (
    <div className="container product">
			<h1 className="product-title">Список Товаров</h1>
			<div className="filter">
				<MyInput title={'Sort by Name'} callback={filterByName}/>
				<MyInput title={'Sort by Price'} callback={filterByPrice}/>
				<MySelect options={options} callback={event => onChange(event.target.value)}/>
				<MyButton title={'Reset'} callback={resetFilter}/>
			</div>
			{
				(isProductLoading || isFilteredBrandsLoading || isFetchingFilterByName || isFilterByPriceLoading) 
				&& <div className="loader__container"><SearchLoader /></div>
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
