import React from "react";
import MyButton from "../Button/MyButton";
import './MyPagination.css'

const MyPagination = ({ increment, dicrement }) => {

	return (
		<div className="pagination">
			<MyButton callback={dicrement} title={'Prev'}/>
			<MyButton callback={increment} title={'Next'}/>
		</div>
	)
}

export default MyPagination;