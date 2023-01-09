import '../App.css'
import db from '../firebase/index.js';
import { setDoc, doc, addDoc, collection } from 'firebase/firestore'
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal.js';
import 'animate.css';

const Form = ({ data }) =>{

  const emptyValues = {
    full_name: '',
    email: '',
    birth_date: '',
    country_of_origin: 'argentina',
  }

  const [userData, setUserData] = useState(emptyValues);
  const [showModal, setShowModal] = useState(false);
  const [checked, setChecked] = useState(false)

  const usersCollection = collection(db, "users");
  const navigateTo = useNavigate();

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

  const formRef = useRef(null);

  const validateEmpty = () =>{
    if(userData.full_name && userData.email && userData.birth_date && userData.country_of_origin !== "" && checked === true){
      setShowModal(true)
    }else{
      return false
    }
  }

  const addAnother = async () => {
    setShowModal(false);
    await setUserData(emptyValues);
    console.log(emptyValues)
    formRef.current.reset();
  }

  return(
    <>
    <div className='flex flex-col items-center justify-center h-[75%] mx-auto container animate__animated animate__slideInDown'>
      <form ref={formRef} onSubmit={(e) => handleSubmit(e)} className='w-100 lg:w-1/3 mx-auto flex flex-col items-start space-y-4 p-4 text-white '>
        <div className=' w-full'>
          <img className='w-[50%]' src='logo.png' />
        </div>
        {data.map((element)=>{
          return(
            <div className='w-full'>
              {element.type === "select" ? <div className='flex flex-col gap-2'><label htmlFor={element.name}>{element.label}</label> <select name={element.name} onChange={handleChange} className="text-black p-1 rounded-md w-[50%]">{element.options.map((opt) => {
                return(
                  <option value={opt.value}>
                    {opt.label}
                  </option>
                )
              })} </select> </div>:
              element.type === "checkbox" ? <label htmlFor={element.name}>{element.label}<input onChange={()=> setChecked(!checked)} type={element.type} name={element.name} required={element.required}></input></label> :
              element.type === "submit" ? <div className='flex flex-row gap-2'><button onClick={()=> validateEmpty()} type={element.type} className='bg-[#d30070] px-4 py-1 '>{element.label}</button><button type='button' onClick={()=> navigateTo('/users')} className='bg-[#d30070] px-4 py-1 '>Entradas</button></div> :
              <><label htmlFor={element.name}>{element.label}</label><input type={element.type} name={element.name} onChange={(e) => handleChange(e)} placeholder={element.label} required={element.required} className=' text-black rounded-md px-1 py-2 w-[100%] hover:placeholder-black' /></>}
            </div>
          )
        })}
      </form>
      
    </div>
    {showModal &&
      <Modal>
        <div className=' bg-zinc-200 opacity-80 fixed inset-0 z-50'>
          <div className='flex h-screen justify-center items-center'>
            <div className='flex-col justify-center bg-white py-12 px-24'>
              <div className='flex gap-3'>
                <button className='text-black bg-green-700 px-3 py-1 rounded-md hover' onClick={()=> addAnother()}>Ingresar otro usuario</button>
                <button className='text-black bg-green-700 px-3 py-1 rounded-md' onClick={()=> navigateTo('/users')}>Ver usuarios</button>
              </div>
            </div>
          </div>
        </div>
      </Modal>}
  
  </>
  )
}

export default Form;