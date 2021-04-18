import React from 'react';

const Barra = () => {
    return ( 
        <header className='app-header'> 
            <p className='nombre-usuario'>Hola <span>Alejandro</span></p>
            <nav className='nav-principal'>
                <button className=' cerrar-sesion'>Cerrar Sesión</button>
            </nav>
        </header>
     );
}
 
export default Barra;