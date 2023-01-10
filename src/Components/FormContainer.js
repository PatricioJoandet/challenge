
import '../index.css';
import React, { useState, useEffect } from 'react';
import 'animate.css';

import Form from './Form.js';

const FormContainer = () => {

	const [data, setData] = useState([]);

	const fetchData = async () => {
		try {
			const res = await fetch('db.json');
			const {items} = await res.json();
			setData(items);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchData();

	},[]);

	return(
		<div className='h-[100vh]  text-white'>
			<Form className='animate__animated animate__slideInDown' data={data} />
		</div>
	);
};

export default FormContainer;