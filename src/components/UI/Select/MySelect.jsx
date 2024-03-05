import React from "react";
import './MySelect.css'

const MySelect = ({ options, callback}) => {
	
	return (
		<select 
				className="my-select"
				onChange={callback}>
				<option disabled >Brand</option>
				{options.map(option => 
					<option key={option} value={option}>
						{option}
					</option>
				)}
			</select>
	)
}

export default MySelect;