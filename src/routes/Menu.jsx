import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <>
      <h1 className="flex items-center justify-center text-3xl mb-4">Menu de Gerenciamento</h1>

      <section className="flex flex-col sm:flex-row justify-around items-center">
        <div className="w-full sm:w-auto m-2">
          <Link
            to="/autores"
            className="block w-full sm:w-[200px] px-6 py-4 text-center text-white rounded bg-blue-600 hover:bg-blue-700"
          >
            Autores
          </Link>
        </div>

        <div className="w-full sm:w-auto m-2">
          <Link
            to="/categorias"
            className="block w-full sm:w-[200px] px-6 py-4 text-center text-white rounded bg-blue-600 hover:bg-blue-700"
          >
            Categorias
          </Link>
        </div>

        <div className="w-full sm:w-auto m-2">
          <Link
            to="/editoras"
            className="block w-full sm:w-[200px] px-6 py-4 text-center text-white rounded bg-blue-600 hover:bg-blue-700"
          >
            Editoras
          </Link>
        </div>

        <div className="w-full sm:w-auto m-2">
          <Link
            to="/livros"
            className="block w-full sm:w-[200px] px-6 py-4 text-center text-white rounded bg-blue-600 hover:bg-blue-700"
          >
            Livros
          </Link>
        </div>
      </section>
    </>
  );
};

export default Menu;