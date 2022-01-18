import React from 'react'
import './Navbar.css'
import { Container } from 'react-bootstrap';



function Navbar() {
    return (
        <Container fluid className='navbar-container '>
            <div className='navContent py-2'>
                <img src="/Images/QuikieAppsLogo.png" className="img-fluid" alt="Quikie App Logo" />
            </div>
        </Container>
            
        
    )
}

export default Navbar
