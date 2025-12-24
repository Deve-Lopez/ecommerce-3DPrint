import { MdEmail } from 'react-icons/md';
import { FaPhoneSquareAlt } from 'react-icons/fa';
import { FaLocationArrow } from 'react-icons/fa';
import { Link } from "react-router-dom";
import "./Footer.css";


const Footer = () => {
    return (
        <footer>
            <div className='footer-container'>
                <div className='columna-uno'>
                    <a href="mailto:info@3dprint.com">
                        <MdEmail className='icono' />
                        info@3dprint.com
                    </a>
                    <a href="tel:000111222">
                        <FaPhoneSquareAlt className='icono' />
                        680559528
                    </a>
                    <a href="https://www.google.com/maps?q=Carrer+Font+Baixa+2,+Alfafar,+Valencia"
                        target='_blank'
                        className='a-location'>
                        <FaLocationArrow className='icono' />
                        <span>
                            Carrer Font Baixa, 2, <br />
                            Alfafar, 46910 Valencia
                        </span>
                    </a>

                </div>
                <div className='columna-dos'>
                    <Link to="/" className="logo-link">
                        <h1 className="logo">3D<span>PRINT</span></h1>
                    </Link>
                    <p className='texto'>
                        3DPrint nació de mi pasión por la tecnología 3D.
                        Lo que comenzó como mi proyecto de fin de curso de Desarrollo de Aplicaciones Web (DAW)
                        se convirtió en una tienda de productos relacionados con la impresión 3D,
                        que ahora comparto con clientes de todo el mundo.
                    </p>

                </div>

                <div className="columna-tres">
                    <Link to="/contacto" className="contacto-boton">
                    Contacto
                    </Link>
                </div>
               
            </div>
        </footer>
    )
}

export default Footer;
