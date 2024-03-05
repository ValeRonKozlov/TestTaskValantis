import React from "react";
import './MyButton.css'

const MyButton = ({callback, title}) => {
	return (
		<button className='my-btn' onClick={callback}>{title}</button>
	)
}

export default MyButton;