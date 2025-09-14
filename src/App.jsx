import { useState } from 'react';
import './App.css'

// FireBase
import appFireBase from './credenciales';
import {getAuth, onAuthStateChanged} from 'firebase/auth';

// react router
import {BrowserRouter, Routes, Route} from 'react-router';
import Home from './assets/page/Home';
import Login from './assets/page/Login';

const auth = getAuth(appFireBase);

function App() {
  const [user, setUser] = useState(null);

  onAuthStateChanged(auth, (cuenta)=>{
    if(cuenta){
      setUser(cuenta);
    }else{
      setUser(null);
    }
  })


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ user ? <Home/> : <Login/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
