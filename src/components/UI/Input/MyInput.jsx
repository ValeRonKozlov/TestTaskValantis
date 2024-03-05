import React from "react";
import './MyInput.css'

const MyInput = ({title, callback}) => {
	return (
			<input 
			className="input" 
			type="text" 
			placeholder={title} 
			onChange={callback}/>
	)
}


export default MyInput;
