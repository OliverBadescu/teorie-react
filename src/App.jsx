import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './Home/Home'
import NewEmployee from './Home/NewEmployee/NewEmployee'
import UpdateEmployee from './Home/UpdateEmployee/UpdateEmployee'
//JSX 
//hooks ->useState
//props


function App() {
  
  let x=2;

  let [data,setData]=useState(0);


   useEffect(()=>{
   },[]);

  let test=(e)=>{
    console.log("ce mai faci");
     x=x+2;

     setData(x=>x+1);
    }
  return (
    <>
      <UpdateEmployee/>
    </>
  )
}

export default App
