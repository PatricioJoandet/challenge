import '../index.css'
import { useState, useEffect } from 'react';

import Form from './Form.js';

const FormContainer = () => {

  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const res = await fetch('db.json')
      const {items} = await res.json();
      setData(items);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData();

  },[]);


  return(
    <div className='min-h-[calc(85vh-50px)]  bg-gradient-to-r from-green-400 to-blue-500 text-white'>
      <h1 className='text-3xl font-bold text-center py-2'> Challenge Greydive</h1>
      <Form data={data} />
    </div>
  )
}

export default FormContainer;