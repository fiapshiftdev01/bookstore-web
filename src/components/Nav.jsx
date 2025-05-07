import {useState, useEffect} from 'react'
import {Link,useNavigate} from 'react-router-dom'

const Nav = () => {


//HOOK - useState- Manipula o estado da variavel com inico nulo
const [user,setUser]=useState(null);
//HOOK - useNavigate- redireciona para outros componentes
const navigate = useNavigate();


//HOOK useEffect - faz efeito colateral - vai recuperar o usuario no localstorage

useEffect(()=>{
  //Recuperando o usuario logado e salvo no localstorage
  const userLogado = localStorage.getItem("user")
  if(userLogado){
    setUser(JSON.parse(userLogado))
  }

},[]);



const handleMenu=()=>{
  navigate("/menu")
}

const handleLogout=()=>{
  localStorage.removeItem("token");
  localStorage.removeItem("tokenRenovado");
  localStorage.removeItem("user");
  setUser(null);
  navigate("/");
}


  return (
    <nav className="bg-blue-500 p-4 text-white flex justify-between items-center">
      <div className="text-2xl font-bold">
        <Link to="/menu">Livraria</Link>
      </div>

      <div className="flex items-center space-x-6">
        <Link to="/home" className="text-lg hover:text-[#00ffff]">Home</Link>

        {user ? (
          <>
         <span className="text-lg"> Bem-Vindo(a),{user.username}</span>

        <button onClick={handleMenu} className="bg-blue-500 px-4 py-2 hover:bg-green-600">Menu</button>
        <button onClick={handleLogout} className="bg-red-500 px-4 py-2 hover:bg-red-300">Logout</button>

        </>

      ):(
        <Link to="/" className="text-lg hover:cyan-300">Login</Link>

      )}

      </div>  
    </nav>
  )
}

export default Nav
