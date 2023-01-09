import { useState, useEffect } from "react";
import { getDocs, collection } from 'firebase/firestore';
import { Oval } from "react-loader-spinner";
import db from "../firebase/index.js";
import Users from './Users.js';

const UsersContainer = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const rawData = await getDocs(collection(db, 'users'));

    rawData.forEach((doc) =>{
      setData((data) => [ ...data, {
        full_name: doc.data().full_name,
        email: doc.data().email,
        country_of_origin: doc.data().country_of_origin,
        birth_date: doc.data().birth_date,
      }])
    })
    setLoading(false);
  }

	useEffect(() =>{
		fetchData();
	}, [])


  if(loading){
    return(

    <div className="flex h-[100vh] justify-center items-center">
      <Oval color="green"/>
    </div>
    )
  }else{
    return(
  
      <div className="flex h-[100vh] w-auto">
        <Users data={data}/>
      </div>		
  
    )
  }
}

export default UsersContainer;