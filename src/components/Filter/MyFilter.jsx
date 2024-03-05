import React from "react";
import MyInput from "../UI/Input/MyInput";
import MyButton from "../UI/Button/MyButton";
import MySelect from "../UI/Select/MySelect";
import './MyFilter.css'

const MyFilter = ({options}) => {
	return (
		<div className="filter">
				<MyInput title={'Sort by Name'} />
				<MyInput title={'Sort by Price'} c/>
				<MySelect options={options}/>
				<MyButton title={'Reset'} />
			</div>
	)
}

export default MyFilter;