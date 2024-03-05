import CryptoJS from "crypto-js";

// X-Auth generate function

export const generateAuthToken = () => {
	const password = "Valantis";
	const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
	const token = `${password}_${timestamp}`;
	// console.log(CryptoJS.MD5(token).toString());
	return CryptoJS.MD5(token).toString();
}

// remove duplicates function

export const removeDuplicates = (array, key) => {
	return array.filter((item, index, self) => 
		index === self.findIndex((t) => t[key] === item[key])
	)
}

// page count
export const getPagesCount = (limit, totalCount) => {
	return Math.ceil(totalCount/limit)
} 

//pages array

export const getPagesArray = (totalPages) => {
	const pagesArray = [];
	for (let i = 0; i <= totalPages; i++) {
		pagesArray.push(i)
	}
	return pagesArray;
}

export const getBrands = (array) => {
	let result = [];
	for (let i = 0; i < array.length; i++) {
		if (array[i] != null) {
			result.push(array[i])
		}
	}
	result = new Set(result);
	return Array.from(result);
}