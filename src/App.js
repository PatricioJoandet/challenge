import './index.css';
import FormContainer from './Components/FormContainer.js'
import UsersContainer from './Components/UsersContainer.js';
import { Routes, Route, BrowserRouter } from 'react-router-dom';


function App() {
  return (
    <div className="bgGradient">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<FormContainer />}/>
          <Route path='/users' element={<UsersContainer />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
