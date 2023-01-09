import '../index.css'
import { useState, useEffect } from 'react';
import 'animate.css';

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

  // repeating-radial-gradient(circle farthest-corner at -1% 0,#d4034f,#90088b 30%,#662d91 53%,#90088b 78%,#b1005e);
  return(
    <div className='h-[100vh]  text-white'>
      <Form className='animate__animated animate__slideInDown' data={data} />
    </div>
  )
}

export default FormContainer;