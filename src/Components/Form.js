import '../App.css'
import db from '../firebase/index.js';
import { setDoc, doc, addDoc, collection } from 'firebase/firestore'
import { useState } from 'react';

const Form = ({ data }) =>{
console.log(data)

  const [userData, setUserData] = useState({
    full_name: '',
    email: '',
    birth_date: '',
    country_of_origin: 'argentina',
  });

  const usersCollection = collection(db, "users");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(usersCollection, {
      full_name: userData.full_name,
      email: userData.email,
      birth_date: userData.birth_date,
      country_of_origin: userData.country_of_origin,
    });
  }
  
  const handleChange = async (e) => {
    await setUserData({...userData, [e.target.name] : e.target.value})
  }

  return(
    <div className='container mx-auto'>
      <form onSubmit={(e) => handleSubmit(e)} className='w-100 lg:w-1/3 mx-auto flex flex-col items-start space-y-4 bg-slate-800 p-4 rounded-md text-white '>
        <div className='border-b w-full'>
         <h2 className='text-2xl font-bold text-center pb-1'> Datos </h2>
        </div>
        {data.map((element)=>{
          return(
            <div>
              {element.type === "select" ? <><label htmlFor={element.name}>{element.label}</label> <select name={element.name} onChange={handleChange} className="text-black ml-1 p-1 rounded-md">{element.options.map((opt) => {
                return(
                  <option value={opt.value}>
                    {opt.label}
                  </option>
                )
              })} </select> </>:
              element.type === "checkbox" ? <label htmlFor={element.name}>{element.label}<input type={element.type} name={element.name} required={element.required}></input></label> :
              element.type === "submit" ? <button type={element.type} className='bg-green-700 px-3 py-1 rounded-md'>{element.label}</button> :
              <><label htmlFor={element.name}>{element.label}</label><input type={element.type} name={element.name} onChange={(e) => handleChange(e)} placeholder={element.label} required={element.required} className=' text-black rounded-md px-1 py-2 w-[100%]' /></>}
            </div>
          )
        })}
      </form>
    </div>
  )
}

export default Form;