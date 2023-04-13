import './App.css';
import Upload from './artifacts/contracts/Upload.sol/Upload.json';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import FileUpload from './components/FileUpload';
import Display from './components/Display';
import Model from './components/Model';
import Swal from 'sweetalert2';
import Decide from './pages/Decide';
import Login from './pages/Login/Login';
import Signup from './pages/Login/Signup';

function App() {
  const[login,setlogin] = useState(true)
  const[token, settoken] = useState(false)

  return (
    <>

    {(token=="Arsalan"||token=="Faizaan")? <Decide token={token} settoken={settoken}/> : (login?<Login setlogin = {setlogin} settoken = {settoken}/> : <Signup setlogin = {setlogin}/>)}
   {/* <Decide/> */}
   {/* <Signup></Signup> */}
   
   {/* {login?<Login setlogin = {setlogin}/> : <Signup setlogin = {setlogin}/>} */}
       
    </>

  );
}

export default App;
