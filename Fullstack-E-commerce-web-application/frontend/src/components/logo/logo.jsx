import './logo.css'
import {Link} from 'react-router-dom'
import logoImage from '../../assets/images/icons/logo.png'

function Logo() {
    return (
        <Link to='/'>
            <div className='logo-container'>
                <img src={logoImage} alt="ECOVIDA" className='logo-image' />
            </div>
        </Link>
    )
}

export default Logo;