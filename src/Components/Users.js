import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
const Users = (data) => {

	const userData = data.data;
	const [currentPage, setCurrentPage] = useState(1);
	const navigateTo = useNavigate();
	const PAGE_SIZE = 5;
	const totalPages = Math.ceil(userData.length/PAGE_SIZE);

	const nextPage = () => {
		if(currentPage+1>Math.ceil(userData.length/PAGE_SIZE)){
			return null
		}else{
			setCurrentPage(currentPage+1)
		}
	}

	const prevPage = () => {
		if(currentPage-1===0){
			return null
		}else{
			setCurrentPage(currentPage-1)
		}
	}

	const disableNextButton = currentPage + 1 > totalPages;
	const disablePrevButton = currentPage - 1 === 0;

  return(
		<div className="m-auto">
			<div className="flex flex-col m-auto gap-3">
				<div className="flex flex row justify-between">
        	<img className='w-[25%]' src='logo.png' alt="logo"/>
				</div>
					{userData.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE).map((element) => {
						return(
							<div key={element.id} className="flex flex-col bg-slate-100 text-black px-3 py-2 rounded-md">
								<div className="flex flex-row">
									<h2 className="font-bold">Nombre completo: </h2><span>{element.full_name}</span>
								</div>
								<div className="flex flex-row">
									<h2 className="font-bold">Email: </h2><span>{element.email}</span>
								</div>
								<div className="flex flex-row">
									<h2 className="font-bold">Pais: </h2><span>{element.country_of_origin}</span>
								</div>
								<div className="flex flex-row">
									<h2 className="font-bold">Fecha de nacimiento: </h2><span>{element.birth_date}</span>
								</div>
							</div>
						)
					})}
				<div className="flex flex-row justify-start gap-3">
					<button onClick={()=>prevPage()} className={disablePrevButton ? "bg-[#D3D3D3] px-4 py-1 text-white":"bg-[#d30070] px-4 py-1 hover:bg-violet-600 text-white"}>Anterior</button>
					<p className="text-white">Página {currentPage} de {totalPages}</p>
					<button onClick={()=>nextPage()} className={disableNextButton ? "bg-[#D3D3D3] px-4 py-1 text-white":"bg-[#d30070] px-4 py-1 text-white hover:bg-violet-600"}>Siguiente</button>
					<button onClick={()=> navigateTo('/')} className="text-white px-4 py-1 bg-[#d30070] justify-end hover:bg-violet-600">Volver</button>
				</div>
			</div>
		</div>


  )
}

export default Users