import { Link } from 'react-router-dom'
import './MiCuenta.css'
import LoginForm from '../LoginForm/LoginForm'

const MiCuenta = () => {
    return (
        <div className='micuenta-container'>
            <LoginForm/>
            
            <Link to="/registro">
                <button className='button-registro'>
                    REGISTRO
                </button>
            </Link>
        </div>
    )
}

export default MiCuenta