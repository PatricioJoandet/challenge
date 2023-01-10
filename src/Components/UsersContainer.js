import { useState, useEffect } from "react";
import { getDocs, collection,  } from 'firebase/firestore';
import { Oval } from "react-loader-spinner";
import db from "../firebase/index.js";
import Users from './Users.js';

const UsersContainer = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const rawData = await getDocs(collection(db, 'users'));
    let processedData = [];

    rawData.forEach((item) =>{
      processedData.push({
        full_name: item.data().full_name,
        email: item.data().email,
        country_of_origin: item.data().country_of_origin,
        birth_date: item.data().birth_date,
        id: item.id,
      });
    });
    setData(processedData)
    setLoading(false);
  }

	useEffect(() =>{
		fetchData();
	}, [])


  if(loading){
    return(

    <div className="flex h-[100vh] justify-center items-center">
      <Oval color="#d30070"/>
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