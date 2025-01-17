import logo from '../../../assets/logo.svg'
import searchIcon from '../../../assets/search-icon.svg'
import cart from '../../../assets/cart.svg'
import './Navbar.css'
import {useState, useEffect} from 'react'

function Navbar( {submitfcn}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('logged');


  useEffect(() => {
    const token = localStorage.getItem('authorization');
    
    if (token) {      
      setIsAuthenticated(true);
      setUserName(localStorage.getItem('username'));
    }
  }, []);



    return (
        <nav className="navbar px-4">
          <div className="navbar-logo">
            <a href='/'>
              <img
              src={logo}
              alt="Logo"             
              />
            </a>
          </div>
          <form className="navbar-search" onSubmit={submitfcn}>
            <input name="query" className="mt-0" type="text" placeholder="Buscar productos, marcas y más..." />
            <button type="submit"><img src={searchIcon}alt="Buscar"/></button>
          </form>            
            <ul className='navbar-links my-2'>
              <li><a href='/categories'>Categorías</a></li>
              {isAuthenticated ? 
               <>
              <li><a href='/user'>{userName}</a></li>
              <li><a href='/cart'><img src={cart}/></a></li>
              </>
               : 
              <>

              <li><a href='/register'>Crea tu cuenta</a></li>
              <li><a href='/login'>Ingresá</a></li>
              </>
              }
            </ul>
        </nav>
      );
    };

export default Navbar