/* eslint-disable react/prop-types */
import '../App.css';
import db from '../firebase/index.js';
import {addDoc, collection} from 'firebase/firestore';
import React, {useState, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import 'animate.css';
import Swal from 'sweetalert2';

const Form = ({data}) =>{
	const emptyValues = {
		full_name: '',
		email: '',
		birth_date: '',
		country_of_origin: 'argentina',
	};

	const [userData, setUserData] = useState(emptyValues);
	const [checked, setChecked] = useState(false);
	const formRef = useRef(null);
	const usersCollection = collection(db, 'users');
	const navigateTo = useNavigate();

	const date = new Date();

	const handleSubmit = async (e) => {
		e.preventDefault();
		await addDoc(usersCollection, {
			full_name: userData.full_name,
			email: userData.email,
			birth_date: userData.birth_date,
			country_of_origin: userData.country_of_origin,
		});
		fireModal();
	};

	const handleChange = async (e) => {
		await setUserData({...userData, [e.target.name]: e.target.value});
	};

	const fireModal = () => {
		Swal.fire({
			title: 'Respuesta guardada',
			icon: 'success',
			iconColor: '#d30070',
			confirmButtonText: 'Respuestas',
			confirmButtonColor: '#d30070',
			showCancelButton: true,
			cancelButtonText: 'Agregar respuesta',
		})
			.then((result) => {
				if (result.isConfirmed) {
					console.log(userData);
					navigateTo('/users');
				} else {
					setUserData(emptyValues);
					formRef.current.reset();
				}
			});
	};

	return (
		<>
			<div className='flex flex-col items-center justify-center h-[75%] mx-auto container animate__animated animate__slideInDown'>
				<form ref={formRef} onSubmit={(e) => handleSubmit(e)} className='w-100 lg:w-1/3 mx-auto flex flex-col items-start space-y-4 p-4 text-white '>
					<div className=' w-full mb-3'>
						<img className='w-[50%]' src='logo.png' alt='logo'/>
					</div>

					{data.map((element)=>{
						return (
							<div className='w-full' key={element.label}>
								{element.type === 'select' ? <div className='flex flex-col gap-2'><label htmlFor={element.name}>{element.label}</label> <select name={element.name} onChange={handleChange} className="text-black p-1 rounded-md w-[50%]">{element.options.map((opt) => {
									return (
										<option value={opt.value} key={opt.label}>
											{opt.label}
										</option>
									);
								})} </select> </div>:
									element.type === 'checkbox' ? <label htmlFor={element.name}>{element.label}
										<input onChange={()=> setChecked(!checked)} type={element.type} name={element.name} required={element.required} className='mx-2'></input>
									</label> :
										element.type === 'submit' ? <div className='flex flex-row gap-2'>
											<button type={element.type} className='bg-[#d30070] px-4 py-1 hover:bg-violet-600'>{element.label}</button>
										</div> :
											element.type === 'date' ? <div>
												<label htmlFor={element.name}><span>{element.label}</span></label>
												<input type={element.type} name={element.name} max={date.toISOString().slice(0, 10)} onChange={(e) => handleChange(e)} required={element.required} className=' outline-none text-black px-1 py-2 w-[100%] bg-transparent ' />
											</div>:
												<div className='divForm'>
													<input type={element.type} name={element.name} onChange={(e) => handleChange(e)} required={element.required} autoComplete="a" className='text-black  px-1 py-2 w-[100%] h-[50%] bg-transparent ' />
													<label htmlFor={element.name} className='label-name'><span className='content-name'>{element.label}</span></label>
												</div>
								}
							</div>
						);
					})}
				</form>
			</div>
		</>
	);
};

export default Form;
