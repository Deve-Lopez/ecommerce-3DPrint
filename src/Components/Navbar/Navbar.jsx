import { useState } from "react"
import "./Navbar.css"
import { Link } from "react-router-dom"

const Navbar = () => {

  const [cardValue, setCardValue] = useState("0,00")

  const formattedValue = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR'
  }).format(parseFloat(cardValue.replace(',', '.')));

  return (
    <section className="header">
      <Link to="/" className="logo-link">
      <h1 className="logo">3D<span>PRINT</span></h1>      
      </Link>
      <nav className="navbar">
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </nav>
      <div className="icons">
        <Link to="/micuenta" className='icon-button'>
        <span className="login-link">Iniciar Sesión</span>        
        <i className='fa solid fa-user'></i>
        </Link>        
        
        <button className="search-button">
          <i className='fas fa-search'></i>
        </button>

        <Link to="/carrito" className='icon-button'>
        <i className='fas fa-shopping-cart'></i>
        <span className="counter">0</span>
        </Link>
        <Link to="/carrito" className='card-value'>
        <span>Cesta</span>
        <span>{formattedValue}</span>
        </Link>


      </div>
    </section>
  )
}

export default Navbar