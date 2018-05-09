import React from 'react';
import {Link} from "react-router-dom";
const ListCategories = ({categories}) => {
	return (
		<ul className="category">
			<li>
				<Link to='/'>
					<span>home</span>
				</Link>
			</li>
			{categories && categories.map((category) => (
				<li key={category.name}>
					<Link to={category.name}
						><span>{category.name}</span>
					</Link>
				</li>
			))}
		</ul>
	);
};
export default ListCategories;