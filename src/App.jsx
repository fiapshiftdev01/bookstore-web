import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Login from './routes/Login'
import Registrar from './routes/Registrar'
import Menu from './routes/Menu'
import Home from './routes/Home'
import Livros from './routes/Livros/Livros'
import AdicionarLivros from './routes/Livros/AdicionarLivros'
import EditarLivros from './routes/Livros/EditarLivros'
import Autores from './routes/Autores/Autores'
import AdicionarAutores from './routes/Autores/AdicionarAutores'
import EditarAutores from './routes/Autores/EditarAutores'
import Categorias from './routes/Categorias/Categorias'
import AdicionarCategorias from './routes/Categorias/AdicionarCategorias'
import EditarCategorias from './routes/Categorias/EditarCategorias'
import Editoras from './routes/Editoras/Editoras'
import AdicionarEditoras from './routes/Editoras/AdicionarEditoras'
import EditarEditoras from './routes/Editoras/EditarEditoras'


function App() {


  return (
    <BrowserRouter>
    <Nav/>
     <Routes>

      <Route path='/' element={<Login/>}/>
      <Route path='/cadastro' element={<Registrar/>}/>
      <Route path='/menu' element={<Menu/>}/>
      <Route path='/home' element={<Home/>}/>

      {/*ROTAS LIVROS */}
      <Route path='/livros' element={<Livros/>}/>
      <Route path='/AdicionarLivros' element={<AdicionarLivros/>}/>
      <Route path='/EditarLivros/:id' element={<EditarLivros/>}/>

      {/*ROTAS AUTORES */}
      <Route path='/autores' element={<Autores/>}/>
      <Route path='/AdicionarAutores' element={<AdicionarAutores/>}/>
      <Route path='/EditarAutores/:id' element={<EditarAutores/>}/>

      {/*ROTAS CATEGORIAS */}
      <Route path='/categorias' element={<Categorias/>}/>
      <Route path='/AdicionarCategorias' element={<AdicionarCategorias/>}/>
      <Route path='/EditarCategorias/:id' element={<EditarCategorias/>}/>

      {/*ROTAS EDITORAS*/}
      <Route path='/editoras' element={<Editoras/>}/>
      <Route path='/AdicionarEditoras' element={<AdicionarEditoras/>}/>
      <Route path='/EditarEditoras/:id' element={<EditarEditoras/>}/>


     </Routes>
     <Footer/>
    </BrowserRouter>
  )
}

export default App
